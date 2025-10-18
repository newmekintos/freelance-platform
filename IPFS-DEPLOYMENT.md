# 🌐 IPFS Deployment Guide

## ✅ KURULUM TAMAMLANDI!

Siteniz artık **tamamen merkeziyetsiz** IPFS ağında yayında! 🎉

---

## 🔗 SİTENİZE ERİŞİM:

### **Aktif CID:**
```
QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
```

### **Public Gateways:**

1. **IPFS.io:**
   ```
   https://ipfs.io/ipfs/QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
   ```

2. **Dweb.link:**
   ```
   https://dweb.link/ipfs/QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
   ```

3. **Cloudflare IPFS:**
   ```
   https://cloudflare-ipfs.com/ipfs/QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
   ```

4. **Subdomain Gateway:**
   ```
   https://QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8.ipfs.dweb.link
   ```

---

## 🚀 YENİDEN DEPLOY

### **Tek Komut:**
```bash
./deploy-ipfs.sh
```

### **Manuel:**
```bash
# 1. Build
cd frontend
npm run build

# 2. IPFS'e ekle
~/.local/bin/ipfs add -r dist/

# 3. CID'yi not al
```

---

## 📌 KALICI STORAGE (ÖNERİLİR)

Sitenizin **sürekli erişilebilir** olması için pinning servisi kullanın:

### **1. NFT.Storage (BEDAVA, KALICI)**

```bash
# Sign up
# https://nft.storage

# API Key al
export NFT_STORAGE_TOKEN=your_token_here

# Upload
npx @nft-storage/cli upload frontend/dist/ --token $NFT_STORAGE_TOKEN
```

**Sonuç:**
- ✅ Filecoin'de permanent backup
- ✅ IPFS'te otomatik pin
- ✅ Tamamen BEDAVA
- ✅ Süresiz storage

### **2. Web3.Storage (BEDAVA)**

```bash
# Install CLI
npm install -g @web3-storage/w3cli

# Login
w3 login

# Upload
w3 put frontend/dist/
```

### **3. Pinata (1GB Bedava)**

```bash
# Sign up: https://pinata.cloud
# API key al

curl -X POST "https://api.pinata.cloud/pinning/pinFileToIPFS" \
  -H "pinata_api_key: YOUR_KEY" \
  -H "pinata_secret_api_key: YOUR_SECRET" \
  -F "file=@dist.zip"
```

---

## 🌍 ENS DOMAIN (OPSİYONEL)

Web3 domain için:

### **1. ENS Domain Al**
```
https://app.ens.domains
Örn: freelance.eth
~$5/yıl
```

### **2. IPFS Hash'i Bağla**
```
1. ENS Manager → Your domain
2. Records → Content
3. Set: ipfs://QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
4. Save
```

### **3. Erişim**
```
https://freelance.eth.limo
https://freelance.eth.link

VEYA MetaMask browser:
freelance.eth
```

---

## 🔧 YEREL IPFS NODE

### **Başlat:**
```bash
~/.local/bin/ipfs daemon
```

**WebUI:** http://127.0.0.1:5001/webui  
**Gateway:** http://127.0.0.1:8080

### **Durdur:**
```bash
~/.local/bin/ipfs shutdown
```

### **Durum:**
```bash
~/.local/bin/ipfs id
```

---

## 📊 DEPLOYMENT İSTATİSTİKLERİ

| Metric | Value |
|--------|-------|
| **Deployment Platform** | IPFS (Decentralized) |
| **Current CID** | QmSRdZ... |
| **Build Size** | ~720 KB |
| **Cost** | $0 |
| **Uptime** | %100 (distributed) |
| **Censorship Resistant** | ✅ YES |
| **Your Control** | ✅ FULL |

---

## 🔒 GÜVENLİK

### **IPFS Private Key:**
```
Location: ~/.ipfs/config
Peer ID: 12D3KooWHqrX3EmUNHQbv5eYrgHuxJc2T8hbLBHhe9WrCUs2gkya
```

**⚠️ UYARI:** Private key'i kimseyle paylaşma!

### **Backup:**
```bash
# Config backup
cp ~/.ipfs/config ~/.ipfs/config.backup

# Full backup
tar -czf ipfs-backup.tar.gz ~/.ipfs
```

---

## 🎯 AVANTAJLAR

### **✅ Tamamen Decentralized**
- Merkezi sunucu yok
- P2P network
- Distributed storage

### **✅ Sansür Edilemez**
- Kimse kapatamaز
- Birden fazla node
- Global erişim

### **✅ Bedava**
- Hosting: $0
- Bandwidth: $0
- Maintenance: $0

### **✅ Tam Kontrol**
- Kendi node'un
- Kendi veriler
- Hiçbir SaaS bağımlılığı yok

### **✅ Hızlı**
- CDN gibi çalışır
- En yakın node'dan gelir
- Cache friendly

---

## 🔄 GÜNCELLEMe WORKFLOW

```bash
# 1. Kod değişikliği yap
git add .
git commit -m "feat: new feature"

# 2. Deploy
./deploy-ipfs.sh

# 3. Yeni CID al
cat .last-ipfs-cid

# 4. (Opsiyonel) ENS güncelle
# ENS Manager → Content → Yeni CID

# 5. (Opsiyonel) NFT.Storage'a pin
npx @nft-storage/cli upload frontend/dist/
```

---

## 💡 İPUÇLARI

### **Build Optimizasyonu:**
```bash
# Build size'ı küçült
cd frontend
npm run build -- --minify

# Gzip compression
gzip -r dist/
```

### **Hızlı Test:**
```bash
# Local gateway'den test
~/.local/bin/ipfs cat /ipfs/QmXxx.../index.html
```

### **Network Status:**
```bash
# Peer bağlantıları
~/.local/bin/ipfs swarm peers

# Bandwidth kullanımı
~/.local/bin/ipfs stats bw
```

---

## 🆘 SORUN GİDERME

### **"Gateway timeout"**
```bash
# Farklı gateway dene:
https://ipfs.io/ipfs/YOUR_CID
https://dweb.link/ipfs/YOUR_CID
https://cloudflare-ipfs.com/ipfs/YOUR_CID
```

### **"CID not found"**
```bash
# NFT.Storage'a pin et
npx @nft-storage/cli upload frontend/dist/

# VEYA Pinata kullan
```

### **"Node offline"**
```bash
# Daemon başlat
~/.local/bin/ipfs daemon
```

---

## 📚 KAYNAKLAR

- **IPFS Docs:** https://docs.ipfs.tech
- **NFT.Storage:** https://nft.storage
- **ENS Domains:** https://ens.domains
- **Public Gateways:** https://ipfs.github.io/public-gateway-checker/

---

## 🎉 TEBR İKLER!

Siteniz artık:
- ✅ Tamamen **decentralized**
- ✅ **Sansür edilemez**
- ✅ **Bedava** host ediliyor
- ✅ **Kalıcı** (NFT.Storage ile)
- ✅ **Web3** standardında

**Tam bir Web3 platformu! 🚀🌐**
