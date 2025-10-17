#!/bin/bash

# Freelance Platform - Otomatik GitHub ve Railway Setup
# Kullanıcı: newmekintos

echo "🚀 Freelance Platform Deploy Kurulumu Başlıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Git kurulu mu kontrol et
if ! command -v git &> /dev/null
then
    echo -e "${RED}❌ Git kurulu değil. Lütfen önce git kurun.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 1. Git Repository Oluşturuluyor...${NC}"

# Git init
git init

# .gitignore zaten var, kontrol et
if [ ! -f .gitignore ]; then
    echo -e "${YELLOW}⚠️  .gitignore bulunamadı, oluşturuluyor...${NC}"
fi

# Git config
git config user.email "newmekintos@gmail.com"
git config user.name "newmekintos"

echo -e "${GREEN}✅ Git yapılandırıldı${NC}"

# Tüm dosyaları ekle
echo -e "${BLUE}📝 2. Dosyalar Git'e ekleniyor...${NC}"
git add .

# Commit
git commit -m "Initial commit - Freelance Platform ready for deployment"

echo -e "${GREEN}✅ Commit oluşturuldu${NC}"

# Ana branch'i main yap
git branch -M main

echo ""
echo -e "${GREEN}✅ Git repository hazır!${NC}"
echo ""
echo -e "${YELLOW}📋 SONRAKİ ADIMLAR:${NC}"
echo ""
echo -e "${BLUE}1. GitHub'da yeni repo oluştur:${NC}"
echo "   - https://github.com/new adresine git"
echo "   - Repository name: freelance-platform"
echo "   - Public seç"
echo "   - README ve .gitignore EKLEME (bizde zaten var)"
echo "   - Create repository tıkla"
echo ""
echo -e "${BLUE}2. Sonra aşağıdaki komutu çalıştır:${NC}"
echo -e "${GREEN}   git remote add origin https://github.com/newmekintos/freelance-platform.git${NC}"
echo -e "${GREEN}   git push -u origin main${NC}"
echo ""
echo -e "${BLUE}3. Railway deployment için:${NC}"
echo "   - https://railway.app adresine git"
echo "   - GitHub ile giriş yap"
echo "   - New Project → Deploy from GitHub repo"
echo "   - freelance-platform repo'sunu seç"
echo ""
echo -e "${YELLOW}Veya deploy-railway.sh scriptini çalıştır!${NC}"
echo ""
