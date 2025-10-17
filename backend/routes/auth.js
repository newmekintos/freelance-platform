import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { usersDB } from '../db-postgres.js';
import { config } from '../config.js';

const router = express.Router();

// Kayıt ol
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;

    if (!email || !password || !name || !userType) {
      return res.status(400).json({ error: 'Tüm alanlar gerekli' });
    }

    // Email kontrolü
    const existingUser = await usersDB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email zaten kullanılıyor' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcı oluştur
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      userType, // 'client' veya 'freelancer'
      bio: '',
      skills: [],
      createdAt: new Date().toISOString()
    };

    await usersDB.create(user);

    // Token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Şifreyi response'dan çıkar
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ error: 'Kayıt sırasında hata oluştu' });
  }
});

// Giriş yap
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email ve şifre gerekli' });
    }

    // Kullanıcıyı bul
    const user = await usersDB.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // Token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Şifreyi response'dan çıkar
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Giriş sırasında hata oluştu' });
  }
});

export default router;
