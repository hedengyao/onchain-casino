# OnChain Casino - 一键部署脚本
# 使用方法：bash deploy.sh

echo "🎰 OnChain Casino 部署脚本"
echo "=========================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：需要安装 Node.js 18+"
    echo "请前往 https://nodejs.org 下载安装"
    exit 1
fi

echo "✅ Node.js 版本：$(node -v)"

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  未检测到 pnpm，尝试安装..."
    npm install -g pnpm
fi

echo "✅ pnpm 版本：$(pnpm -v)"

# 安装依赖
echo ""
echo "📦 正在安装依赖..."
pnpm install

# 构建项目
echo ""
echo "🔨 正在构建项目..."
pnpm build

# 检查 Git
if ! command -v git &> /dev/null; then
    echo "❌ 错误：需要安装 Git"
    echo "请前往 https://git-scm.com 下载安装"
    exit 1
fi

# 推送 GitHub
echo ""
echo "🚀 正在推送到 GitHub..."
git add -A
git commit -m "chore: 自动部署" || echo "没有更改需要提交"
git push origin main

echo ""
echo "✅ 推送完成！"
echo ""
echo "📋 下一步：部署到 Vercel"
echo "1. 访问 https://vercel.com/new"
echo "2. Import 你的 GitHub 仓库：hedengyao/onchain-casino"
echo "3. 添加环境变量（如果需要）："
echo "   - OKX_API_KEY"
echo "   - OKX_SECRET_KEY"
echo "   - OKX_PASSPHRASE"
echo "4. 点击 Deploy"
echo ""
echo "🎉 部署完成！"
