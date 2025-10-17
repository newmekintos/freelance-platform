# Freelance Platform Backend

Bu basit bir freelance platformunun backend API'sidir.

## Özellikler

- ✅ Basit kullanıcı kaydı ve girişi (KYC yok)
- ✅ İş ilanları oluşturma ve yönetimi
- ✅ Freelancer servisleri
- ✅ İş başvuruları
- ✅ Gerçek zamanlı chat (Socket.io)
- ✅ JWT tabanlı kimlik doğrulama

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
# Development mode
npm run dev

# Production mode
npm start
```

API http://localhost:5000 adresinde çalışacaktır.

## API Endpoints

### Auth
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap

### Jobs
- `GET /api/jobs` - Tüm iş ilanları
- `GET /api/jobs/:id` - Tek iş ilanı
- `POST /api/jobs` - Yeni iş ilanı (auth gerekli)
- `PUT /api/jobs/:id` - İş ilanı güncelle (auth gerekli)
- `DELETE /api/jobs/:id` - İş ilanı sil (auth gerekli)

### Services
- `GET /api/services` - Tüm servisler
- `GET /api/services/:id` - Tek servis
- `POST /api/services` - Yeni servis (auth gerekli)
- `PUT /api/services/:id` - Servis güncelle (auth gerekli)
- `DELETE /api/services/:id` - Servis sil (auth gerekli)

### Applications
- `GET /api/applications/job/:jobId` - İş için başvurular (auth gerekli)
- `GET /api/applications/my-applications` - Kendi başvurularım (auth gerekli)
- `POST /api/applications` - Yeni başvuru (auth gerekli)
- `PUT /api/applications/:id` - Başvuru durumu güncelle (auth gerekli)

### Messages
- `GET /api/messages/conversations` - Tüm konuşmalar (auth gerekli)
- `GET /api/messages/conversations/:id` - Konuşma mesajları (auth gerekli)
- `POST /api/messages/conversations` - Yeni konuşma başlat (auth gerekli)
- `POST /api/messages/send` - Mesaj gönder (auth gerekli)

### Users
- `GET /api/users/me` - Kendi profilim (auth gerekli)
- `PUT /api/users/me` - Profil güncelle (auth gerekli)
- `GET /api/users/:id` - Kullanıcı profili

## Socket.io Events

### Client -> Server
- `join_conversation` - Konuşmaya katıl
- `leave_conversation` - Konuşmadan ayrıl
- `send_message` - Mesaj gönder
- `typing` - Yazıyor göstergesi

### Server -> Client
- `new_message` - Yeni mesaj
- `user_typing` - Kullanıcı yazıyor
