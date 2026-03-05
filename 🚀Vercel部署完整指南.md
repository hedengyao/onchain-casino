# 🚀 Vercel 部署完整指南

> **超详细步骤 + 注意事项 + 常见问题**
> 
> 预计时间：5-10 分钟

---

## 📋 部署前检查清单

### ✅ 必须完成

- [ ] GitHub 仓库已创建：https://github.com/hedengyao/onchain-casino
- [ ] 代码已推送（3 个 commit）
- [ ] 有 Vercel 账号（可用 GitHub 登录）

### ⚠️ 可选准备

- [ ] OKX API 密钥（没有的话用内置测试密钥）
- [ ] 自定义域名（没有的话用 vercel.app 免费域名）

---

## 📦 第一步：登录 Vercel（1 分钟）

### 1.1 访问 Vercel

打开浏览器，访问：**https://vercel.com**

### 1.2 选择登录方式

点击 **"Continue with GitHub"**（推荐）

> ⚠️ **注意**：一定要用 GitHub 登录，这样 Vercel 才能访问你的仓库

### 1.3 授权 Vercel

会出现 GitHub 授权页面：
- 点击 **"Authorize Vercel"**
- 允许访问所有仓库（或只选择 `onchain-casino`）

### 1.4 登录成功

登录后会看到 Vercel Dashboard：
- 显示 "No projects found"（第一次）
- 右上角是你的 GitHub 头像

---

## 📦 第二步：导入项目（2 分钟）

### 2.1 创建新项目

在 Dashboard 页面：
1. 点击 **"Add New..."** 按钮
2. 选择 **"Project"**

### 2.2 选择 Git 仓库

会出现 "Import Git Repository" 页面：

**左侧列表**：显示你的 GitHub 仓库
- 找到 **`hedengyao/onchain-casino`**
- 如果没有看到，点击 "Adjust GitHub App Permissions" 重新授权

**右侧配置**：
- 点击 `onchain-casino` 旁边的 **"Import"** 按钮

### 2.3 等待导入

Vercel 会自动：
- ✅ 克隆你的仓库
- ✅ 检测项目类型（Next.js）
- ✅ 配置构建设置

---

## 📦 第三步：配置项目（2 分钟）

### 3.1 项目配置页面

导入后进入 "Configure Project" 页面

#### 📌 基础配置（保持默认）

```
Project Name: onchain-casino
Framework Preset: Next.js ✅（自动检测）
Root Directory: ./ ✅
Build Command: npm run build ✅（默认）
Output Directory: .next ✅（默认）
Install Command: npm install ✅（默认）
```

> ⚠️ **注意**：这些默认设置都是正确的，**不要修改**！

#### 📌 构建和输出设置

点击 "Build and Output Settings"：

```
Development Command: npm run dev ✅
Node Version: 18.x ✅
```

#### 📌 环境变量（重点！）

点击 **"Environment Variables"**

**选项 A：不填（推荐，用测试密钥）**
- 直接跳过，不添加任何变量
- 项目会使用代码中内置的测试密钥
- ✅ 适合演示和比赛

**选项 B：填写自己的 OKX API 密钥**
```
Variable Name: OKX_API_KEY
Value: 你的 API_KEY
Environment: ✅ Production ✅ Preview
---
Variable Name: OKX_SECRET_KEY
Value: 你的 SECRET_KEY
Environment: ✅ Production ✅ Preview
---
Variable Name: OKX_PASSPHRASE
Value: 你的 PASSPHRASE
Environment: ✅ Production ✅ Preview
```

> ⚠️ **重要提示**：
> - 如果没有 OKX API 密钥，**直接跳过这一步**
> - 内置测试密钥足够演示使用
> - 后续可以随时添加环境变量

### 3.2 确认配置

检查所有设置：
- ✅ Framework: Next.js
- ✅ Build Command: npm run build
- ✅ Output Directory: .next
- ✅ 环境变量（可选）

---

## 📦 第四步：开始部署（3 分钟）

### 4.1 点击 Deploy

点击页面底部的 **"Deploy"** 按钮

### 4.2 等待构建

进入 "Building" 页面，你会看到实时日志：

```
🔍 Inspecting source code...
📦 Installing dependencies...
🔨 Running build command...
⚡ Optimizing production build...
📤 Deploying output...
```

**预计时间**：2-5 分钟

**正常日志**：
```
> onchain-casino@1.0.0 build
> next build

Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of TypeScript
 ✓ Collecting page files
 ✓ Building pages statically
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.23 kB        85.2 kB
├ ○ /_not-found                          0.98 kB        80.1 kB
├ ○ /battle-royale                       12.5 kB        92.3 kB
└ ○ /prediction                          15.8 kB        95.6 kB
+ First Load JS shared by all            79.2 kB
```

### 4.3 部署成功

看到 🎉 图标表示成功！

```
🎉 Deployment completed successfully!

Inspection Summary
No issues found

🔗 Preview: https://onchain-casino-xxx.vercel.app
🌐 Production: https://onchain-casino.vercel.app
```

---

## 📦 第五步：访问和测试（2 分钟）

### 5.1 访问你的应用

点击 **"Visit"** 或访问链接：
- **生产环境**: `https://onchain-casino.vercel.app`
- **预览环境**: `https://onchain-casino-xxx.vercel.app`

### 5.2 测试清单

打开应用后，按顺序测试：

#### ✅ 首页测试
- [ ] 页面正常加载
- [ ] 霓虹灯动画效果流畅
- [ ] 统计数据正常显示
- [ ] 导航栏正常
- [ ] 移动端响应式正常

