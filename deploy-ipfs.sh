#!/bin/bash

# 🌐 Web3 Decentralized Deployment Script
# Deploy to IPFS + NFT.Storage for permanent hosting

set -e

echo "🚀 Starting Web3 Deployment..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Build Frontend
echo -e "${BLUE}📦 Building frontend...${NC}"
cd frontend
npm run build
cd ..
echo -e "${GREEN}✅ Build complete!${NC}"
echo ""

# 2. Add to IPFS
echo -e "${BLUE}🌐 Adding to IPFS...${NC}"
CID=$(~/.local/bin/ipfs add -r -Q frontend/dist/)
echo -e "${GREEN}✅ Added to IPFS!${NC}"
echo -e "${YELLOW}CID: $CID${NC}"
echo ""

# 3. Save CID
echo $CID > .last-ipfs-cid
echo -e "${GREEN}💾 CID saved to .last-ipfs-cid${NC}"
echo ""

# 4. Display URLs
echo -e "${BLUE}🔗 Your site is now live at:${NC}"
echo ""
echo -e "  ${GREEN}Gateway 1:${NC} https://ipfs.io/ipfs/$CID"
echo -e "  ${GREEN}Gateway 2:${NC} https://dweb.link/ipfs/$CID"
echo -e "  ${GREEN}Gateway 3:${NC} https://cloudflare-ipfs.com/ipfs/$CID"
echo -e "  ${GREEN}Gateway 4:${NC} https://$CID.ipfs.dweb.link"
echo ""

# 5. NFT.Storage (Optional)
echo -e "${YELLOW}💡 To pin permanently on NFT.Storage (FREE & PERMANENT):${NC}"
echo ""
echo "  1. Sign up: https://nft.storage"
echo "  2. Get API key"
echo "  3. Run:"
echo "     export NFT_STORAGE_TOKEN=your_token_here"
echo "     npx @nft-storage/cli upload frontend/dist/ --token \$NFT_STORAGE_TOKEN"
echo ""

# 6. ENS Domain (Optional)
echo -e "${YELLOW}💡 To connect ENS domain:${NC}"
echo ""
echo "  1. Buy ENS: https://app.ens.domains"
echo "  2. Set Content Record to: ipfs://$CID"
echo ""

# 7. Summary
echo -e "${GREEN}✨ Deployment Complete!${NC}"
echo ""
echo -e "${BLUE}📊 Summary:${NC}"
echo "  • CID: $CID"
echo "  • Size: $(du -sh frontend/dist/ | cut -f1)"
echo "  • Decentralized: ✅"
echo "  • Censorship Resistant: ✅"
echo "  • Cost: \$0"
echo ""
echo -e "${GREEN}🎉 Your Web3 platform is live!${NC}"
