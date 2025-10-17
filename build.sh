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
npm install

echo "🏗️  Building frontend..."
npm run build

echo "✅ Build complete!"
