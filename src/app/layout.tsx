'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Language, translations, defaultLanguage } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "OnChain Casino - 社交交易赌场",
  description: "炒币 + 预测 + 社交 + 博弈 = 下一代 DeFi 体验",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const t = translations[language];

  return (
    <html lang={language}>
      <body className={inter.className}>
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-135 from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-2xl">🎲</span>
                </div>
                <span className="text-xl font-bold gradient-text hidden sm:block">OnChain Casino</span>
              </div>

              {/* 导航链接 */}
              <div className="hidden md:flex items-center gap-6">
                <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  {t.nav.home}
                </a>
                <a href="/prediction" className="text-gray-300 hover:text-purple-400 transition-colors">
                  {t.nav.prediction}
                </a>
                <a href="/battle-royale" className="text-gray-300 hover:text-purple-400 transition-colors">
                  {t.nav.battleRoyale}
                </a>
                <a href="/teams" className="text-gray-300 hover:text-purple-400 transition-colors">
                  {t.nav.teams}
                </a>
                <a href="/bet" className="text-gray-300 hover:text-purple-400 transition-colors">
                  {t.nav.bet}
                </a>
              </div>

              {/* 右侧操作 */}
              <div className="flex items-center gap-3">
                {/* 语言切换 */}
                <LanguageSwitcher 
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
                
                {/* 钱包连接 */}
                <button className="neon-button px-4 py-2 bg-purple-600 rounded-xl font-bold flex items-center gap-2 text-sm">
                  <span>💳</span>
                  <span className="hidden sm:inline">{t.nav.connectWallet}</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 主内容 */}
        <main className="pt-20">
          {children}
        </main>

        {/* 页脚 */}
        <footer className="border-t border-purple-500/20 py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>{t.footer.copyright}</p>
            <p className="mt-2">
              {t.footer.riskWarning}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
