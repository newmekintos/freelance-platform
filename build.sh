#!/bin/bash

# Build script for Render deployment
# This builds both frontend and backend

echo "🚀 Starting build process..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install --include=dev

echo "🏗️  Building frontend..."
npm run build

# Verify build
if [ -d "dist" ]; then
  echo "✅ Frontend build successful! dist folder created."
  ls -la dist/
else
  echo "❌ Frontend build failed! dist folder not found."
  exit 1
fi

echo "✅ Build complete!"
