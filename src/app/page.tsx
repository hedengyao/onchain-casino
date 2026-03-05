'use client';

import { motion } from 'framer-motion';
import { Dice6, TrendingUp, Users, Trophy, Sparkles, ArrowRight, Zap, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, translations, defaultLanguage } from '@/lib/i18n';

export default function Home() {
  const [language] = useState<Language>(defaultLanguage);
  const [isClient, setIsClient] = useState(false);
  const t = translations[language];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const features = [
    { icon: Dice6, title: t.features.prediction.title, desc: t.features.prediction.desc, color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: t.features.teams.title, desc: t.features.teams.desc, color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: t.features.bet.title, desc: t.features.bet.desc, color: 'from-orange-500 to-red-500' },
    { icon: Trophy, title: t.features.battle.title, desc: t.features.battle.desc, color: 'from-yellow-500 to-orange-500' },
    { icon: Sparkles, title: t.features.copytrade.title, desc: t.features.copytrade.desc, color: 'from-green-500 to-emerald-500' },
    { icon: Wallet, title: t.features.achievements.title, desc: t.features.achievements.desc, color: 'from-pink-500 to-rose-500' },
  ];

  const stats = [
    { label: t.home.totalVolume, value: '$2.4M', icon: TrendingUp },
    { label: t.home.activeUsers, value: '12,847', icon: Users },
    { label: t.home.predictionMarkets, value: '156', icon: Dice6 },
    { label: t.home.prizePool, value: '$450K', icon: Trophy },
  ];

  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animated-bg" />
        
        {/* 粒子效果 */}
        <div className="particle-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080) }}
              animate={{ y: [null, Math.random() * -100], opacity: [1, 0] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Dice6 className="w-12 h-12 text-purple-500" />
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">{t.home.title}</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">{t.home.subtitle}</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/prediction" className="neon-button px-8 py-4 bg-purple-600 rounded-xl font-bold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5" />{t.home.startPrediction}<ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/battle-royale" className="px-8 py-4 bg-transparent border-2 border-purple-500 rounded-xl font-bold text-lg hover:bg-purple-500/20">
                🏆 {t.nav.battleRoyale}
              </Link>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.5 }} className="glass-card p-4 rounded-xl">
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="text-gray-400 text-sm">{t.home.scrollDown}</div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{t.features.title}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="glass-card p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-135 ${feature.color}`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-12 rounded-3xl text-center border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.cta.title}</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="/prediction" className="neon-button px-10 py-5 bg-purple-600 rounded-xl font-bold text-xl">
                {t.cta.connectWallet}
              </a>
              <Link href="/" className="px-10 py-5 bg-transparent border-2 border-purple-500 rounded-xl font-bold text-xl hover:bg-purple-500/20">
                {t.cta.viewTutorial}
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">{t.cta.riskWarning}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
