# 🚀 Vercel 一键部署说明

> 3 分钟完成部署，你的应用就上线了！

---

## ✅ GitHub 已推送成功！

仓库地址：https://github.com/hedengyao/onchain-casino

---

## 📦 方法一：Vercel 网页部署（最简单，推荐！）

### 第 1 步：访问 Vercel（30 秒）

1. 打开 https://vercel.com
2. 点击 **"Continue with GitHub"**
3. 授权 Vercel 访问你的 GitHub

### 第 2 步：导入项目（1 分钟）

1. 点击 **"Add New Project"**
2. 选择 **"Import Git Repository"**
3. 找到 **`hedengyao/onchain-casino`**
4. 点击 **"Import"**

### 第 3 步：配置项目（30 秒）

**保持默认设置即可**：

- Framework Preset: **Next.js** ✅（自动检测）
- Root Directory: `./` ✅
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

**添加环境变量**（点击 "Environment Variables"）：

```
OKX_API_KEY=你的 OKX_API_KEY
OKX_SECRET_KEY=你的 OKX_SECRET_KEY
OKX_PASSPHRASE=你的 OKX_PASSPHRASE
```

> ⚠️ 如果没有 OKX API 密钥，可以先跳过，使用内置的测试密钥

### 第 4 步：部署（2 分钟）

1. 点击 **"Deploy"**
2. 等待 2-3 分钟
3. 看到 🎉 表示成功！

### 第 5 步：访问应用

部署成功后，你会得到：
- **生产链接**: `https://onchain-casino.vercel.app`
- **预览链接**: `https://onchain-casino-xxx.vercel.app`

---

## 📦 方法二：Vercel CLI 部署（适合开发者）

### 安装 Vercel CLI

```bash
npm install -g vercel
```

### 登录 Vercel

```bash
vercel login
```

选择 **GitHub** 登录方式

### 部署

```bash
cd /home/diaomao/.openclaw/workspace/onchain-casino
vercel --prod
```

按提示操作即可！

---

## ⚙️ 配置自定义域名（可选）

如果你想用自己的域名：

1. Vercel Dashboard → 选择项目
2. Settings → Domains
3. 添加域名：`onchain.casino` 或 `casino.yourdomain.com`
4. 按提示配置 DNS

**DNS 配置**：
```
类型：CNAME
名称：@ 或 www
值：cname.vercel-dns.com
TTL: 自动
```

---

## 📊 部署后检查清单

- [ ] 首页正常加载
- [ ] 预测市场页面可访问
- [ ] 大逃杀页面可访问
- [ ] 移动端显示正常
- [ ] 动画效果流畅

---

## 🎯 下一步

### 1. 分享你的作品

```
🎰 OnChain Casino - 社交交易赌场
🔗 https://onchain-casino.vercel.app

融合 Polymarket + eToro + Casino 的下一代 DeFi 体验
- 预测市场
- 交易大逃杀
- 组队打新
- 对赌协议
- 带单分润
- 成就系统

Built with OKX OnchainOS Skills
```

### 2. 提交比赛

- 比赛：OKX OnchainOS Skills 黑客松
- 目标：🥇 一等奖 (3,000 USDT + Mac Mini M5)
- 提交链接：https://github.com/hedengyao/onchain-casino

### 3. 收集反馈

- 分享给朋友测试
- 加入 Discord 社区
- 收集用户反馈
- 持续迭代优化

---

## 🐛 常见问题

### Q: 部署失败怎么办？

**A**: 检查 Vercel 部署日志
```
Vercel Dashboard → 项目 → Deployments → 点击最新部署 → 查看日志
```

### Q: 页面显示空白？

**A**: 可能是构建错误，检查：
1. `package.json` 依赖是否正确
2. TypeScript 是否有错误
3. 查看浏览器控制台错误

### Q: API 调用失败？

**A**: 配置环境变量
1. Vercel Dashboard → Settings → Environment Variables
2. 添加 OKX API 密钥
3. 重新部署

---

## 📞 需要帮助？

- **Vercel 文档**: https://vercel.com/docs
- **项目 Issues**: https://github.com/hedengyao/onchain-casino/issues
- **OKX API 文档**: https://web3.okx.com/onchain-os/dev-docs

---

**🎉 祝你部署成功！**

---

*最后更新：2026-03-05*
