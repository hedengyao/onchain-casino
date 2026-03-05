'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Language, translations, defaultLanguage, languageNames, languageFlags } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSwitcher({ 
  currentLanguage, 
  onLanguageChange 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['zh', 'en', 'ja', 'ko'];

  return (
    <div className="relative">
      {/* 语言切换按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-purple-500/20 transition-all"
      >
        <Globe className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-bold text-white">
          {languageFlags[currentLanguage]} {languageNames[currentLanguage]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* 下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 glass-card rounded-xl border border-purple-500/30 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang}
                whileHover={{ x: 5, backgroundColor: 'rgba(147, 51, 234, 0.2)' }}
                onClick={() => {
                  onLanguageChange(lang);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                  currentLanguage === lang 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="text-xl">{languageFlags[lang]}</span>
                <span className="font-medium">{languageNames[lang]}</span>
                {currentLanguage === lang && (
                  <span className="ml-auto text-purple-400">✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 点击外部关闭 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
