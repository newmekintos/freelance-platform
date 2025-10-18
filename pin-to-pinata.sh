#!/bin/bash

# 📌 Pin to Pinata for Permanent IPFS Hosting
# 1GB bedava, sonsuza kadar pin

set -e

echo "🌐 Web3 Decentralized Pinning Service"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if API keys are set
if [ -z "$PINATA_API_KEY" ] || [ -z "$PINATA_SECRET_KEY" ]; then
    echo -e "${RED}❌ Pinata API keys bulunamadı!${NC}"
    echo ""
    echo -e "${YELLOW}Nasıl alınır:${NC}"
    echo ""
    echo "1. https://pinata.cloud adresine git"
    echo "2. Ücretsiz hesap oluştur (1GB bedava)"
    echo "3. API Keys → New Key → Admin yetkisi ver"
    echo "4. API Key ve Secret'i kopyala"
    echo ""
    echo -e "${BLUE}Export et:${NC}"
    echo ""
    echo "  export PINATA_API_KEY=your_api_key_here"
    echo "  export PINATA_SECRET_KEY=your_secret_key_here"
    echo ""
    echo "Sonra bu script'i tekrar çalıştır!"
    exit 1
fi

echo -e "${GREEN}✅ API keys bulundu!${NC}"
echo ""

# Get CID from last deployment
if [ ! -f .last-ipfs-cid ]; then
    echo -e "${RED}❌ CID bulunamadı! Önce deploy-ipfs.sh çalıştır.${NC}"
    exit 1
fi

CID=$(cat .last-ipfs-cid)
echo -e "${BLUE}📦 CID: $CID${NC}"
echo ""

# Pin existing IPFS hash to Pinata (pinByHash)
echo -e "${YELLOW}📌 IPFS hash Pinata'ya pin ediliyor...${NC}"

RESPONSE=$(curl -X POST "https://api.pinata.cloud/pinning/pinByHash" \
  -H "Content-Type: application/json" \
  -H "pinata_api_key: $PINATA_API_KEY" \
  -H "pinata_secret_api_key: $PINATA_SECRET_KEY" \
  -d "{\"hashToPin\":\"$CID\",\"pinataMetadata\":{\"name\":\"Freelance Platform\"}}" \
  -s)

echo ""

# Check if successful
if echo "$RESPONSE" | grep -q "IpfsHash"; then
    PINNED_CID=$(echo "$RESPONSE" | grep -o '"IpfsHash":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Pinata'ya başarıyla pin edildi!${NC}"
    echo ""
    echo -e "${BLUE}📌 Pinned CID: $PINNED_CID${NC}"
    echo ""
    echo -e "${GREEN}🌐 Artık siteniz kalıcı olarak IPFS'te!${NC}"
    echo ""
    echo "Erişim URL'leri:"
    echo "  🌍 https://ipfs.io/ipfs/$PINNED_CID"
    echo "  🌍 https://dweb.link/ipfs/$PINNED_CID"
    echo "  🌍 https://cloudflare-ipfs.com/ipfs/$PINNED_CID"
    echo "  🌍 https://gateway.pinata.cloud/ipfs/$PINNED_CID"
    echo ""
    echo -e "${YELLOW}💡 Not: Birkaç dakika içinde tüm gateway'lerde aktif olacak!${NC}"
else
    echo -e "${RED}❌ Pin işlemi başarısız!${NC}"
    echo ""
    echo "Response:"
    echo "$RESPONSE"
fi

echo ""
echo -e "${GREEN}🎉 İşlem tamamlandı!${NC}"
