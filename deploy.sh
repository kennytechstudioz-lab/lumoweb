#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export PATH=$PATH:/usr/local/bin:~/.npm-global/bin

echo "=============================="
echo "  Lumo Web — Auto Deploy"
echo "=============================="

PROJECT_DIR="/var/www/projects/banking/lumo/web"

echo "[1/5] Navigating to project..."
cd "$PROJECT_DIR"

echo "[2/5] Pulling latest changes from git..."
git pull origin main

echo "[3/5] Installing dependencies..."
npm install --legacy-peer-deps

echo "[4/5] Building Next.js app..."
npm run build

echo "[5/5] Restarting PM2 process: lumo-web..."
pm2 restart lumo-web || npx pm2 restart lumo-web

echo ""
echo "✅ Lumo Web deployed successfully!"

