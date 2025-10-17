# 🚀 Tek Komutla Başlatma Rehberi

## ⚡ Hızlı Başlangıç

### İlk Kurulum (Bir Kez)

```bash
# Root dizinde tüm bağımlılıkları yükle
npm run install:all
```

Bu komut sırayla:
1. Root package.json bağımlılıklarını yükler (concurrently)
2. Backend bağımlılıklarını yükler
3. Frontend bağımlılıklarını yükler

### Her Defasında

```bash
# Tek komutla hem backend hem frontend başlat
npm run dev
```

Bu komut **eş zamanlı** olarak:
- ✅ Backend'i başlatır → http://localhost:5000
- ✅ Frontend'i başlatır → http://localhost:5173

## 📋 Diğer Komutlar

```bash
# Sadece backend'i çalıştır
npm run dev:backend

# Sadece frontend'i çalıştır
npm run dev:frontend

# Frontend'i build et (production)
npm run build
```

## 🎯 Terminal Çıktısı

Komut çalıştığında şöyle görünecek:

```
[backend] Server running on port 5000
[backend] Socket.io server ready
[frontend] 
[frontend]   VITE v5.4.20  ready in 550 ms
[frontend]   
[frontend]   ➜  Local:   http://localhost:5173/
```

## ⌨️ Kısayollar

Terminal'deyken:
- **Ctrl+C** → Her ikisini de durdur
- **rs** → Backend'i yeniden başlat (nodemon)

## 🔧 Sorun Giderme

**Port zaten kullanımda hatası:**
```bash
# Ports'ları temizle (Linux/Mac)
lsof -ti:5000 | xargs kill
lsof -ti:5173 | xargs kill
```

**Bağımlılık hatası:**
```bash
# Yeniden yükle
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

## 🎉 Hazırsın!

Artık tek komutla tüm platformu çalıştırabilirsin:

```bash
npm run dev
```

Browser'da http://localhost:5173 aç ve platformu kullanmaya başla! 🚀
