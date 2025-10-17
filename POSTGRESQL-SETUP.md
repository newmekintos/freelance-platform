# 🐘 PostgreSQL Setup - Kalıcı Veritabanı!

## ✅ Ne Değişti?

**Önce:** JSON dosyalar → Her restart'ta veriler siliniyor ❌  
**Şimdi:** PostgreSQL → Veriler kalıcı! ✅

---

## 🚀 Render'da PostgreSQL Ekleme (5 Dakika)

### 1️⃣ PostgreSQL Veritabanı Oluştur

1. **Render Dashboard** → **[New +]** → **[PostgreSQL]**
2. Ayarlar:
   ```
   Name: freelance-db
   Database: freelance
   User: freelance
   Region: Frankfurt (veya backend ile aynı)
   ```
3. **Free Plan** seç (0$)
4. **[Create Database]** tıkla

⏳ 1-2 dakika bekle, database hazırlanacak.

---

### 2️⃣ Database URL'ini Kopyala

1. Yeni oluşan **freelance-db** veritabanına tıkla
2. **Info** sekmesinde:
   - **Internal Database URL** kopyala
   
Örnek:
```
postgresql://freelance:xyz@dpg-abc123.frankfurt-postgres.render.com/freelance
```

---

### 3️⃣ Backend'e Database URL Ekle

1. **Render Dashboard** → **freelance-backend** servisi
2. **Environment** sekmesi
3. **Add Environment Variable**:
   ```
   Key: DATABASE_URL
   Value: [Kopyaladığın Internal Database URL]
   ```
4. **Save Changes**

---

### 4️⃣ Backend'i Redeploy Et

Backend otomatik redeploy olacak (1-2 dakika).

**Logs'da şunu görmelisin:**
```
✅ Database tables initialized
Server running on port 10000
Socket.io server ready
```

---

## 🎉 BİTTİ!

Artık:
- ✅ Kullanıcılar **kalıcı**
- ✅ İş ilanları **kalıcı**
- ✅ Servisler **kalıcı**
- ✅ Mesajlar **kalıcı**
- ✅ Restart olsa bile **veriler kaybolmaz**!

---

## 📊 Veritabanı Tabloları

PostgreSQL otomatik şu tabloları oluşturacak:

1. **users** → Kullanıcılar
2. **jobs** → İş ilanları
3. **services** → Freelancer servisleri
4. **applications** → İş başvuruları
5. **conversations** → Konuşmalar
6. **messages** → Mesajlar

---

## 🔍 Database'i Görüntüleme

**Render Dashboard:**
1. **freelance-db** → **Connect** → **PSQL Command** kopyala
2. Terminal'de çalıştır

**Sorgu örnekleri:**
```sql
-- Tüm kullanıcıları listele
SELECT id, name, email, role FROM users;

-- Tüm iş ilanlarını listele
SELECT id, title, category FROM jobs;

-- Kullanıcı sayısı
SELECT COUNT(*) FROM users;
```

---

## 💾 Backup (Opsiyonel)

Render otomatik backup alıyor ama manuel backup için:

1. **freelance-db** → **Backups** sekmesi
2. **[Create Backup]**

---

## 🆘 Sorun Giderme

### Backend başlamıyor

**Hata:** `connect ECONNREFUSED`

**Çözüm:** DATABASE_URL doğru mu? Internal Database URL kullan, External değil!

---

### Tablolar oluşmadı

**Logs kontrol et:**
```
❌ Database initialization error
```

Var mı? Hata mesajını oku, genelde connection problemi.

---

### Veriler hala kayboluyor

**Kontrol et:**
1. DATABASE_URL environment variable var mı?
2. Backend logs'da "Database tables initialized" yazıyor mu?
3. PostgreSQL database "Available" durumda mı?

---

## 💰 Maliyet

**SIFIR TL!** 💚

Render PostgreSQL Free Plan:
- ✅ 1 GB storage
- ✅ 1M rows
- ✅ Otomatik backup
- ✅ SSL dahil

**Tek başına kullanım için fazlasıyla yeterli!**

---

## 🎊 Özet

1. ✅ PostgreSQL database oluştur (2 dakika)
2. ✅ Database URL'i backend'e ekle (1 dakika)
3. ✅ Redeploy (2 dakika)
4. ✅ Veriler artık kalıcı! 🚀

**Platform profesyonel ve production-ready!** 💪
