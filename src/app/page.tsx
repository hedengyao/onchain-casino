'use client';

import { motion } from 'framer-motion';
import { 
  Dice6, 
  TrendingUp, 
  Users, 
  Trophy, 
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

// 英雄区域组件
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景动画 */}
      <div className="absolute inset-0 animated-bg" />
      
      {/* 粒子效果 */}
      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Dice6 className="w-12 h-12 text-purple-500" />
            <h1 className="text-6xl md:text-8xl font-bold gradient-text">
              OnChain Casino
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            炒币 + 预测 + 社交 + 博弈 = <span className="text-purple-400 font-bold">下一代 DeFi 体验</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/prediction"
                className="neon-button px-8 py-4 bg-purple-600 rounded-xl font-bold text-lg flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                开始预测
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/battle-royale"
                className="px-8 py-4 bg-transparent border-2 border-purple-500 rounded-xl font-bold text-lg hover:bg-purple-500/20 transition-all"
              >
                🏆 交易大逃杀
              </Link>
            </motion.div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: '总交易量', value: '$2.4M', icon: TrendingUp },
              { label: '活跃用户', value: '12,847', icon: Users },
              { label: '预测市场', value: '156', icon: Dice6 },
              { label: '奖金池', value: '$450K', icon: Trophy },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="glass-card p-4 rounded-xl"
              >
                <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-gray-400 text-sm">向下滚动了解更多</div>
      </motion.div>
    </section>
  );
}

// 功能卡片组件
function FeatureCard({ icon: Icon, title, description, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
    >
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${color}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// 功能展示区域
function FeaturesSection() {
  const features = [
    {
      icon: Dice6,
      title: '预测市场',
      description: '对代币价格走向进行二元预测，动态赔率，全额赔付。像 Polymarket 一样简单，但更刺激。',
      color: 'bg-gradient-135 from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: '组队打新',
      description: '5 人组队，共同决策买哪个新币。风险共担，盈利共享，不再一个人战斗。',
      color: 'bg-gradient-135 from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: '对赌协议',
      description: '1v1 或多人对赌，自定义赌约内容。智能合约自动结算，公平透明。',
      color: 'bg-gradient-135 from-orange-500 to-red-500',
    },
    {
      icon: Trophy,
      title: '交易大逃杀',
      description: '100 人参赛，24h 后收益最高者赢。实时排名，紧张刺激，奖金池高达 80% 返奖。',
      color: 'bg-gradient-135 from-yellow-500 to-orange-500',
    },
    {
      icon: Sparkles,
      title: '带单分润',
      description: '创建跟投池，别人跟投你赚分润。透明化持仓，自动分润，建立你的交易帝国。',
      color: 'bg-gradient-135 from-green-500 to-emerald-500',
    },
    {
      icon: Wallet,
      title: '成就系统',
      description: '完成特定任务获得 NFT 徽章。链上永久记录，可展示、可交易，证明你的传奇。',
      color: 'bg-gradient-135 from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            六大核心玩法
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            融合预测市场、社交交易、竞技博弈，打造前所未有的 DeFi 体验
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA 区域
function CTASection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl text-center border border-purple-500/30"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            连接钱包，立即参与预测市场、组队打新、交易大逃杀... 
            下一个传奇交易者就是你！
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-button px-10 py-5 bg-purple-600 rounded-xl font-bold text-xl"
            >
              连接钱包
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-purple-500 rounded-xl font-bold text-xl hover:bg-purple-500/20 transition-all"
            >
              查看教程
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            ⚠️ 风险提示：请仅使用你能承受损失的资金参与
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 页脚
function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">OnChain Casino</h3>
            <p className="text-gray-400 text-sm">
              下一代社交交易赌场
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">产品</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/prediction" className="hover:text-purple-400">预测市场</Link></li>
              <li><Link href="/teams" className="hover:text-purple-400">组队打新</Link></li>
              <li><Link href="/battle-royale" className="hover:text-purple-400">交易大逃杀</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">资源</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/docs" className="hover:text-purple-400">文档</Link></li>
              <li><Link href="/faq" className="hover:text-purple-400">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400">博客</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">社交</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Twitter</a></li>
              <li><a href="#" className="hover:text-purple-400">Discord</a></li>
              <li><a href="#" className="hover:text-purple-400">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-purple-500/20 text-center text-sm text-gray-500">
          <p>© 2026 OnChain Casino. Built with OKX OnchainOS Skills.</p>
          <p className="mt-2">
            ⚠️ 本平台为娱乐性质，存在资金风险。请谨慎参与。
          </p>
        </div>
      </div>
    </footer>
  );
}

// 主页面
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
