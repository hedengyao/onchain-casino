'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Wallet, X, ExternalLink, Copy, Check } from 'lucide-react';
import { Language, translations, defaultLanguage, languageNames, languageFlags } from '@/lib/i18n';
import { useWallet } from '@/lib/useWallet';

export default function Navbar() {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const t = translations[language];

  const {
    isConnected,
    address,
    walletType,
    isConnecting,
    connect,
    disconnect,
  } = useWallet();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-135 from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-2xl">🎲</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">OnChain Casino</span>
          </a>

          {/* 导航链接 */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors">{t.nav.home}</a>
            <a href="/prediction" className="text-gray-300 hover:text-purple-400 transition-colors">{t.nav.prediction}</a>
            <a href="/battle-royale" className="text-gray-300 hover:text-purple-400 transition-colors">{t.nav.battleRoyale}</a>
            <a href="/teams" className="text-gray-300 hover:text-purple-400 transition-colors">{t.nav.teams}</a>
            <a href="/bet" className="text-gray-300 hover:text-purple-400 transition-colors">{t.nav.bet}</a>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center gap-3">
            {/* 语言切换 */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-purple-500/20 transition-all"
              >
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white hidden sm:inline">
                  {languageFlags[language]} {languageNames[language]}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 glass-card rounded-xl border border-purple-500/30 overflow-hidden z-50"
                    >
                      {(['zh', 'en', 'ja', 'ko'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                            language === lang ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <span className="text-xl">{languageFlags[lang]}</span>
                          <span className="font-medium">{languageNames[lang]}</span>
                          {language === lang && <span className="ml-auto">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 钱包连接 */}
            <button
              onClick={() => setIsWalletOpen(true)}
              className="neon-button px-4 py-2 bg-purple-600 rounded-xl font-bold flex items-center gap-2 text-sm"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">{isConnected ? formatAddress(address) : t.nav.connectWallet}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 钱包模态框 */}
      <AnimatePresence>
        {isWalletOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsWalletOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-card rounded-2xl border border-purple-500/30 p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">{isConnected ? '钱包详情' : '连接钱包'}</h3>
                  <button onClick={() => setIsWalletOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {isConnected ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold">{walletType === 'metamask' ? 'MetaMask' : 'Phantom'}</p>
                          <p className="text-gray-400 text-sm">已连接</p>
                        </div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between">
                        <code className="text-purple-400 text-sm">{formatAddress(address)}</code>
                        <div className="flex items-center gap-2">
                          <button onClick={copyAddress} className="p-1 hover:bg-gray-800 rounded">
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                          <button onClick={() => window.open('https://etherscan.io/address/' + address, '_blank')} className="p-1 hover:bg-gray-800 rounded">
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={disconnect} className="w-full py-3 bg-red-600/20 border border-red-500/30 rounded-xl font-bold text-red-400 hover:bg-red-600/30">
                      断开连接
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button onClick={() => connect('metamask')} disabled={isConnecting} className="w-full p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl hover:border-orange-500/50 disabled:opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center"><span className="text-2xl">🦊</span></div>
                        <div className="text-left">
                          <p className="text-white font-bold">MetaMask</p>
                          <p className="text-gray-400 text-sm">以太坊等 EVM 链</p>
                        </div>
                      </div>
                    </button>
                    <button onClick={() => connect('phantom')} disabled={isConnecting} className="w-full p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 disabled:opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center"><span className="text-2xl">👻</span></div>
                        <div className="text-left">
                          <p className="text-white font-bold">Phantom</p>
                          <p className="text-gray-400 text-sm">Solana 链</p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
