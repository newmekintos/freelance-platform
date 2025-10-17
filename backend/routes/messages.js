import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { conversationsDB, messagesDB, usersDB } from '../db-postgres.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Kullanıcının tüm konuşmalarını getir
router.get('/conversations', authenticate, async (req, res) => {
  try {
    const conversations = await conversationsDB.read();
    
    // Kullanıcının dahil olduğu konuşmaları filtrele
    const userConversations = conversations.filter(conv => 
      conv.participants.includes(req.userId)
    );

    // Her konuşma için diğer katılımcının bilgisini ve son mesajı ekle
    const conversationsWithDetails = await Promise.all(
      userConversations.map(async (conv) => {
        const otherUserId = conv.participants.find(id => id !== req.userId);
        const otherUser = await usersDB.findById(otherUserId);
        
        // Son mesajı getir
        const conversationMessages = await messagesDB.find({ conversationId: conv.id });
        const lastMessage = conversationMessages.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        return {
          ...conv,
          otherUser: otherUser ? { id: otherUser.id, name: otherUser.name } : null,
          lastMessage: lastMessage || null
        };
      })
    );

    // En son mesajı olana göre sırala
    conversationsWithDetails.sort((a, b) => {
      const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(a.createdAt);
      const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(b.createdAt);
      return dateB - dateA;
    });
    
    res.json(conversationsWithDetails);
  } catch (error) {
    console.error('Konuşmalar getirme hatası:', error);
    res.status(500).json({ error: 'Konuşmalar getirilirken hata oluştu' });
  }
});

// Belirli bir konuşmanın mesajlarını getir
router.get('/conversations/:conversationId', authenticate, async (req, res) => {
  try {
    const conversation = await conversationsDB.findById(req.params.conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Konuşma bulunamadı' });
    }

    // Kullanıcı bu konuşmanın katılımcısı mı?
    if (!conversation.participants.includes(req.userId)) {
      return res.status(403).json({ error: 'Bu konuşmaya erişim yetkiniz yok' });
    }

    const messages = await messagesDB.find({ conversationId: req.params.conversationId });
    
    // Mesajları zamana göre sırala
    messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    res.json(messages);
  } catch (error) {
    console.error('Mesajlar getirme hatası:', error);
    res.status(500).json({ error: 'Mesajlar getirilirken hata oluştu' });
  }
});

// Yeni konuşma başlat veya mevcut olanı getir
router.post('/conversations', authenticate, async (req, res) => {
  try {
    const { otherUserId } = req.body;

    if (!otherUserId) {
      return res.status(400).json({ error: 'Kullanıcı ID gerekli' });
    }

    if (otherUserId === req.userId) {
      return res.status(400).json({ error: 'Kendinizle konuşamazsınız' });
    }

    // Diğer kullanıcı var mı?
    const otherUser = await usersDB.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Mevcut bir konuşma var mı kontrol et
    const conversations = await conversationsDB.read();
    const existingConversation = conversations.find(conv => 
      conv.participants.includes(req.userId) && conv.participants.includes(otherUserId)
    );

    if (existingConversation) {
      return res.json(existingConversation);
    }

    // Yeni konuşma oluştur
    const conversation = {
      id: uuidv4(),
      participants: [req.userId, otherUserId],
      createdAt: new Date().toISOString()
    };

    await conversationsDB.create(conversation);
    
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Konuşma oluşturma hatası:', error);
    res.status(500).json({ error: 'Konuşma oluşturulurken hata oluştu' });
  }
});

// Mesaj gönder
router.post('/send', authenticate, async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ error: 'Konuşma ID ve mesaj içeriği gerekli' });
    }

    const conversation = await conversationsDB.findById(conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Konuşma bulunamadı' });
    }

    // Kullanıcı bu konuşmanın katılımcısı mı?
    if (!conversation.participants.includes(req.userId)) {
      return res.status(403).json({ error: 'Bu konuşmaya mesaj gönderme yetkiniz yok' });
    }

    const message = {
      id: uuidv4(),
      conversationId,
      senderId: req.userId,
      content,
      createdAt: new Date().toISOString()
    };

    await messagesDB.create(message);
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    res.status(500).json({ error: 'Mesaj gönderilirken hata oluştu' });
  }
});

export default router;
