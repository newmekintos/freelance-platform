import { useState, useEffect } from 'react';
import { gun, user, generateId, timestamp } from '../lib/gun';

export const useGunServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time service listener (P2P sync)
  useEffect(() => {
    const servicesRef = gun.get('services');
    const loadedServices = new Map();
    
    servicesRef.map().on((service, id) => {
      if (service && service.title) {
        loadedServices.set(id, { id, ...service });
        setServices(
          Array.from(loadedServices.values()).sort((a, b) => b.createdAt - a.createdAt)
        );
      }
    });

    setLoading(false);

    return () => {
      servicesRef.off();
    };
  }, []);

  // Create new service (broadcast to P2P network)
  const createService = async (serviceData) => {
    if (!user.is) {
      throw new Error('Must be authenticated to create service');
    }

    const serviceId = generateId();
    const service = {
      ...serviceData,
      id: serviceId,
      createdBy: user.is.pub,
      createdByAlias: user.is.alias,
      createdAt: timestamp(),
      orders: 0,
      rating: 0,
      reviews: [],
    };

    // Broadcast to P2P network
    gun.get('services').get(serviceId).put(service);
    
    return service;
  };

  // Update service
  const updateService = async (serviceId, updates) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const serviceRef = gun.get('services').get(serviceId);
    
    serviceRef.once((currentService) => {
      if (currentService.createdBy !== user.is.pub) {
        throw new Error('Not authorized to update this service');
      }
      
      serviceRef.put({
        ...updates,
        updatedAt: timestamp(),
      });
    });
  };

  // Delete service
  const deleteService = async (serviceId) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const serviceRef = gun.get('services').get(serviceId);
    
    serviceRef.once((currentService) => {
      if (currentService.createdBy !== user.is.pub) {
        throw new Error('Not authorized to delete this service');
      }
      
      serviceRef.put(null);
    });
  };

  // Add review
  const addReview = async (serviceId, reviewData) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    const reviewId = generateId();
    const review = {
      id: reviewId,
      serviceId,
      reviewerId: user.is.pub,
      reviewerName: user.is.alias,
      ...reviewData,
      createdAt: timestamp(),
    };

    // Add to reviews collection
    gun.get('reviews').get(reviewId).put(review);
    
    // Add reference to service
    gun.get('services').get(serviceId).get('reviews').set(gun.get('reviews').get(reviewId));
    
    // Update service rating
    gun.get('services').get(serviceId).once((service) => {
      const currentRating = service.rating || 0;
      const currentReviews = service.totalReviews || 0;
      const newRating = ((currentRating * currentReviews) + reviewData.rating) / (currentReviews + 1);
      
      gun.get('services').get(serviceId).put({
        rating: newRating,
        totalReviews: currentReviews + 1,
      });
    });

    return review;
  };

  // Get my services
  const getMyServices = () => {
    if (!user.is) return [];
    return services.filter(service => service.createdBy === user.is.pub);
  };

  return {
    services,
    loading,
    createService,
    updateService,
    deleteService,
    addReview,
    getMyServices,
  };
};
