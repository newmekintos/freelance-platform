#!/bin/bash

# 📌 Pin to Web3.Storage (BEDAVA, SINIRSIZ!)
# Pinata'dan daha iyi - CID pin bedava!

echo "🌐 Web3.Storage Pinning"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get CID
if [ ! -f .last-ipfs-cid ]; then
    echo "❌ CID bulunamadı! Önce deploy-ipfs.sh çalıştır."
    exit 1
fi

CID=$(cat .last-ipfs-cid)
echo "📦 CID: $CID"
echo ""

echo "Web3.Storage kullanmak için:"
echo ""
echo "1. https://web3.storage → Sign Up (BEDAVA)"
echo "2. Create Space"
echo "3. Get API Token"
echo ""
echo "4. Terminal'de:"
echo "   npm install -g @web3-storage/w3cli"
echo "   w3 login"
echo "   w3 can space add <email>"
echo ""
echo "5. Upload:"
echo "   cd frontend"
echo "   w3 put dist/"
echo ""
echo "✅ BEDAVA + SINIRSIZ storage!"
echo "✅ Otomatik IPFS pin"
echo "✅ Filecoin backup"
echo ""
