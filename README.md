# 🌐 Web3 Decentralized Freelance Platform

**Tamamen merkeziyetsiz**, sansür edilemez, blockchain tabanlı freelance marketplace. Merkezi sunucu, database veya otorite yok - her kullanıcı kendi verilerini kontrol eder.

## ⚡ Hızlı Başlangıç

```bash
# Tek komutla her şeyi başlat
npm run dev
```

Backend: http://localhost:5000  
Frontend: http://localhost:5173

## 🌍 Canlı Demo (IPFS)

**Live on IPFS:**
```
https://ipfs.io/ipfs/QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
https://dweb.link/ipfs/QmSRdZtufsFxs2NVy8gvDbeamuigwXUn7GE8MfoKA2cRz8
```

🌐 **Tamamen Decentralized** - Merkezi sunucu yok!

## 📦 Kurulum

```bash
# Tüm bağımlılıkları yükle
npm run install:all

# Development modda çalıştır
npm run dev
```

## ✨ Web3 Özellikler

### 🔒 Decentralization
- ✅ **Merkezi Sunucu YOK**: Tam P2P network
- ✅ **Database YOK**: Gun.js distributed database
- ✅ **Sansür Edilemez**: Kimse kapatamaز
- ✅ **Self-Hosted Data**: Her kullanıcı kendi verilerini barındırır

### 💰 Crypto Payments
- ✅ **MetaMask Integration**: Web3 wallet bağlantısı
- ✅ **ETH Payments**: Kripto ödemeler
- ✅ **Multi-Chain Support**: Ethereum, Polygon, BSC
- ✅ **Zero Commission**: Aracı yok, direkt ödemeler

### 🌐 IPFS Hosting
- ✅ **Decentralized Hosting**: IPFS network
- ✅ **Permanent Storage**: NFT.Storage/Filecoin
- ✅ **ENS Domains**: Web3 domain desteği
- ✅ **$0 Cost**: Tamamen bedava hosting

### 🔐 Security & Privacy
- ✅ **End-to-End Encryption**: Mesajlar şifreli
- ✅ **Self-Sovereign Identity**: Kendi kimliğini kontrol et
- ✅ **No Data Collection**: Hiçbir veri toplanmaz
- ✅ **Cryptographic Auth**: Private/public key sistemi

## 🛠️ Teknoloji Stack

### Web3 Layer
- **Gun.js** - Decentralized P2P database
- **Ethers.js** - Ethereum/Web3 library
- **MetaMask** - Crypto wallet integration
- **IPFS** - Decentralized file storage
- **WebRTC** - P2P connections

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router v6** - Navigation

## 🚀 IPFS Deployment

### Otomatik Deploy:
```bash
./deploy-ipfs.sh
```

### Manuel Deploy:
```bash
# Build
cd frontend
npm run build

# IPFS'e yükle
~/.local/bin/ipfs add -r dist/

# CID al ve eriş
# https://ipfs.io/ipfs/YOUR_CID
```

### Kalıcı Storage (Önerilen):
```bash
# NFT.Storage (Bedava, Kalıcı)
npx @nft-storage/cli upload frontend/dist/ --token YOUR_TOKEN
```

📚 **Detaylı rehber:** [IPFS-DEPLOYMENT.md](./IPFS-DEPLOYMENT.md)

## 📖 Kullanım

### 1. MetaMask Kur
```
chrome.google.com/webstore → MetaMask → Install
```

### 2. Test ETH Al (Testnet)
```
sepoliafaucet.com → Test ETH al
```

### 3. Cüzdan Bağla
- "Cüzdan Bağla" butonuna tıkla
- MetaMask'ta onayla

### 4. Platform Kullan
1. **Kayıt Ol** - P2P kimlik oluştur
2. **İlan Ver** - Decentralized database'e yayınla
3. **Başvur** - P2P network'te başvuru
4. **Mesajlaş** - End-to-end encrypted chat
5. **Öde** - ETH ile direkt ödeme

## 📚 Dokümantasyon

- **[WEB3-PLATFORM.md](./WEB3-PLATFORM.md)** - Web3 özellikleri ve mimari
- **[P2P-MODE.md](./P2P-MODE.md)** - P2P network detayları
- **[IPFS-DEPLOYMENT.md](./IPFS-DEPLOYMENT.md)** - IPFS deployment rehberi

## 🌟 Özellikler

### ✅ Şu An Aktif:
- Decentralized P2P database (Gun.js)
- MetaMask wallet entegrasyonu
- IPFS hosting
- End-to-end encrypted messaging
- Crypto payments ready
- Dark/Light theme

### 🔜 Gelecek Özellikler:
- Smart contracts (Escrow)
- IPFS file storage
- NFT badges
- DAO governance
- Platform token (FRLNC)
- ENS domain integration

## 💰 Maliyet

| Hizmet | Ücret |
|--------|-------|
| **Hosting** | $0 (IPFS) |
| **Database** | $0 (Gun.js P2P) |
| **Storage** | $0 (NFT.Storage) |
| **Bandwidth** | $0 (P2P) |
| **TOPLAM** | **$0/ay** |

## 🔒 Güvenlik

- ✅ End-to-end encryption
- ✅ Self-sovereign identity
- ✅ No central database
- ✅ Censorship resistant
- ✅ Private keys never stored
- ✅ Zero data collection

## Lisans

MIT
