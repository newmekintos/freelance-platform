# 🚀 Freelance Platform

Modern, hızlı ve kullanıcı dostu bir freelance platformu. İş verenler ve freelancerlar için KYC, ödeme sistemi gibi karmaşık süreçler olmadan direkt bağlantı kurmayı sağlar.

## ⚡ Hızlı Başlangıç

```bash
# Tek komutla her şeyi başlat
npm run dev
```

Backend: http://localhost:5000  
Frontend: http://localhost:5173

## 🌍 Canlı Demo

**Yakında:** Platform Railway'de deploy edilecek!

## 📦 Kurulum

```bash
# Tüm bağımlılıkları yükle
npm run install:all

# Development modda çalıştır
npm run dev
```

## Özellikler

- ✅ **Basit Kayıt ve Giriş**: KYC olmadan hızlı hesap oluşturma
- ✅ **İş İlanları**: İş verenler kolayca ilan verebilir, freelancerlar başvurabilir
- ✅ **Freelancer Servisleri**: Freelancerlar kendi hizmetlerini listeleyebilir
- ✅ **Başvuru Sistemi**: Freelancerlar iş ilanlarına başvuru yapabilir
- ✅ **Gerçek Zamanlı Chat**: Socket.io ile anlık mesajlaşma
- ✅ **Profil Yönetimi**: Kullanıcılar profillerini düzenleyebilir
- ✅ **Modern UI**: React + TailwindCSS + shadcn/ui tarzı bileşenler

## Teknoloji Stack

### Backend
- Node.js + Express
- Socket.io (Gerçek zamanlı mesajlaşma)
- JWT (Kimlik doğrulama)
- JSON dosya tabanlı veritabanı

### Frontend
- React 18
- Vite
- React Router v6
- TailwindCSS
- Socket.io Client
- Axios
- Lucide Icons

## Kurulum

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend http://localhost:5000 adresinde çalışacaktır.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacaktır.

## Kullanım

1. **Kayıt Ol**: İş veren veya freelancer olarak hesap oluşturun
2. **İlan Ver**: 
   - İş verenler iş ilanı verebilir
   - Freelancerlar kendi servislerini listeleyebilir
3. **Başvur/İletişim**: 
   - Freelancerlar iş ilanlarına başvurabilir
   - Herkes mesajlaşma ile iletişime geçebilir
4. **Mesajlaş**: Gerçek zamanlı chat ile direkt iletişim

## Proje Yapısı

```
freelance-platform/
├── backend/
│   ├── routes/          # API rotaları
│   ├── middleware/      # Middleware'ler
│   ├── data/           # JSON veritabanı
│   ├── database.js     # Veritabanı yönetimi
│   ├── config.js       # Yapılandırma
│   └── server.js       # Ana sunucu dosyası
│
└── frontend/
    ├── src/
    │   ├── components/  # UI bileşenleri
    │   ├── context/    # React Context'ler
    │   ├── lib/        # Yardımcı fonksiyonlar
    │   ├── pages/      # Sayfa bileşenleri
    │   ├── App.jsx     # Ana uygulama
    │   └── main.jsx    # Giriş noktası
    └── index.html
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap

### Jobs
- `GET /api/jobs` - Tüm iş ilanları
- `GET /api/jobs/:id` - Tek iş ilanı
- `POST /api/jobs` - Yeni iş ilanı
- `PUT /api/jobs/:id` - İş ilanı güncelle
- `DELETE /api/jobs/:id` - İş ilanı sil

### Services
- `GET /api/services` - Tüm servisler
- `GET /api/services/:id` - Tek servis
- `POST /api/services` - Yeni servis
- `PUT /api/services/:id` - Servis güncelle
- `DELETE /api/services/:id` - Servis sil

### Messages
- `GET /api/messages/conversations` - Konuşmalar
- `GET /api/messages/conversations/:id` - Mesajlar
- `POST /api/messages/conversations` - Yeni konuşma
- `POST /api/messages/send` - Mesaj gönder

## Socket.io Events

- `join_conversation` - Konuşmaya katıl
- `send_message` - Mesaj gönder
- `new_message` - Yeni mesaj (server)
- `typing` - Yazıyor göstergesi

## Notlar

- Bu platform basitlik için tasarlanmıştır
- Ödeme entegrasyonu yoktur
- KYC süreci yoktur
- Veritabanı JSON dosyaları ile çalışır (production için uygun değil)
- Production'a almadan önce:
  - Gerçek bir veritabanı kullanın (MongoDB, PostgreSQL vb.)
  - JWT secret'ını değiştirin
  - CORS ayarlarını yapılandırın
  - Rate limiting ekleyin
  - Input validation güçlendirin

## Lisans

MIT
