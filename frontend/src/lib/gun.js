import Gun from 'gun';
import 'gun/sea'; // Encryption
import 'gun/axe'; // Network optimization

// Suppress Gun.js peer connection errors in production
if (import.meta.env.PROD) {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    // Suppress WebSocket/peer connection errors
    if (message.includes('WebSocket') || 
        message.includes('peer') || 
        message.includes('gun')) {
      return;
    }
    originalError.apply(console, args);
  };
}

// P2P Gun Database Instance
// Her kullanıcı bu database'i kendi cihazında çalıştırır
export const gun = Gun({
  // Peers: İlk bağlantı için relay sunucuları (opsiyonel)
  // Platform tamamen localStorage ile çalışır, peers opsiyoneldir
  peers: [],
  // Local storage: Browser'da veri sakla (ana veri kaynağı)
  localStorage: true,
  // IndexedDB: Daha büyük veriler için
  radisk: true,
  // WebRTC: Direkt peer-to-peer bağlantı
  multicast: false, // Console errors'ı azaltmak için kapalı
});

// User authentication system
export const user = gun.user();

// SEA (Security, Encryption, Authorization)
export const SEA = Gun.SEA;

// Helper: Generate unique ID
export const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper: Current timestamp
export const timestamp = () => Date.now();

// Network status
export const isOnline = () => navigator.onLine;

export default gun;
