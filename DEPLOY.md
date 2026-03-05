# 🚀 OnChain Casino - 部署指南

## 前置要求

- Node.js 18+ 
- pnpm / npm / yarn
- GitHub 账号
- Vercel 账号（可选，用于自动部署）

---

## 方法一：使用 Vercel 一键部署（推荐）

### 步骤 1：推送代码到 GitHub

```bash
cd onchain-casino

# 提交代码
git add -A
git commit -m "feat: 更新代码，准备部署"

# 推送到 GitHub
git push origin main
```

### 步骤 2：在 Vercel 上部署

1. 访问 [https://vercel.com/new](https://vercel.com/new)
2. 点击 **Import Git Repository**
3. 选择你的仓库：`hedengyao/onchain-casino`
4. 点击 **Import**

### 步骤 3：配置环境变量（可选）

如果需要 OKX API 功能，在 Vercel 项目设置中添加以下环境变量：

- `OKX_API_KEY` - 你的 OKX API 密钥
- `OKX_SECRET_KEY` - 你的 OKX 密钥
- `OKX_PASSPHRASE` - 你的 OKX 密码短语

> 获取 OKX API 密钥：访问 [OKX Dev Portal](https://web3.okx.com/onchain-os/dev-portal)

### 步骤 4：点击 Deploy

点击 **Deploy** 按钮，等待部署完成（约 2-3 分钟）

### 步骤 5：访问应用

部署完成后，你会获得一个类似这样的域名：
- `https://onchain-casino.vercel.app`

---

## 方法二：手动部署

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地开发

```bash
pnpm dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 启动生产服务器

```bash
pnpm start
```

---

## 方法三：使用部署脚本

### Windows (PowerShell)

```powershell
.\deploy.bat
```

### Linux / macOS

```bash
bash deploy.sh
```

---

## 故障排除

### 问题 1：推送 GitHub 失败

**错误信息**: `Failed to connect to github.com port 443`

**解决方案**:
1. 检查网络连接
2. 尝试使用 SSH 方式：
   ```bash
   git remote set-url origin git@github.com:hedengyao/onchain-casino.git
   git push origin main
   ```

### 问题 2：Vercel 部署失败

**错误信息**: `Build failed`

**解决方案**:
1. 检查 `package.json` 中的依赖版本
2. 查看 Vercel 部署日志，找到具体错误
3. 确保 `next.config.js` 配置正确

### 问题 3：OKX API 无法调用

**错误信息**: `OKX API 配置缺失`

**解决方案**:
1. 在 Vercel 项目设置中添加环境变量
2. 重新部署项目

---

## 自定义域名（可选）

1. 在 Vercel 项目设置中找到 **Domains**
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

---

## 部署后检查清单

- [ ] 首页正常加载
- [ ] 所有页面路由正常（/prediction, /battle-royale, /teams, /bet）
- [ ] 钱包连接功能正常
- [ ] 语言切换功能正常
- [ ] 响应式设计正常（移动端适配）
- [ ] OKX API 调用正常（如已配置）

---

## 联系支持

如有问题，请查看：
- [README.md](./README.md) - 项目说明
- [玩法介绍.md](./玩法介绍.md) - 功能介绍
- [项目总结.md](./项目总结.md) - 技术架构

---

**Built with ❤️ using OKX OnchainOS Skills**
