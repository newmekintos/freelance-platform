#!/bin/bash

# Tüm useAuth import'larını useGunAuth ile değiştir

cd frontend/src

# Find all .jsx and .js files and replace
find . -name "*.jsx" -o -name "*.js" | while read file; do
  # Skip AuthContext.jsx and GunAuthContext.jsx
  if [[ "$file" == *"AuthContext.jsx"* ]]; then
    continue
  fi
  
  # Replace import
  sed -i "s/import { useAuth } from/import { useGunAuth } from/g" "$file"
  sed -i "s/useAuth } from '\.\.\/context\/AuthContext'/useGunAuth } from '..\/context\/GunAuthContext'/g" "$file"
  sed -i "s/useAuth } from '\.\.\/\.\.\/context\/AuthContext'/useGunAuth } from '..\/..\/context\/GunAuthContext'/g" "$file"
  
  # Replace hook usage - add alias for backward compatibility
  sed -i "s/const { user/const { currentUser: user/g" "$file"
  sed -i "s/const { login, register/const { login, register/g" "$file"
  sed -i "s/updateUser/updateProfile/g" "$file"
  
  echo "Fixed: $file"
done

echo ""
echo "✅ All files updated!"
echo ""
echo "Note: Check Dashboard.jsx, Messages.jsx manually for complex usages"
