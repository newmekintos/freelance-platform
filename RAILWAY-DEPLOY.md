# 🚂 Railway Deployment - Son Adım!

## ✅ GitHub Hazır
Repo: https://github.com/newmekintos/freelance-platform

---

## 🚀 Railway Deploy (5 Dakika)

### 1️⃣ Railway'e Giriş Yap

https://railway.app

**[Login with GitHub]** tıkla (newmekintos)

---

### 2️⃣ Yeni Proje Oluştur

- **[New Project]** tıkla
- **[Deploy from GitHub repo]** seç
- **newmekintos/freelance-platform** seç
- **[Deploy Now]** tıkla

---

### 3️⃣ Backend Servisi Yapılandır

Railway otomatik detect edecek, ama yine de kontrol et:

1. Backend servisine tıkla
2. **Settings** sekmesi
3. **Root Directory**: `backend` (otomatik ayarlı olmalı)
4. **Start Command**: `npm start` (otomatik ayarlı olmalı)
5. **Variables** sekmesine git
6. **[Raw Editor]** tıkla ve ekle:

```env
JWT_SECRET=freelance-platform-secret-key-2024-prod-xyz-secure
NODE_ENV=production
PORT=5000
```

7. **[Save Changes]**

---

### 4️⃣ Frontend Servisi Yapılandır

1. Frontend servisine tıkla
2. **Settings** sekmesi
3. **Root Directory**: `frontend`
4. **Build Command**: `npm run build`
5. **Start Command**: `npm run start`
6. **Variables** sekmesine git

⚠️ **ÖNEMLİ:** Backend URL'ini kopyala!

Backend servisine git → **Settings** → URL'i kopyala (örn: https://freelance-backend-production-xxxx.up.railway.app)

Frontend **Variables** → **[Raw Editor]**:

```env
VITE_API_URL=https://BACKEND_URL_BURAYA/api
```

(BACKEND_URL_BURAYA yerine kopyaladığın URL'i yapıştır, sonuna /api ekle)

7. **[Save Changes]**
8. **[Redeploy]** tıkla (sağ üstte)

---

### 5️⃣ CORS Ayarı (Son Adım!)

⚠️ **ÖNEMLİ:** Frontend URL'ini kopyala!

Frontend servisine git → **Settings** → URL'i kopyala (örn: https://freelance-frontend-production-xxxx.up.railway.app)

Backend servisine dön → **Variables** → **[Raw Editor]**

Ekle:

```env
CORS_ORIGIN=https://FRONTEND_URL_BURAYA
```

(FRONTEND_URL_BURAYA yerine frontend URL'ini yapıştır)

**[Save Changes]**

Backend'i **[Redeploy]** et

---

## 🎉 BİTTİ!

Platform canlıda! 🚀

**Frontend URL'e git:**
https://your-frontend-url.up.railway.app

---

## 📊 Ne Yaptık?

✅ GitHub repo oluşturuldu
✅ 77 dosya yüklendi
✅ Railway'de 2 servis deploy edildi
✅ Environment variables ayarlandı
✅ CORS yapılandırıldı
✅ HTTPS otomatik aktif

---

## 💰 Maliyet

**SIFIR TL** - Tamamen ücretsiz!

Railway ücretsiz tier:
- 500 saat/ay (yaklaşık 20 gün 7/24)
- Sleep yok
- HTTPS dahil
- Otomatik deploy

---

## 🔄 Güncellemeler

Kod güncellemek için:

```bash
git add .
git commit -m "Update"
git push
```

Railway otomatik deploy eder!

---

## 🆘 Sorun Çıkarsa

**Backend çalışmıyor:**
- Railway dashboard → Backend servisi → **Logs**
- Environment variables doğru mu?

**Frontend backend'e bağlanmıyor:**
- CORS_ORIGIN doğru mu?
- VITE_API_URL doğru mu?
- /api unutmadın mı?

**Deploy süresi:**
- İlk deploy 2-3 dakika sürebilir
- Logs'da takip et

---

## 🎊 Başarılar!

Platform artık canlıda ve dünya çapında erişilebilir! 🌍

Paylaş, test et, kullan! 🚀
