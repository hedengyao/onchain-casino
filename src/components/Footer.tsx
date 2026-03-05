'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Language, translations, defaultLanguage } from '@/lib/i18n';

export default function Footer() {
  const [language] = useState<Language>(defaultLanguage);
  const t = translations[language];

  return (
    <footer className="border-t border-purple-500/20 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">OnChain Casino</h3>
            <p className="text-gray-400 text-sm">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/prediction" className="hover:text-purple-400">{t.nav.prediction}</Link></li>
              <li><Link href="/teams" className="hover:text-purple-400">{t.nav.teams}</Link></li>
              <li><Link href="/battle-royale" className="hover:text-purple-400">{t.nav.battleRoyale}</Link></li>
              <li><Link href="/bet" className="hover:text-purple-400">{t.nav.bet}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">{t.footer.resources}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-purple-400">{t.footer.docs}</Link></li>
              <li><Link href="/" className="hover:text-purple-400">{t.footer.faq}</Link></li>
              <li><Link href="/" className="hover:text-purple-400">{t.footer.blog}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4">{t.footer.social}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400">Twitter</a></li>
              <li><a href="#" className="hover:text-purple-400">Discord</a></li>
              <li><a href="#" className="hover:text-purple-400">Telegram</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-purple-500/20 text-center text-sm text-gray-500">
          <p>{t.footer.copyright}</p>
          <p className="mt-2">{t.footer.riskWarning}</p>
        </div>
      </div>
    </footer>
  );
}
