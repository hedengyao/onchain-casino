'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sword, 
  DollarSign, 
  Clock, 
  Trophy, 
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Search
} from 'lucide-react';

// 对赌数据
interface Bet {
  id: string;
  challenger: string;
  opponent: string | null;
  question: string;
  stake: number;
  endTime: number;
  status: 'open' | 'accepted' | 'resolved';
  result?: 'win' | 'lose' | 'draw';
  participants: number;
}

// 模拟数据
const mockBets: Bet[] = [
  {
    id: '1',
    challenger: '@crypto_king',
    opponent: null,
    question: 'BONK 24 小时内涨幅会超过 50% 吗？',
    stake: 200,
    endTime: Date.now() + 24 * 60 * 60 * 1000,
    status: 'open',
    participants: 1,
  },
  {
    id: '2',
    challenger: '@moon_hunter',
    opponent: '@degod_888',
    question: 'SOL 本周会突破$200 吗？',
    stake: 500,
    endTime: Date.now() + 5 * 24 * 60 * 60 * 1000,
    status: 'accepted',
    participants: 2,
  },
  {
    id: '3',
    challenger: '@you',
    opponent: '@trader_pro',
    question: 'BTC 明天会涨还是跌？',
    stake: 100,
    endTime: Date.now() + 12 * 60 * 60 * 1000,
    status: 'resolved',
    result: 'win',
    participants: 2,
  },
];

// 对赌卡片组件
function BetCard({ bet }: { bet: Bet }) {
  const [accepted, setAccepted] = useState(false);

  const statusColors = {
    open: 'bg-green-500/20 text-green-400',
    accepted: 'bg-blue-500/20 text-blue-400',
    resolved: 'bg-purple-500/20 text-purple-400',
  };

  const statusText = {
    open: '🟢 开放中',
    accepted: '🔵 进行中',
    resolved: '🟣 已结束',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
    >
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-135 from-purple-500 to-pink-500 flex items-center justify-center">
            <Sword className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm text-gray-400">挑战者</div>
            <div className="font-bold text-white">{bet.challenger}</div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[bet.status]}`}>
          {statusText[bet.status]}
        </div>
      </div>

      {/* 问题 */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="text-sm text-gray-400 mb-2">📜 赌约内容</div>
        <div className="text-lg font-bold text-white">{bet.question}</div>
      </div>

      {/* 信息 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="text-xs text-gray-400 mb-1">下注金额</div>
          <div className="text-xl font-bold text-green-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {bet.stake}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">参与者</div>
          <div className="text-xl font-bold text-white flex items-center gap-1">
            <Users className="w-4 h-4" />
            {bet.participants}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">剩余时间</div>
          <div className="text-xl font-bold text-purple-400 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            24h
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      {bet.status === 'open' && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAccepted(true)}
          disabled={accepted}
          className={`w-full py-4 rounded-xl font-bold text-lg ${
            accepted
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'neon-button bg-gradient-135 from-purple-500 to-pink-500 text-white'
          }`}
        >
          {accepted ? '✅ 已接受' : '⚔️ 接受挑战'}
        </motion.button>
      )}

      {bet.status === 'accepted' && (
        <div className="w-full py-4 bg-gray-700 text-gray-400 rounded-xl font-bold text-center">
          🔒 对赌进行中
        </div>
      )}

      {bet.status === 'resolved' && bet.result === 'win' && (
        <div className="w-full py-4 bg-green-500/20 border border-green-500/50 rounded-xl font-bold text-center text-green-400">
          🏆 你赢了！+${bet.stake * 2}
        </div>
      )}

      {bet.status === 'resolved' && bet.result !== 'win' && (
        <div className="w-full py-4 bg-red-500/20 border border-red-500/50 rounded-xl font-bold text-center text-red-400">
          ❌ 你输了
        </div>
      )}
    </motion.div>
  );
}

// 对赌协议页面
export default function BetPage() {
  const [bets] = useState<Bet[]>(mockBets);
  const [filter, setFilter] = useState<'all' | 'open' | 'accepted' | 'resolved'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredBets = filter === 'all' 
    ? bets 
    : bets.filter(bet => bet.status === filter);

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
            ⚔️ 对赌协议
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            1v1 或多人对赌，自定义赌约内容。智能合约自动结算
          </p>
        </motion.div>

        {/* 筛选器 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { key: 'all', label: '全部', icon: Search },
            { key: 'open', label: '开放中', icon: CheckCircle },
            { key: 'accepted', label: '进行中', icon: Clock },
            { key: 'resolved', label: '已结束', icon: Trophy },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as any)}
              className={`px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all ${
                filter === item.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* 对赌列表 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredBets.map(bet => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>

        {/* 空状态 */}
        {filteredBets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔜</div>
            <h3 className="text-2xl font-bold text-white mb-2">暂无对赌</h3>
            <p className="text-gray-400">创建你的第一个对赌挑战吧！</p>
          </div>
        )}

        {/* 创建对赌按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 right-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="neon-button px-6 py-4 bg-gradient-135 from-purple-500 to-pink-500 rounded-xl font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            创建挑战
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
