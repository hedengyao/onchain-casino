#!/bin/bash

echo "🚀 OnChain Casino - Vercel 一键部署脚本"
echo "═══════════════════════════════════════"
echo ""

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查是否已登录
echo "🔐 检查 Vercel 登录状态..."
vercel whoami 2>/dev/null
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  请先登录 Vercel"
    echo "📝 执行：vercel login"
    echo ""
    vercel login
fi

echo ""
echo "🔨 开始部署..."
echo ""

# 部署到预览环境
vercel --yes

echo ""
echo "✅ 部署完成！"
echo "═══════════════════════════════════════"
echo ""
echo "🌐 访问你的应用："
echo "   vercel --prod"
echo ""
echo "📊 查看部署状态："
echo "   https://vercel.com/dashboard"
echo ""
