# 🚀 Fleek.co Deployment Guide

## 🌐 TAM MERKEZIYETSIZ + BEDAVA + SINIRSIZ WEB3 HOSTING

Fleek.co ile frontend'in:
- ✅ IPFS'te host edilir
- ✅ Filecoin'de backup'lanır
- ✅ Otomatik deploy olur (git push)
- ✅ ENS domain bağlanabilir
- ✅ TAMAMEN BEDAVA
- ✅ SINIRSIZ

---

## 📋 KURULUM (5 DAKİKA)

### **1. Fleek'e Kayıt Ol:**

```
1. https://fleek.co → Aç
2. "Sign Up with GitHub" tıkla
3. GitHub authorization onayla
```

✅ **Hesap hazır!**

---

### **2. Site Ekle:**

```
1. Dashboard → "Add New Site"
2. "Connect with GitHub"
3. Repository: newmekintos/freelance-platform
4. Framework preset: Vite
5. Build settings:
   - Build Command: npm run build
   - Publish Directory: frontend/dist
   - Base Directory: frontend
6. "Deploy Site" tıkla
```

✅ **İlk deploy başladı!**

---

### **3. Deployment Tamamlandı:**

2-3 dakika sonra:

```
✅ Build complete
✅ IPFS'e yüklendi
✅ Filecoin'e backup'landı
✅ Live!

URL'ler:
  🌍 https://your-site.fleek.co
  🌍 https://ipfs.io/ipfs/QmXxx...
  🌍 ipfs://QmXxx...
```

---

## 🔄 OTOMATIK DEPLOYMENT

Her `git push` otomatik deploy olur:

```bash
# Kod değişikliği yap
git add .
git commit -m "feat: new feature"
git push

# Fleek otomatik:
# 1. GitHub webhook alır
# 2. Repo'yu clone eder
# 3. npm run build çalıştırır
# 4. IPFS'e yükler
# 5. Filecoin backup yapar
# 6. Live olur!

# 2-3 dakika sonra yeni versiyon yayında!
```

---

## 🌐 ENS DOMAIN BAĞLAMA (OPSİYONEL)

### **1. ENS Domain Al:**

```
1. https://app.ens.domains
2. Domain ara: freelance.eth
3. Satın al (~$5/yıl)
```

### **2. Fleek'te Bağla:**

```
1. Fleek Dashboard → Your Site → Settings
2. Domain Management → Add ENS Domain
3. Domain gir: freelance.eth
4. Connect Wallet (MetaMask)
5. Sign transaction
```

✅ **Artık freelance.eth → IPFS sitenize gider!**

**Erişim:**
```
https://freelance.eth.limo
https://freelance.eth.link
ipns://freelance.eth
```

---

## 📊 FLEEK ÖZELLIKLERI

### **Deployment:**
```
✅ GitHub integration
✅ Auto deploy on push
✅ Preview deployments (PR'lar için)
✅ Rollback support
✅ Build logs
```

### **Hosting:**
```
✅ IPFS hosting
✅ Filecoin backup
✅ Global CDN
✅ SSL otomatik
✅ Custom domains
✅ ENS domains
```

### **Performance:**
```
✅ CDN hızında
✅ Global distribution
✅ Caching
✅ Compression
```

---

## 🆚 NEDEN FLEEK?

### **vs Render/Vercel:**
```
Fleek:
  ✅ IPFS (decentralized)
  ✅ Filecoin backup
  ✅ Sansür edilemez
  ✅ Web3 native

Render/Vercel:
  ❌ Centralized
  ❌ Sansür edilebilir
  ❌ Web2
```

### **vs Manuel IPFS:**
```
Fleek:
  ✅ Otomatik deploy
  ✅ CI/CD
  ✅ ENS integration
  ✅ Preview builds

Manuel IPFS:
  ❌ Manuel upload
  ❌ CI/CD yok
  ❌ Daha fazla iş
```

---

## 💰 FİYATLANDIRMA

### **Free Plan (ŞU AN):**
```
✅ Unlimited sites
✅ Unlimited deployments
✅ Unlimited bandwidth
✅ Unlimited storage
✅ IPFS + Filecoin
✅ Custom domains
✅ ENS domains
✅ SSL
✅ GitHub integration

Fiyat: $0/ay SONSUZA KADAR
```

### **Pro Plan (Gelecek):**
```
$10/ay:
  + Team collaboration
  + Advanced analytics
  + Priority support
  + Custom IPFS gateways
```

**Senin projen için Free yeterli!**

---

## 🔧 AYARLAR

### **Build Settings:**

```yaml
Framework: Vite
Build Command: npm run build
Publish Directory: frontend/dist
Base Directory: frontend

Environment Variables:
  NODE_VERSION: 18
```

### **Custom Domain:**

```
1. Settings → Domain Management
2. Add Custom Domain
3. Domain gir: freelanceplatform.com
4. DNS ayarlarını yap:
   CNAME: your-site.fleek.co
```

---

## 🎯 WORKFLOW

```
┌─────────────────┐
│  Developer      │
│  (You)          │
└────────┬────────┘
         │
         ▼
    git push
         │
         ▼
┌─────────────────┐
│  GitHub         │
│  (Source)       │
└────────┬────────┘
         │
         ▼
    Webhook
         │
         ▼
┌─────────────────┐
│  Fleek          │
│  (Build & Deploy)│
└────────┬────────┘
         │
         ▼
    Build + Upload
         │
         ▼
┌─────────────────┐
│  IPFS           │
│  (Hosting)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Filecoin       │
│  (Backup)       │
└─────────────────┘
         │
         ▼
    🌍 LIVE!
```

---

## 🚀 HEMEN BAŞLA

### **1. Fleek'e Kayıt:**
```
https://fleek.co
```

### **2. GitHub Bağla:**
```
Repository: newmekintos/freelance-platform
```

### **3. Deploy Et:**
```
Build Command: npm run build
Publish Dir: frontend/dist
```

### **4. Bitir:**
```
2-3 dakika sonra → LIVE!
```

---

## 📚 KAYNAKLAR

- **Fleek Docs:** https://docs.fleek.co
- **IPFS Docs:** https://docs.ipfs.tech
- **ENS Docs:** https://docs.ens.domains

---

## 🎉 SONUÇ

**Fleek.co ile:**
- ✅ Tamamen merkeziyetsiz
- ✅ Sansür edilemez
- ✅ BEDAVA
- ✅ SINIRSIZ
- ✅ Otomatik deployment
- ✅ Web3 native
- ✅ ENS domain ready

**Tam bir Web3 platform hosting!** 🌐🚀