#### ✅ 预测市场页面测试
- [ ] 访问 `/prediction` 页面
- [ ] 市场卡片正常显示
- [ ] 倒计时正常
- [ ] 下注按钮可点击
- [ ] 进度条动画流畅

#### ✅ 交易大逃杀页面测试
- [ ] 访问 `/battle-royale` 页面
- [ ] 排行榜正常显示
- [ ] 倒计时正常
- [ ] 奖金分配显示正确

#### ✅ 功能测试
- [ ] 钱包连接按钮（暂时无法连接，UI 正常即可）
- [ ] 页面切换流畅
- [ ] 无控制台错误（F12 查看）

---

## ⚠️ 注意事项（必读！）

### 🔴 常见错误及解决方案

#### 错误 1: Build failed

**错误信息**：
```
Error: Build failed
Exit code: 1
```

**原因**：
- TypeScript 编译错误
- 依赖缺失
- 配置文件错误

**解决方案**：
1. 点击 "View Build Logs" 查看详细错误
2. 本地测试构建：`npm run build`
3. 修复错误后重新推送：`git push`
4. Vercel 会自动重新部署

#### 错误 2: Module not found

**错误信息**：
```
Module not found: Can't resolve 'framer-motion'
```

**原因**：
- package.json 缺少依赖

**解决方案**：
```bash
# 本地安装缺失的依赖
npm install framer-motion
git add package.json
git commit -m "fix: add missing dependency"
git push
```

#### 错误 3: API 调用失败

**错误信息**（浏览器控制台）：
```
Error: API 错误：401 Unauthorized
```

**原因**：
- OKX API 密钥无效
- 环境变量未配置

**解决方案**：
1. 使用内置测试密钥（代码中已有）
2. 或申请自己的 API 密钥
3. 在 Vercel 添加环境变量
4. 重新部署

#### 错误 4: 页面显示空白

**原因**：
- JavaScript 错误
- CSS 未加载
- 路由配置错误

**解决方案**：
1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 检查 `next.config.js` 配置
4. 检查文件路径大小写

---

### 🟡 性能优化建议

#### 1. 启用缓存

在 `vercel.json` 添加：
```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### 2. 图片优化

使用 Next.js Image 组件：
```tsx
import Image from 'next/image';
<Image src="/logo.png" width={200} height={200} alt="Logo" priority />
```

#### 3. 代码分割

动态导入大组件：
```tsx
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

---

### 🟢 部署后维护

#### 1. 自动部署

每次 `git push` 后：
- Vercel 自动检测变化
- 自动构建部署
- 生成预览链接

#### 2. 查看部署历史

Vercel Dashboard → 项目 → Deployments
- 查看所有部署记录
- 可以回滚到任意版本

#### 3. 添加自定义域名

1. Settings → Domains
2. 添加域名：`onchain.casino`
3. 配置 DNS（CNAME 到 `cname.vercel-dns.com`）

#### 4. 监控和分析

1. Settings → Analytics
2. 启用 Vercel Analytics（免费）
3. 查看访问量、性能等数据

---

## 🎯 部署后检查清单

### ✅ 功能检查

- [ ] 首页正常显示
- [ ] 预测市场页面正常
- [ ] 大逃杀页面正常
- [ ] 导航栏正常工作
- [ ] 移动端适配正常
- [ ] 动画效果流畅
- [ ] 无控制台错误

### ✅ 性能检查

- [ ] 首屏加载 < 3 秒
- [ ] 页面切换流畅
- [ ] 图片加载正常
- [ ] 无内存泄漏

### ✅ SEO 检查

- [ ] 页面标题正确
- [ ] Meta 描述正确
- [ ] Open Graph 标签正常
- [ ] 可被搜索引擎索引

---

## 📞 遇到问题？

### 获取帮助的方式

1. **查看部署日志**
   - Vercel Dashboard → 项目 → Deployments → 点击最新部署

2. **本地测试**
   ```bash
   npm install
   npm run build
   npm run start
   ```

3. **查看文档**
   - Vercel: https://vercel.com/docs
   - Next.js: https://nextjs.org/docs

4. **提交 Issue**
   - https://github.com/hedengyao/onchain-casino/issues

---

## 🎉 部署成功！

恭喜你！OnChain Casino 已经上线了！

### 下一步行动

1. **分享你的作品**
   ```
   🎰 OnChain Casino 正式上线！
   🔗 https://onchain-casino.vercel.app
   
   融合 Polymarket + eToro + Casino 的下一代 DeFi 体验
   Built with OKX OnchainOS Skills
   
   #OKX #OnchainOS #DeFi #Web3
   ```

2. **提交比赛**
   - GitHub: https://github.com/hedengyao/onchain-casino
   - Vercel: https://onchain-casino.vercel.app
   - 目标：🥇 一等奖 (3,000 USDT + Mac Mini M5)

3. **收集反馈**
   - 分享给朋友测试
   - 加入 Discord 社区
   - 收集用户反馈
   - 持续迭代优化

---

## 📊 部署时间线

| 步骤 | 预计时间 | 实际时间 |
|------|----------|----------|
| 登录 Vercel | 1 分钟 | ___ |
| 导入项目 | 2 分钟 | ___ |
| 配置项目 | 2 分钟 | ___ |
| 部署构建 | 3 分钟 | ___ |
| 测试验证 | 2 分钟 | ___ |
| **总计** | **10 分钟** | ___ |

---

**祝你部署顺利！🚀**

*最后更新：2026-03-05*
