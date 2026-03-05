import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnChain Casino - 社交交易赌场",
  description: "炒币 + 预测 + 社交 + 博弈 = 下一代 DeFi 体验",
  keywords: ["DeFi", "预测市场", "社交交易", "OKX", "OnchainOS", "meme 币"],
  authors: [{ name: "OnChain Casino Team" }],
  openGraph: {
    title: "OnChain Casino - 社交交易赌场",
    description: "炒币 + 预测 + 社交 + 博弈 = 下一代 DeFi 体验",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
                <span className="text-xl font-bold gradient-text">OnChain Casino</span>
              </div>

              {/* 导航链接 */}
              <div className="hidden md:flex items-center gap-8">
                <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  首页
                </a>
                <a href="/prediction" className="text-gray-300 hover:text-purple-400 transition-colors">
                  预测市场
                </a>
                <a href="/battle-royale" className="text-gray-300 hover:text-purple-400 transition-colors">
                  交易大逃杀
                </a>
                <a href="/teams" className="text-gray-300 hover:text-purple-400 transition-colors">
                  组队打新
                </a>
                <a href="/leaderboard" className="text-gray-300 hover:text-purple-400 transition-colors">
                  排行榜
                </a>
              </div>

              {/* 钱包连接按钮 */}
              <button className="neon-button px-6 py-2 bg-purple-600 rounded-xl font-bold flex items-center gap-2">
                <span>💳</span>
                <span>连接钱包</span>
              </button>
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
            <p>© 2026 OnChain Casino. Built with OKX OnchainOS Skills.</p>
            <p className="mt-2">
              ⚠️ 本平台为娱乐性质，存在资金风险。请谨慎参与。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
