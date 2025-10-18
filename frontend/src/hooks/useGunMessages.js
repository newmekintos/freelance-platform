import { useState, useEffect } from 'react';
import { gun, user, SEA, generateId, timestamp } from '../lib/gun';

export const useGunMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time message listener (P2P)
  useEffect(() => {
    if (!conversationId) return;

    const messagesRef = gun.get('conversations').get(conversationId).get('messages');
    const loadedMessages = new Map();
    
    messagesRef.map().on(async (encryptedMsg, id) => {
      if (encryptedMsg && encryptedMsg.text) {
        // Decrypt message (only participants can read)
        try {
          const decrypted = await SEA.decrypt(encryptedMsg.text, conversationId);
          const message = {
            id,
            text: decrypted,
            senderId: encryptedMsg.senderId,
            senderName: encryptedMsg.senderName,
            timestamp: encryptedMsg.timestamp,
          };
          
          loadedMessages.set(id, message);
          setMessages(
            Array.from(loadedMessages.values()).sort((a, b) => a.timestamp - b.timestamp)
          );
        } catch (err) {
          console.error('Failed to decrypt message:', err);
        }
      }
    });

    setLoading(false);

    return () => {
      messagesRef.off();
    };
  }, [conversationId]);

  // Send message (encrypted P2P)
  const sendMessage = async (text) => {
    if (!user.is) {
      throw new Error('Must be authenticated');
    }

    if (!conversationId || !text.trim()) return;

    const messageId = generateId();
    
    // Encrypt message
    const encrypted = await SEA.encrypt(text, conversationId);
    
    const message = {
      text: encrypted,
      senderId: user.is.pub,
      senderName: user.is.alias,
      timestamp: timestamp(),
    };

    // Broadcast to P2P network
    gun.get('conversations').get(conversationId).get('messages').get(messageId).put(message);
    
    // Update conversation's last message
    gun.get('conversations').get(conversationId).put({
      lastMessageAt: timestamp(),
      lastMessage: text.substring(0, 100),
    });

    return messageId;
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};

// Get or create conversation between two users
export const useConversation = (otherUserId) => {
  const [conversationId, setConversationId] = useState(null);
  
  useEffect(() => {
    if (!user.is || !otherUserId) return;
    
    // Generate deterministic conversation ID
    const ids = [user.is.pub, otherUserId].sort();
    const convId = `conv_${ids.join('_')}`;
    
    // Initialize conversation if doesn't exist
    gun.get('conversations').get(convId).once((existing) => {
      if (!existing) {
        gun.get('conversations').get(convId).put({
          id: convId,
          participants: ids,
          createdAt: timestamp(),
        });
      }
    });
    
    setConversationId(convId);
  }, [otherUserId]);
  
  return conversationId;
};

// Get all user conversations
export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    if (!user.is) return;
    
    const myPub = user.is.pub;
    const convRef = gun.get('conversations');
    const loadedConvs = new Map();
    
    convRef.map().on((conv, id) => {
      if (conv && conv.participants && conv.participants.includes(myPub)) {
        loadedConvs.set(id, { id, ...conv });
        setConversations(
          Array.from(loadedConvs.values()).sort((a, b) => 
            (b.lastMessageAt || 0) - (a.lastMessageAt || 0)
          )
        );
      }
    });
    
    return () => {
      convRef.off();
    };
  }, []);
  
  return conversations;
};
