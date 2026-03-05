'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X, ExternalLink, Copy, Check } from 'lucide-react';
import { useWallet } from '@/lib/useWallet';
import { Language, translations, defaultLanguage } from '@/lib/i18n';

interface WalletConnectProps {
  language?: Language;
}

export default function WalletConnect({ language = defaultLanguage }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const t = translations[language];
  
  const {
    isConnected,
    address,
    walletType,
    isConnecting,
    error,
    connect,
    disconnect,
    formatAddress,
  } = useWallet();

  // 复制地址到剪贴板
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // 在区块浏览器中查看
  const viewOnExplorer = () => {
    if (!address) return;
    
    if (walletType === 'metamask') {
      window.open(`https://etherscan.io/address/${address}`, '_blank');
    } else if (walletType === 'phantom') {
      window.open(`https://solscan.io/account/${address}`, '_blank');
    }
  };

  return (
    <>
      {/* 钱包连接按钮 */}
      {!isConnected ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="neon-button px-4 py-2 bg-purple-600 rounded-xl font-bold flex items-center gap-2 text-sm"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">{t.nav.connectWallet}</span>
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-purple-600/30 transition-all"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="hidden sm:inline">{formatAddress(address)}</span>
        </motion.button>
      )}

      {/* 钱包模态框 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 模态框内容 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-card rounded-2xl border border-purple-500/30 p-6 w-full max-w-md">
                {/* 头部 */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {isConnected ? '钱包详情' : '连接钱包'}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* 已连接状态 */}
                {isConnected ? (
                  <div className="space-y-4">
                    {/* 钱包信息 */}
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
                      
                      {/* 地址 */}
                      <div className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between">
                        <code className="text-purple-400 text-sm">{formatAddress(address)}</code>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={copyAddress}
                            className="p-1 hover:bg-gray-800 rounded transition-colors"
                            title="复制地址"
                          >
                            {showCopied ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={viewOnExplorer}
                            className="p-1 hover:bg-gray-800 rounded transition-colors"
                            title="在浏览器中查看"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 断开连接按钮 */}
                    <button
                      onClick={disconnect}
                      className="w-full py-3 bg-red-600/20 border border-red-500/30 rounded-xl font-bold text-red-400 hover:bg-red-600/30 transition-all"
                    >
                      断开连接
                    </button>
                  </div>
                ) : (
                  /* 钱包选择列表 */
                  <div className="space-y-3">
                    {/* MetaMask */}
                    <button
                      onClick={() => connect('metamask')}
                      disabled={isConnecting}
                      className="w-full p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl hover:border-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                          <span className="text-2xl">🦊</span>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">MetaMask</p>
                          <p className="text-gray-400 text-sm">以太坊等 EVM 链</p>
                        </div>
                        {isConnecting && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Phantom */}
                    <button
                      onClick={() => connect('phantom')}
                      disabled={isConnecting}
                      className="w-full p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                          <span className="text-2xl">👻</span>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">Phantom</p>
                          <p className="text-gray-400 text-sm">Solana 链</p>
                        </div>
                        {isConnecting && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </button>

                    {/* 错误提示 */}
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
