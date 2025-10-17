import express from 'express';
import { usersDB } from '../db-postgres.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Mevcut kullanıcı bilgilerini getir
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await usersDB.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı bilgileri getirilirken hata oluştu' });
  }
});

// Kullanıcı profilini güncelle
router.put('/me', authenticate, async (req, res) => {
  try {
    const updates = {};
    ['name', 'bio', 'skills'].forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await usersDB.update(req.userId, updates);
    
    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({ error: 'Profil güncellenirken hata oluştu' });
  }
});

// Belirli bir kullanıcının profilini getir
router.get('/:id', async (req, res) => {
  try {
    const user = await usersDB.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const { password, email, ...publicUserInfo } = user;
    res.json(publicUserInfo);
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı bilgileri getirilirken hata oluştu' });
  }
});

export default router;
