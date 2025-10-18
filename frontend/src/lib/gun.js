import Gun from 'gun';
import 'gun/sea'; // Encryption
import 'gun/axe'; // Network optimization

// P2P Gun Database Instance
// Her kullanıcı bu database'i kendi cihazında çalıştırır
export const gun = Gun({
  // Peers: Relay sunucuları - Farklı cihazlar arası sync için ZORUNLU!
  // Laptop'ta hesap aç → Telefonda giriş yap → Peer sayesinde sync olur
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    'https://gunjs.herokuapp.com/gun',
  ],
  // Local storage: Browser'da veri sakla
  localStorage: true,
  // IndexedDB: Daha büyük veriler için
  radisk: true,
  // WebRTC: Direkt peer-to-peer bağlantı
  multicast: true,
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
