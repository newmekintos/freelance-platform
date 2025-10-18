# 🌐 P2P Mode - Decentralized Freelance Platform

## 🎯 NEDİR?

**P2P Mode**, Freelance Platform'un tamamen merkeziyetsiz versiyonudur. Her kullanıcı kendi cihazında veri barındırır ve diğer kullanıcılarla P2P (peer-to-peer) network üzerinden senkronize olur.

## ✨ ÖZELLİKLER

### 🔒 Tam Gizlilik
- Merkezi sunucu yok
- End-to-end encryption
- Sadece sen verilerine sahipsin

### 💰 Tamamen Bedava
- Sunucu maliyeti yok
- Database ücreti yok
- Sınırsız kullanım

### 🌍 Sansür Edilemez
- Merkezi otorite yok
- Kimse seni engelleyemez
- Veriler dağıtık

### 📴 Offline Çalışır
- İnternet kesilince bile kullanılır
- Local-first architecture
- Bağlantı olunca sync olur

## 🚀 NASIL ÇALIŞIR?

```
┌──────────────┐     P2P Network     ┌──────────────┐
│   USER 1     │ ◄──────────────────► │   USER 2     │
│ (Browser DB) │                      │ (Browser DB) │
└──────────────┘                      └──────────────┘
       ▲                                      ▲
       │           ┌──────────────┐           │
       └───────────┤   USER 3     │───────────┘
                   │ (Browser DB) │
                   └──────────────┘
```

### Teknoloji:
- **Gun.js**: P2P database
- **WebRTC**: Peer-to-peer bağlantı
- **SEA**: Encryption (Security, Encryption, Authorization)
- **IndexedDB**: Local storage

## 📋 KULLANIM

### 1. Mode Seçimi
İlk açılışta size 2 mod sunulur:
- **P2P Mode**: Decentralized
- **Classic Mode**: Traditional server

### 2. P2P Mode'da Kayıt Ol
```
Username: ahmet
Password: güçlü_şifre
```

Kayıt bilgileri:
- ✅ Local cihazında saklanır
- ✅ Diğer peer'larla sync olur
- ✅ Merkezi sunucuda SAKLANMAZ

### 3. İş İlanı Ver / Servis Sun
```javascript
// İlan oluştur
const job = await createJob({
  title: "Web Tasarım",
  budget: 5000,
  description: "Modern web sitesi"
});

// Otomatik olarak P2P network'e yayınlanır
// Tüm aktif kullanıcılar görebilir
```

### 4. Mesajlaş (Encrypted)
```javascript
// Mesajlar end-to-end encrypted
const encrypted = await SEA.encrypt(message, conversationId);

// Sadece konuşma katılımcıları okuyabilir
```

## 🔧 TEKNİK DETAYLAR

### Gun.js Database Schema

```javascript
gun
  ├── users (User profiles)
  │   └── <user_pub_key>
  │       ├── username
  │       ├── email
  │       ├── bio
  │       └── skills
  │
  ├── jobs (Job listings)
  │   └── <job_id>
  │       ├── title
  │       ├── budget
  │       ├── createdBy
  │       └── applications
  │
  ├── services (Freelancer services)
  │   └── <service_id>
  │       ├── title
  │       ├── price
  │       └── createdBy
  │
  ├── conversations
  │   └── <conv_id>
  │       ├── participants[]
  │       └── messages (encrypted)
  │
  └── applications
      └── <app_id>
          ├── jobId
          └── applicantId
```

### Encryption

```javascript
// SEA (Security, Encryption, Authorization)
const encrypted = await SEA.encrypt(data, secret);
const decrypted = await SEA.decrypt(encrypted, secret);

// Her mesaj konuşma ID'si ile şifrelenir
// Sadece katılımcılar çözebilir
```

### Sync Mekanizması

```javascript
// Real-time sync
gun.get('jobs').map().on((job) => {
  // Yeni iş ilanı geldiğinde otomatik günceller
  updateJobsList(job);
});
```

## ⚠️ LİMİTASYONLAR

### 1. Cold Start
```
❌ İlk kullanıcı verisi sync etmeli
⏱️ İlk yükleme daha yavaş olabilir
```

### 2. Browser Storage Limiti
```
❌ IndexedDB limiti: ~50MB - 1GB (browser'a göre)
💡 Eski veriler otomatik temizlenebilir
```

### 3. Discovery
```
❌ Peer bulmak için relay server gerekli
💡 Public relay'ler kullanıyoruz
```

### 4. Spam/Moderation
```
❌ Merkezi moderasyon yok
💡 User-based reputation sistemi gerekli
```

## 🔄 MODE DEĞİŞTİRME

### P2P → Classic
```javascript
// LocalStorage'dan mode'u değiştir
localStorage.setItem('platform_mode', 'classic');

// Sayfayı yenile
window.location.reload();
```

### Classic → P2P
```javascript
localStorage.setItem('platform_mode', 'p2p');
window.location.reload();
```

## 🛠️ DEVELOPMENT

### Local Relay Server Çalıştır

```bash
# Gun relay server kur
npm install -g gun

# Start relay
gun
```

### Custom Relay Ekle

```javascript
// src/lib/gun.js
export const gun = Gun({
  peers: [
    'http://localhost:8765/gun', // Local relay
    'https://your-relay.com/gun', // Custom relay
  ],
});
```

## 📊 KARŞILAŞTIRMA

| Özellik | P2P Mode | Classic Mode |
|---------|----------|--------------|
| **Maliyet** | 💚 Bedava | 💰 Server gerekli |
| **Hız** | ⚡ Başlangıç yavaş | ⚡ Hızlı |
| **Gizlilik** | 🔒 Tam | 🔒 Sunucu görür |
| **Sansür** | ✅ Edilemez | ⚠️ Edilebilir |
| **Offline** | ✅ Çalışır | ❌ Çalışmaz |
| **Kararlılık** | ⚠️ Experimental | ✅ Stabil |

## 🎯 KULLANIM SENARYOLARI

### P2P Mode İçin İdeal:
- ✅ Gizlilik öncelikli projeler
- ✅ Sansür riski olan bölgeler
- ✅ Bedava hosting arıyorsan
- ✅ Experimental özellikler test etmek

### Classic Mode İçin İdeal:
- ✅ Production ready uygulama
- ✅ Hızlı ve stabil sistem
- ✅ Daha az teknik bilgi
- ✅ Güvenilir platform

## 🚀 GELECEK PLANLARI

### v2.0 (Yakında)
- [ ] WebRTC direkt peer bağlantıları
- [ ] IPFS dosya depolama
- [ ] Reputation sistemi
- [ ] Spam koruması

### v3.0 (Gelecek)
- [ ] Blockchain entegrasyonu
- [ ] Kripto ödemeler
- [ ] Smart contracts
- [ ] DAO governance

## 📚 KAYNAKLAR

- [Gun.js Documentation](https://gun.eco/docs/)
- [P2P Web Principles](https://peer-to-peer-web.com/)
- [WebRTC Tutorial](https://webrtc.org/)

## 💬 DESTEK

P2P mode hakkında sorularınız için:
- GitHub Issues
- Discord: [Link]
- Email: support@freelanceplatform.com

---

**Not:** P2P Mode experimental bir özelliktir. Production kullanımı için Classic Mode önerilir.
