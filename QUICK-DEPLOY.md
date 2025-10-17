# ⚡ Hızlı Deploy Rehberi - newmekintos

## 🎯 3 Adımda Deploy Et

### Adım 1: GitHub'a Yükle (2 dakika)

```bash
# Script'i çalıştır
chmod +x deploy-setup.sh
./deploy-setup.sh
```

Sonra:
1. https://github.com/new adresine git
2. Repository name: `freelance-platform`
3. **Public** seç
4. README ve .gitignore **EKLEME**
5. **Create repository** tıkla

Ardından terminal'de:
```bash
git remote add origin https://github.com/newmekintos/freelance-platform.git
git push -u origin main
```

---

### Adım 2: Railway'de Deploy (3 dakika)

1. https://railway.app → **Login with GitHub**
2. **New Project**
3. **Deploy from GitHub repo** seç
4. **newmekintos/freelance-platform** seç

#### Backend Servisi:
1. **Add Service** → **Empty Service**
2. Settings:
   - **Name**: `freelance-backend`
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
3. Variables (Settings → Variables):
   ```
   JWT_SECRET=freelance-super-secret-key-2024-xyz
   NODE_ENV=production
   ```
4. **Deploy**

#### Frontend Servisi:
1. **Add Service** → **Empty Service**
2. Settings:
   - **Name**: `freelance-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. Variables:
   ```
   VITE_API_URL=https://freelance-backend.up.railway.app/api
   ```
   (Backend URL'ini backend servisinden kopyala)
4. **Deploy**

#### CORS Ayarı:
1. Backend servisine dön
2. Variables → Add Variable:
   ```
   CORS_ORIGIN=https://freelance-frontend.up.railway.app
   ```
   (Frontend URL'ini frontend servisinden kopyala)
3. **Redeploy**

---

### Adım 3: Test Et! 🎉

Frontend URL'e git: `https://freelance-frontend.up.railway.app`

Platform canlıda! 🚀

---

## 🆘 Hızlı Yardım

**Backend çalışmıyor?**
→ Railway'de Logs'a bak, Environment Variables doğru mu kontrol et

**Frontend backend'e bağlanmıyor?**
→ CORS_ORIGIN doğru mu? VITE_API_URL doğru mu?

**500 saat yeterli mi?**
→ Evet! Aylık ~20 gün 7/24 çalışır

---

## 📊 Ne Kadar Sürer?

- ⏱️ GitHub upload: 2 dakika
- ⏱️ Railway setup: 3 dakika
- ⏱️ Deploy: 2 dakika
- **TOPLAM: ~7 dakika**

---

## 💡 Pro İpuçları

1. **Custom Domain**: Railway'de Settings → Domains'den ekleyebilirsin
2. **Monitoring**: Railway dashboard'dan real-time logs izle
3. **Auto Deploy**: Git push yaptığında otomatik deploy olur
4. **Database**: İlerisi için PostgreSQL ekleyebilirsin (ücretsiz)

---

## 🎊 Başarılar!

Platform tamamen ücretsiz ve yayında olacak!

Sorular için: Railway Discord veya docs.railway.app
