#!/bin/bash

echo "🚀 OnChain Casino 部署脚本"
echo "═══════════════════════════════════════"

# 检查是否已安装 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，正在安装..."
    npm install -g pnpm
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 构建项目
echo "🔨 构建项目..."
pnpm build

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
pnpm vercel --prod

echo ""
echo "✅ 部署完成！"
echo "═══════════════════════════════════════"
