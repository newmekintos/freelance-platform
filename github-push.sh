#!/bin/bash

# GitHub Push Script - Otomatik
# Kullanıcı: newmekintos

echo "🚀 GitHub'a push yapılıyor..."
echo ""

# Remote ekle (hata olabilir, sorun değil)
git remote add origin https://github.com/newmekintos/freelance-platform.git 2>/dev/null

# Push yap
echo "📤 Dosyalar yükleniyor..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BAŞARILI! GitHub'a yüklendi!"
    echo "🔗 https://github.com/newmekintos/freelance-platform"
    echo ""
    echo "🚂 Şimdi Railway'e deploy edebilirsin!"
    echo "📖 SON-2-ADIM.txt dosyasına bak"
else
    echo ""
    echo "❌ Hata oluştu!"
    echo ""
    echo "💡 Çözüm:"
    echo "1. GitHub'da repo oluştur: https://github.com/new"
    echo "   - Name: freelance-platform"
    echo "   - Public"
    echo "   - Create repository"
    echo ""
    echo "2. Personal Access Token oluştur:"
    echo "   - https://github.com/settings/tokens"
    echo "   - Generate new token (classic)"
    echo "   - repo işaretle"
    echo "   - Generate token"
    echo "   - Token'i kopyala"
    echo ""
    echo "3. Bu scripti tekrar çalıştır"
    echo "   Şifre yerine token'i yapıştır"
fi
