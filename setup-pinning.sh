#!/bin/bash

# 🔧 Interactive Pinning Setup
# Pinata hesabı ve API key setup

set -e

echo "🌐 Web3 Permanent Storage Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Bu script Pinata (bedava IPFS pinning servisi) kurulumunu yapacak."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Account
echo -e "${YELLOW}Adım 1/3: Pinata Hesabı${NC}"
echo ""
echo "1. https://pinata.cloud adresini aç"
echo "2. 'Sign Up' butonuna tıkla"
echo "3. Email ile ücretsiz hesap oluştur"
echo "4. Email'ini doğrula"
echo ""
read -p "Hesabı oluşturdun mu? (y/n): " account_created

if [ "$account_created" != "y" ]; then
    echo ""
    echo -e "${RED}Önce hesap oluştur, sonra devam et!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Hesap hazır!${NC}"
echo ""

# Step 2: API Keys
echo -e "${YELLOW}Adım 2/3: API Keys Al${NC}"
echo ""
echo "1. Pinata'da 'API Keys' menüsüne git"
echo "2. 'New Key' butonuna tıkla"
echo "3. Permissions: 'Admin' seç (tüm yetkiler)"
echo "4. Key Name: 'Freelance Platform' yaz"
echo "5. 'Create Key' tıkla"
echo "6. API Key ve API Secret'i kopyala"
echo ""
read -p "API Key'i aldın mı? (y/n): " api_ready

if [ "$api_ready" != "y" ]; then
    echo ""
    echo -e "${RED}Önce API key al, sonra devam et!${NC}"
    exit 1
fi

echo ""

# Get API Keys
echo -e "${BLUE}API Key'leri gir:${NC}"
echo ""
read -p "Pinata API Key: " api_key
read -p "Pinata API Secret: " api_secret

echo ""
echo -e "${GREEN}✅ API Keys alındı!${NC}"
echo ""

# Step 3: Save to env file
echo -e "${YELLOW}Adım 3/3: Kaydet${NC}"
echo ""

# Save to .env file
cat > .pinata.env << EOF
# Pinata API Configuration
export PINATA_API_KEY=$api_key
export PINATA_SECRET_KEY=$api_secret
EOF

chmod 600 .pinata.env

echo -e "${GREEN}✅ API keys kaydedildi!${NC}"
echo ""

# Add to bashrc for permanent use
if ! grep -q ".pinata.env" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Pinata IPFS Pinning" >> ~/.bashrc
    echo "if [ -f $PWD/.pinata.env ]; then" >> ~/.bashrc
    echo "    source $PWD/.pinata.env" >> ~/.bashrc
    echo "fi" >> ~/.bashrc
    echo ""
    echo -e "${GREEN}✅ .bashrc'ye eklendi (kalıcı)${NC}"
fi

# Source the env file
source .pinata.env

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Setup tamamlandı!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Şimdi pinleme yapabilirsin:${NC}"
echo ""
echo "  ./pin-to-pinata.sh"
echo ""
echo -e "${YELLOW}💡 API keys güvenli bir şekilde .pinata.env dosyasına kaydedildi${NC}"
echo ""
