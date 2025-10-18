import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Send } from 'lucide-react';
// TODO: Convert to Gun.js P2P
// import { messagesAPI } from '../lib/api';
import { useGunAuth } from '../context/GunAuthContext';
import { formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Messages = () => {
  const [searchParams] = useSearchParams();
  const { currentUser: user } = useGunAuth();
  // Socket removed - P2P mode uses Gun.js
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const conversationId = searchParams.get('conversation');
    if (conversationId && conversations.length > 0) {
      const conv = conversations.find(c => c.id === conversationId);
      if (conv) {
        selectConversation(conv);
      }
    }
  }, [searchParams, conversations]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (message) => {
      if (message.conversationId === selectedConversation?.id) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const response = await messagesAPI.getConversations();
      setConversations(response.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    
    try {
      const response = await messagesAPI.getConversationMessages(conversation.id);
      setMessages(response.data);
      
      if (socket) {
        socket.emit('join_conversation', conversation.id);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await messagesAPI.sendMessage({
        conversationId: selectedConversation.id,
        content: newMessage,
      });

      if (socket) {
        socket.emit('send_message', response.data);
      }

      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (socket && selectedConversation) {
      socket.emit('typing', {
        conversationId: selectedConversation.id,
        isTyping: true,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', {
          conversationId: selectedConversation.id,
          isTyping: false,
        });
      }, 1000);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div className="h-[calc(100vh-200px)] flex gap-4">
      {/* Conversations List */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Konuşmalar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              Henüz konuşma yok
            </div>
          ) : (
            <div className="divide-y">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="font-medium">{conv.otherUser?.name}</div>
                  {conv.lastMessage && (
                    <div className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage.content}
                    </div>
                  )}
                  {conv.lastMessage && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDate(conv.lastMessage.createdAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <CardTitle>{selectedConversation.otherUser?.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isOwn = message.senderId === user.id;
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </CardContent>

            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={handleTyping}
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <MessageSquare className="h-12 w-12 mx-auto opacity-50" />
              <p>Bir konuşma seçin</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Messages;
