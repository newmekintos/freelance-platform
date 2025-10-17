import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { servicesDB, usersDB } from '../db-postgres.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Tüm servisleri getir
router.get('/', async (req, res) => {
  try {
    const services = await servicesDB.read();
    
    // Her servis için kullanıcı bilgisini ekle
    const servicesWithUsers = await Promise.all(
      services.map(async (service) => {
        const user = await usersDB.findById(service.userId);
        return {
          ...service,
          user: user ? { id: user.id, name: user.name } : null
        };
      })
    );
    
    res.json(servicesWithUsers.reverse()); // En yeni önce
  } catch (error) {
    console.error('Servisler getirme hatası:', error);
    res.status(500).json({ error: 'Servisler getirilirken hata oluştu' });
  }
});

// Tek bir servisi getir
router.get('/:id', async (req, res) => {
  try {
    const service = await servicesDB.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ error: 'Servis bulunamadı' });
    }

    const user = await usersDB.findById(service.userId);
    
    res.json({
      ...service,
      user: user ? { id: user.id, name: user.name, email: user.email, bio: user.bio } : null
    });
  } catch (error) {
    console.error('Servis getirme hatası:', error);
    res.status(500).json({ error: 'Servis getirilirken hata oluştu' });
  }
});

// Yeni servis oluştur
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, price, category, skills, deliveryTime } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Başlık ve açıklama gerekli' });
    }

    const service = {
      id: uuidv4(),
      userId: req.userId,
      title,
      description,
      price: price || '',
      category: category || 'Diğer',
      skills: skills || [],
      deliveryTime: deliveryTime || '',
      status: 'active', // active, inactive
      createdAt: new Date().toISOString()
    };

    await servicesDB.create(service);

    const user = await usersDB.findById(req.userId);
    
    res.status(201).json({
      ...service,
      user: user ? { id: user.id, name: user.name } : null
    });
  } catch (error) {
    console.error('Servis oluşturma hatası:', error);
    res.status(500).json({ error: 'Servis oluşturulurken hata oluştu' });
  }
});

// Servisi güncelle
router.put('/:id', authenticate, async (req, res) => {
  try {
    const service = await servicesDB.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ error: 'Servis bulunamadı' });
    }

    if (service.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    const updates = {};
    ['title', 'description', 'price', 'category', 'skills', 'deliveryTime', 'status'].forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedService = await servicesDB.update(req.params.id, updates);
    
    res.json(updatedService);
  } catch (error) {
    console.error('Servis güncelleme hatası:', error);
    res.status(500).json({ error: 'Servis güncellenirken hata oluştu' });
  }
});

// Servisi sil
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const service = await servicesDB.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ error: 'Servis bulunamadı' });
    }

    if (service.userId !== req.userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok' });
    }

    await servicesDB.delete(req.params.id);
    
    res.json({ message: 'Servis silindi' });
  } catch (error) {
    console.error('Servis silme hatası:', error);
    res.status(500).json({ error: 'Servis silinirken hata oluştu' });
  }
});

export default router;
