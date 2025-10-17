import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { applicationsDB, jobsDB, usersDB } from '../database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Belirli bir iş için başvuruları getir
router.get('/job/:jobId', authenticate, async (req, res) => {
  try {
    const job = await jobsDB.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }

    // Sadece iş sahibi başvuruları görebilir
    if (job.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    const applications = await applicationsDB.find({ jobId: req.params.jobId });
    
    // Her başvuru için kullanıcı bilgisini ekle
    const applicationsWithUsers = await Promise.all(
      applications.map(async (app) => {
        const user = await usersDB.findById(app.userId);
        return {
          ...app,
          user: user ? { id: user.id, name: user.name, email: user.email } : null
        };
      })
    );
    
    res.json(applicationsWithUsers);
  } catch (error) {
    console.error('Başvurular getirme hatası:', error);
    res.status(500).json({ error: 'Başvurular getirilirken hata oluştu' });
  }
});

// Kullanıcının yaptığı başvuruları getir
router.get('/my-applications', authenticate, async (req, res) => {
  try {
    const applications = await applicationsDB.find({ userId: req.userId });
    
    // Her başvuru için iş bilgisini ekle
    const applicationsWithJobs = await Promise.all(
      applications.map(async (app) => {
        const job = await jobsDB.findById(app.jobId);
        return {
          ...app,
          job: job || null
        };
      })
    );
    
    res.json(applicationsWithJobs.reverse());
  } catch (error) {
    console.error('Başvurular getirme hatası:', error);
    res.status(500).json({ error: 'Başvurular getirilirken hata oluştu' });
  }
});

// Yeni başvuru oluştur
router.post('/', authenticate, async (req, res) => {
  try {
    const { jobId, coverLetter, proposedBudget } = req.body;

    if (!jobId || !coverLetter) {
      return res.status(400).json({ error: 'İş ID ve başvuru mektubu gerekli' });
    }

    const job = await jobsDB.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }

    // Kendi ilanına başvuramaz
    if (job.userId === req.userId) {
      return res.status(400).json({ error: 'Kendi ilanınıza başvuramazsınız' });
    }

    // Daha önce başvuru yapılmış mı kontrol et
    const existingApplication = await applicationsDB.findOne({
      jobId,
      userId: req.userId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Bu ilana zaten başvurdunuz' });
    }

    const application = {
      id: uuidv4(),
      jobId,
      userId: req.userId,
      coverLetter,
      proposedBudget: proposedBudget || '',
      status: 'pending', // pending, accepted, rejected
      createdAt: new Date().toISOString()
    };

    await applicationsDB.create(application);
    
    res.status(201).json(application);
  } catch (error) {
    console.error('Başvuru oluşturma hatası:', error);
    res.status(500).json({ error: 'Başvuru oluşturulurken hata oluştu' });
  }
});

// Başvuru durumunu güncelle (iş sahibi için)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const application = await applicationsDB.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }

    const job = await jobsDB.findById(application.jobId);
    
    if (!job || job.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    const { status } = req.body;
    
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Geçersiz durum' });
    }

    const updatedApplication = await applicationsDB.update(req.params.id, { status });
    
    res.json(updatedApplication);
  } catch (error) {
    console.error('Başvuru güncelleme hatası:', error);
    res.status(500).json({ error: 'Başvuru güncellenirken hata oluştu' });
  }
});

export default router;
