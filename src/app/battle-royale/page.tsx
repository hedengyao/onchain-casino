'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  DollarSign,
  Crown,
  Medal,
  Award
} from 'lucide-react';

// 大逃杀数据类型
interface BattleRoyale {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  prizeDistribution: number[]; // [50%, 30%, 20%]
  participants: number;
  maxParticipants: number;
  startTime: number;
  endTime: number;
  status: 'registration' | 'active' | 'ended';
  topTraders: TopTrader[];
}

interface TopTrader {
  rank: number;
  address: string;
  pnl: number;
  avatar?: string;
}

// 模拟数据
const mockBattles: BattleRoyale[] = [
  {
    id: '1',
    name: '第 42 届交易大逃杀',
    entryFee: 100,
    prizePool: 8000,
    prizeDistribution: [50, 30, 20],
    participants: 87,
    maxParticipants: 100,
    startTime: Date.now() - 10 * 60 * 60 * 1000,
    endTime: Date.now() + 14 * 60 * 60 * 1000,
    status: 'active',
    topTraders: [
      { rank: 1, address: '0x1234...5678', pnl: 245 },
      { rank: 2, address: '0xabcd...efgh', pnl: 189 },
      { rank: 3, address: '0x9876...5432', pnl: 156 },
      { rank: 4, address: '0xYOU...HERE', pnl: 42 },
      { rank: 5, address: '0xqwerty...uiop', pnl: 38 },
    ],
  },
];

// 排行榜组件
function Leaderboard({ traders, isUser }: { traders: TopTrader[]; isUser?: boolean }) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="w-5 h-5 text-center text-gray-400">{rank}</span>;
  };

  return (
    <div className="space-y-2">
      {traders.map((trader, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`
            leaderboard-item
            ${trader.rank === 1 ? 'top-1' : ''}
            ${trader.rank === 2 ? 'top-2' : ''}
            ${trader.rank === 3 ? 'top-3' : ''}
            ${trader.address.includes('YOU') ? 'bg-purple-500/20 border-l-4 border-purple-500' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            {getRankIcon(trader.rank)}
            <span className={`font-mono ${
              trader.address.includes('YOU') ? 'text-purple-400 font-bold' : 'text-gray-300'
            }`}>
              {trader.address}
            </span>
          </div>
          <div className={`font-bold ${
            trader.pnl > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {trader.pnl > 0 ? '+' : ''}{trader.pnl}%
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// 倒计时组件
function BattleCountdown({ endTime }: { endTime: number }) {
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

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="text-center">
      <div className="text-sm text-gray-400 mb-1">剩余时间</div>
      <div className="text-4xl font-bold font-mono gradient-text">
        {timeLeft}
      </div>
    </div>
  );
}

// 大逃杀卡片组件
function BattleCard({ battle }: { battle: BattleRoyale }) {
  const [isJoined, setIsJoined] = useState(false);

  const progress = (battle.participants / battle.maxParticipants) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-3xl border border-purple-500/30"
    >
      {/* 头部 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">{battle.name}</h2>
        </div>
        
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>入场费：${battle.entryFee}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>{battle.participants}/{battle.maxParticipants} 人</span>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">报名进度</span>
          <span className="text-purple-400 font-bold">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-90 from-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* 倒计时 */}
      {battle.status === 'active' && (
        <div className="mb-8">
          <BattleCountdown endTime={battle.endTime} />
        </div>
      )}

      {/* 奖金分配 */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4 text-center">🏆 奖金分配</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mb-1">🥇</div>
            <div className="text-2xl font-bold text-white">
              ${(battle.prizePool * battle.prizeDistribution[0] / 100).toFixed(0)}
            </div>
            <div className="text-sm text-gray-400">{battle.prizeDistribution[0]}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-2xl mb-1">🥈</div>
            <div className="text-2xl font-bold text-white">
              ${(battle.prizePool * battle.prizeDistribution[1] / 100).toFixed(0)}
            </div>
            <div className="text-sm text-gray-400">{battle.prizeDistribution[1]}%</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 text-2xl mb-1">🥉</div>
            <div className="text-2xl font-bold text-white">
              ${(battle.prizePool * battle.prizeDistribution[2] / 100).toFixed(0)}
            </div>
            <div className="text-sm text-gray-400">{battle.prizeDistribution[2]}%</div>
          </div>
        </div>
      </div>

      {/* 实时排行榜 */}
      {battle.status === 'active' && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            实时排行榜
          </h3>
          <Leaderboard traders={battle.topTraders} />
        </div>
      )}

      {/* 操作按钮 */}
      {battle.status === 'registration' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsJoined(true)}
          disabled={isJoined}
          className={`w-full py-4 rounded-xl font-bold text-lg ${
            isJoined
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'neon-button bg-gradient-135 from-purple-500 to-pink-500 text-white'
          }`}
        >
          {isJoined ? '✅ 已报名' : `🎫 支付 $${battle.entryFee} 参赛`}
        </motion.button>
      )}

      {battle.status === 'active' && !isJoined && (
        <div className="text-center text-gray-400">
          ⚠️ 比赛进行中，无法加入
        </div>
      )}

      {battle.status === 'ended' && (
        <div className="text-center text-gray-400">
          ✅ 比赛已结束
        </div>
      )}
    </motion.div>
  );
}

// 大逃杀页面
export default function BattleRoyalePage() {
  const [battles, setBattles] = useState<BattleRoyale[]>(mockBattles);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            🏆 交易大逃杀
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            100 人参赛，24h 后收益最高者赢。实时排名，紧张刺激。
          </p>
        </motion.div>

        {/* 规则说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-4">📜 玩法规则</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              入场费：$100 USDT
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              比赛时长：24 小时
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              奖金池：总入场费的 80%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              分配比例：第 1 名 50% / 第 2 名 30% / 第 3 名 20%
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              实时排名：根据 PnL 百分比排序
            </li>
          </ul>
        </motion.div>

        {/* 大逃杀列表 */}
        <div className="space-y-8">
          {battles.map(battle => (
            <BattleCard key={battle.id} battle={battle} />
          ))}
        </div>

        {/* 空状态 */}
        {battles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔜</div>
            <h3 className="text-2xl font-bold text-white mb-2">下一届即将开始</h3>
            <p className="text-gray-400">敬请期待</p>
          </div>
        )}
      </div>
    </div>
  );
}
