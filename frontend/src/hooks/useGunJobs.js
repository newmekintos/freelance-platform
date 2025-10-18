import { useState, useEffect } from 'react';
import { gun, user, generateId, timestamp } from '../lib/gun';

export const useGunJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time job listener (P2P sync)
  useEffect(() => {
    const jobsRef = gun.get('jobs');
    const loadedJobs = new Map();
    
    jobsRef.map().on((job, id) => {
      if (job && job.title) {
        loadedJobs.set(id, { id, ...job });
        setJobs(Array.from(loadedJobs.values()).sort((a, b) => b.createdAt - a.createdAt));
      }
    });

    setLoading(false);

    // Cleanup
    return () => {
      jobsRef.off();
    };
  }, []);

  // Create new job (broadcast to P2P network)
  const createJob = async (jobData) => {
    if (!user.is) {
      throw new Error('Must be authenticated to create job');
    }

    const jobId = generateId();
    const job = {
      ...jobData,
      id: jobId,
      createdBy: user.is.pub,
      createdByAlias: user.is.alias,
      createdAt: timestamp(),
      status: 'open',
      applications: [],
    };

    // Broadcast to P2P network
    gun.get('jobs').get(jobId).put(job);
    
    return job;
  };

  // Update job
  const updateJob = async (jobId, updates) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const jobRef = gun.get('jobs').get(jobId);
    
    // Get current job to verify ownership
    jobRef.once((currentJob) => {
      if (currentJob.createdBy !== user.is.pub) {
        throw new Error('Not authorized to update this job');
      }
      
      jobRef.put({
        ...updates,
        updatedAt: timestamp(),
      });
    });
  };

  // Delete job
  const deleteJob = async (jobId) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const jobRef = gun.get('jobs').get(jobId);
    
    jobRef.once((currentJob) => {
      if (currentJob.createdBy !== user.is.pub) {
        throw new Error('Not authorized to delete this job');
      }
      
      jobRef.put(null); // Remove from P2P network
    });
  };

  // Apply to job
  const applyToJob = async (jobId, applicationData) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const applicationId = generateId();
    const application = {
      id: applicationId,
      jobId,
      applicantId: user.is.pub,
      applicantAlias: user.is.alias,
      ...applicationData,
      createdAt: timestamp(),
      status: 'pending',
    };

    // Add to applications collection
    gun.get('applications').get(applicationId).put(application);
    
    // Add reference to job
    gun.get('jobs').get(jobId).get('applications').set(gun.get('applications').get(applicationId));

    return application;
  };

  // Get my jobs
  const getMyJobs = () => {
    if (!user.is) return [];
    return jobs.filter(job => job.createdBy === user.is.pub);
  };

  return {
    jobs,
    loading,
    createJob,
    updateJob,
    deleteJob,
    applyToJob,
    getMyJobs,
  };
};
