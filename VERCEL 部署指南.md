# 🚀 OnChain Casino - Vercel 一键部署指南

> ✅ 代码已成功推送到 GitHub！

---

## 📋 当前状态

- ✅ 代码已推送到 GitHub：`https://github.com/hedengyao/onchain-casino`
- ✅ 最新提交：`dd10295 - docs: 添加完成报告`
- ✅ 构建验证：通过
- ⏳ 下一步：部署到 Vercel

---

## 🌐 部署到 Vercel（5 分钟完成）

### 步骤 1：访问 Vercel

打开浏览器访问：**https://vercel.com/new**

### 步骤 2：登录/注册

点击 **Continue with GitHub** 使用 GitHub 账号登录

### 步骤 3：Import 项目

1. 点击 **Import Git Repository**
2. 在列表中找到 `hedengyao/onchain-casino`
3. 点击 **Import**

### 步骤 4：配置项目

| 配置项 | 值 |
|--------|-----|
| **Framework Preset** | Next.js（自动识别） |
| **Root Directory** | `./`（默认） |
| **Build Command** | `pnpm build` 或 `npm build` |
| **Output Directory** | `.next`（默认） |

### 步骤 5：添加环境变量（可选）

如需 OKX API 功能，点击 **Environment Variables** 添加：

```
OKX_API_KEY=your_api_key_here
OKX_SECRET_KEY=your_secret_key_here
OKX_PASSPHRASE=your_passphrase_here
```

> ⚠️ 如没有 OKX API 密钥，可跳过此步骤，应用仍可正常运行

### 步骤 6：点击 Deploy

点击 **Deploy** 按钮，等待 2-3 分钟

### 步骤 7：部署完成！🎉

你会看到：
- ✅ **Deployment successful**
- 访问域名：`https://onchain-casino-xxx.vercel.app`

点击 **Visit** 访问你的应用！

---

## 📱 测试功能

访问部署后的网站，测试以下功能：

### 基础测试
- [ ] 首页加载正常
- [ ] 导航栏正常显示
- [ ] 语言切换功能正常（中/英/日/韩）
- [ ] 钱包连接按钮正常

### 页面测试
- [ ] `/prediction` - 预测市场页面
- [ ] `/battle-royale` - 交易大逃杀页面
- [ ] `/teams` - 组队打新页面
- [ ] `/bet` - 对赌协议页面

### 钱包测试
- [ ] 点击连接钱包按钮
- [ ] 钱包弹窗正常显示
- [ ] 支持 MetaMask 和 Phantom

---

## 🔧 高级配置

### 自定义域名（可选）

1. 在 Vercel 项目设置中找到 **Domains**
2. 点击 **Add** 添加你的域名
3. 按照提示配置 DNS 记录：
   ```
   Type: CNAME
   Name: www (或 @)
   Value: cname.vercel-dns.com
   ```

### 自动部署

每次推送到 GitHub 的 `main` 分支时，Vercel 会自动重新部署：

```bash
git push origin main
# Vercel 会自动检测并部署
```

### 预览部署

对于 Pull Request，Vercel 会创建预览部署：
- 每个 PR 有独立的预览 URL
- 可用于测试和审查

---

## 📊 项目信息

| 项目 | 信息 |
|------|------|
| GitHub | https://github.com/hedengyao/onchain-casino |
| 技术栈 | Next.js 14 + React 18 + TypeScript |
| 样式 | Tailwind CSS + Framer Motion |
| 部署 | Vercel |
| 状态 | ✅ 已推送，等待部署 |

---

## ⚠️ 常见问题

### Q1: 部署失败怎么办？

**查看日志**：
1. 在 Vercel 项目页面点击 **Deployments**
2. 点击失败的部署
3. 查看 **Build Logs** 找到错误

**常见错误**：
- `Module not found`: 检查 `package.json` 依赖
- `Build failed`: 查看具体错误信息

### Q2: 页面显示空白？

**解决方案**：
1. 打开浏览器控制台（F12）
2. 查看是否有 JavaScript 错误
3. 检查网络请求是否成功

### Q3: OKX API 无法调用？

**原因**：未配置环境变量

**解决方案**：
1. 在 Vercel 项目设置中添加环境变量
2. 重新部署（点击 **Redeploy**）

---

## 🎯 下一步

部署完成后：

1. **分享你的应用** - 将 URL 分享给朋友或团队
2. **准备演示** - 为黑客松比赛准备演示视频
3. **继续开发** - 添加更多功能（Phase 2-4）

---

## 📞 需要帮助？

- [README.md](./README.md) - 项目说明
- [完成报告.md](./完成报告.md) - 修复详情
- [部署指南.md](./部署指南.md) - 详细部署步骤

---

**🎉 恭喜！你的 OnChain Casino 即将上线！**

**Built with ❤️ using OKX OnchainOS Skills**
