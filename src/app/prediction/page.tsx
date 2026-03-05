'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  DollarSign,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

// 预测市场数据类型
interface PredictionMarket {
  id: string;
  question: string;
  tokenSymbol: string;
  endTime: number;
  totalPool: number;
  participants: number;
  yesPrice: number;
  noPrice: number;
  yesPercent: number;
  noPercent: number;
  category: string;
  status: 'active' | 'resolved' | 'pending';
  result?: 'yes' | 'no';
}

// 模拟数据 (实际应从 API 获取)
const mockMarkets: PredictionMarket[] = [
  {
    id: '1',
    question: 'SOL 24 小时内会突破 $200 吗？',
    tokenSymbol: 'SOL',
    endTime: Date.now() + 18 * 60 * 60 * 1000,
    totalPool: 125000,
    participants: 2847,
    yesPrice: 0.65,
    noPrice: 0.35,
    yesPercent: 65,
    noPercent: 35,
    category: '价格预测',
    status: 'active',
  },
  {
    id: '2',
    question: 'BONK 今天涨幅会超过 50% 吗？',
    tokenSymbol: 'BONK',
    endTime: Date.now() + 12 * 60 * 60 * 1000,
    totalPool: 85000,
    participants: 1523,
    yesPrice: 0.42,
    noPrice: 0.58,
    yesPercent: 42,
    noPercent: 58,
    category: 'Meme 币',
    status: 'active',
  },
  {
    id: '3',
    question: 'BTC 本周会创历史新高吗？',
    tokenSymbol: 'BTC',
    endTime: Date.now() + 5 * 24 * 60 * 60 * 1000,
    totalPool: 450000,
    participants: 8934,
    yesPrice: 0.28,
    noPrice: 0.72,
    yesPercent: 28,
    noPercent: 72,
    category: '价格预测',
    status: 'active',
  },
  {
    id: '4',
    question: 'ETH 会在 Q2 突破 $5000 吗？',
    tokenSymbol: 'ETH',
    endTime: Date.now() + 90 * 24 * 60 * 60 * 1000,
    totalPool: 320000,
    participants: 5621,
    yesPrice: 0.45,
    noPrice: 0.55,
    yesPercent: 45,
    noPercent: 55,
    category: '价格预测',
    status: 'active',
  },
];

// 倒计时组件
function Countdown({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();
      if (difference <= 0) {
        setTimeLeft('已结束');
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-mono">{timeLeft}</span>
    </div>
  );
}

// 下注按钮组件
function BetButton({ 
  side, 
  price, 
  onBet 
}: { 
  side: 'yes' | 'no'; 
  price: number; 
  onBet: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onBet}
      className={`
        w-full py-3 rounded-lg font-bold text-white
        ${side === 'yes' 
          ? 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/50' 
          : 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/50'}
        transition-all
      `}
    >
      {side === 'yes' ? '✅ 会' : '❌ 不会'}
      <span className="block text-sm opacity-80">${price.toFixed(2)}</span>
    </motion.button>
  );
}

// 市场卡片组件
function MarketCard({ market }: { market: PredictionMarket }) {
  const [betAmount, setBetAmount] = useState(100);
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null);

  const potentialReturn = selectedSide 
    ? betAmount / (selectedSide === 'yes' ? market.yesPrice : market.noPrice)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
    >
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs text-purple-400 font-bold px-2 py-1 bg-purple-500/20 rounded-full">
            {market.category}
          </span>
          <h3 className="text-xl font-bold text-white mt-2">{market.question}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
          market.status === 'active' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {market.status === 'active' ? '🔴 进行中' : '⚪ 已结束'}
        </div>
      </div>

      {/* 价格进度条 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-400 font-bold">会 (Yes)</span>
          <span className="text-red-400 font-bold">不会 (No)</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden flex">
          <div 
            className="bg-green-500 transition-all duration-500"
            style={{ width: `${market.yesPercent}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${market.noPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{market.yesPercent}%</span>
          <span>{market.noPercent}%</span>
        </div>
      </div>

      {/* 下注区域 */}
      {market.status === 'active' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <BetButton 
              side="yes" 
              price={market.yesPrice} 
              onBet={() => setSelectedSide('yes')}
            />
            <BetButton 
              side="no" 
              price={market.noPrice} 
              onBet={() => setSelectedSide('no')}
            />
          </div>

          {selectedSide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-800/50 p-4 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">下注金额</span>
                <div className="flex gap-2">
                  {[50, 100, 500, 1000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      className={`px-3 py-1 rounded text-sm ${
                        betAmount === amount
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">潜在回报</span>
                <span className="text-2xl font-bold text-green-400">
                  ${potentialReturn.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-135 from-purple-500 to-pink-500 rounded-xl font-bold text-lg neon-button"
              >
                <Zap className="w-5 h-5 inline mr-2" />
                确认下注 ${betAmount}
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      {/* 底部信息 */}
      <div className="mt-6 pt-4 border-t border-purple-500/20 grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-400">奖池</div>
          <div className="font-bold text-white">${(market.totalPool / 1000).toFixed(1)}K</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">参与者</div>
          <div className="font-bold text-white flex items-center gap-1">
            <Users className="w-4 h-4" />
            {market.participants.toLocaleString()}
          </div>
        </div>
        <div>
          <Countdown endTime={market.endTime} />
        </div>
      </div>
    </motion.div>
  );
}

// 预测市场页面
export default function PredictionPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [markets, setMarkets] = useState<PredictionMarket[]>(mockMarkets);

  const categories = ['all', '价格预测', 'Meme 币', '事件预测'];

  const filteredMarkets = selectedCategory === 'all'
    ? markets
    : markets.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            🎯 预测市场
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            对代币价格走向进行二元预测，动态赔率，全额赔付
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>

        {/* 市场列表 */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* 空状态 */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔜</div>
            <h3 className="text-2xl font-bold text-white mb-2">暂无市场</h3>
            <p className="text-gray-400">新的预测市场即将上线</p>
          </div>
        )}

        {/* 创建市场按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 right-8"
        >
          <button className="neon-button px-6 py-4 bg-purple-600 rounded-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5" />
            创建预测
          </button>
        </motion.div>
      </div>
    </div>
  );
}
