import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { jobsDB, usersDB } from '../database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Tüm iş ilanlarını getir
router.get('/', async (req, res) => {
  try {
    const jobs = await jobsDB.read();
    
    // Her iş için kullanıcı bilgisini ekle
    const jobsWithUsers = await Promise.all(
      jobs.map(async (job) => {
        const user = await usersDB.findById(job.userId);
        return {
          ...job,
          user: user ? { id: user.id, name: user.name } : null
        };
      })
    );
    
    res.json(jobsWithUsers.reverse()); // En yeni önce
  } catch (error) {
    console.error('İş ilanları getirme hatası:', error);
    res.status(500).json({ error: 'İş ilanları getirilirken hata oluştu' });
  }
});

// Tek bir iş ilanını getir
router.get('/:id', async (req, res) => {
  try {
    const job = await jobsDB.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }

    const user = await usersDB.findById(job.userId);
    
    res.json({
      ...job,
      user: user ? { id: user.id, name: user.name, email: user.email } : null
    });
  } catch (error) {
    console.error('İş ilanı getirme hatası:', error);
    res.status(500).json({ error: 'İş ilanı getirilirken hata oluştu' });
  }
});

// Yeni iş ilanı oluştur
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, budget, category, skills } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Başlık ve açıklama gerekli' });
    }

    const job = {
      id: uuidv4(),
      userId: req.userId,
      title,
      description,
      budget: budget || '',
      category: category || 'Diğer',
      skills: skills || [],
      status: 'open', // open, closed
      createdAt: new Date().toISOString()
    };

    await jobsDB.create(job);

    const user = await usersDB.findById(req.userId);
    
    res.status(201).json({
      ...job,
      user: user ? { id: user.id, name: user.name } : null
    });
  } catch (error) {
    console.error('İş ilanı oluşturma hatası:', error);
    res.status(500).json({ error: 'İş ilanı oluşturulurken hata oluştu' });
  }
});

// İş ilanını güncelle
router.put('/:id', authenticate, async (req, res) => {
  try {
    const job = await jobsDB.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }

    if (job.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    const updates = {};
    ['title', 'description', 'budget', 'category', 'skills', 'status'].forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedJob = await jobsDB.update(req.params.id, updates);
    
    res.json(updatedJob);
  } catch (error) {
    console.error('İş ilanı güncelleme hatası:', error);
    res.status(500).json({ error: 'İş ilanı güncellenirken hata oluştu' });
  }
});

// İş ilanını sil
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const job = await jobsDB.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'İş ilanı bulunamadı' });
    }

    if (job.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    await jobsDB.delete(req.params.id);
    
    res.json({ message: 'İş ilanı silindi' });
  } catch (error) {
    console.error('İş ilanı silme hatası:', error);
    res.status(500).json({ error: 'İş ilanı silinirken hata oluştu' });
  }
});

export default router;
