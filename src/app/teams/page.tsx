'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Vote, TrendingUp, Clock, DollarSign, Plus, Share2 } from 'lucide-react';

// 小队数据
interface Team {
  id: string;
  name: string;
  captain: string;
  captainWinRate: number;
  members: number;
  maxMembers: number;
  pool: number;
  votes: Vote[];
  timeLeft: number;
  status: 'recruiting' | 'voting' | 'active' | 'completed';
}

interface Vote {
  tokenSymbol: string;
  tokenName: string;
  votes: number;
  percentage: number;
}

// 模拟数据
const mockTeams: Team[] = [
  {
    id: '1',
    name: '🚀 打新小队 #1234',
    captain: '@crypto_king',
    captainWinRate: 72,
    members: 4,
    maxMembers: 5,
    pool: 500,
    votes: [
      { tokenSymbol: 'PEPE2', tokenName: 'Pepe 2.0', votes: 3, percentage: 60 },
      { tokenSymbol: 'DOGE3', tokenName: 'Doge 3.0', votes: 2, percentage: 40 },
    ],
    timeLeft: 1800,
    status: 'voting',
  },
  {
    id: '2',
    name: '💎 钻石手小队',
    captain: '@diamond_hands',
    captainWinRate: 85,
    members: 3,
    maxMembers: 5,
    pool: 300,
    votes: [],
    timeLeft: 3600,
    status: 'recruiting',
  },
];

// 倒计时组件
function Countdown({ seconds }: { seconds: number }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-mono">{minutes}:{secs.toString().padStart(2, '0')}</span>
    </div>
  );
}

// 小队卡片组件
function TeamCard({ team }: { team: Team }) {
  const [joined, setJoined] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
    >
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>队长：{team.captain}</span>
            <span className="text-green-400 font-bold">胜率 {team.captainWinRate}%</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          team.status === 'recruiting' ? 'bg-green-500/20 text-green-400' :
          team.status === 'voting' ? 'bg-blue-500/20 text-blue-400' :
          'bg-gray-500/20 text-gray-400'
        }`}>
          {team.status === 'recruiting' ? '🔴 招募中' :
           team.status === 'voting' ? '🔵 投票中' : '⚪ 进行中'}
        </div>
      </div>

      {/* 资金池 */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>资金池</span>
          </div>
          <span className="text-2xl font-bold text-green-400">${team.pool}</span>
        </div>
        <div className="text-sm text-gray-400">
          成员：{team.members}/{team.maxMembers} 人
        </div>
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-90 from-purple-500 to-pink-500"
            style={{ width: `${(team.members / team.maxMembers) * 100}%` }}
          />
        </div>
      </div>

      {/* 投票 */}
      {team.votes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Vote className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-gray-300">当前投票</span>
          </div>
          <div className="space-y-3">
            {team.votes.map((vote, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white font-bold">{vote.tokenSymbol}</span>
                  <span className="text-gray-400">{vote.votes}票 ({vote.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${i === 0 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${vote.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            投票截止：<Countdown seconds={team.timeLeft} />
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3">
        {team.status === 'recruiting' && (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setJoined(true)}
              disabled={joined}
              className={`flex-1 py-3 rounded-xl font-bold ${
                joined 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'neon-button bg-gradient-135 from-purple-500 to-pink-500 text-white'
              }`}
            >
              {joined ? '✅ 已加入' : '🎫 加入小队'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
            >
              <Share2 className="w-5 h-5 text-gray-400" />
            </motion.button>
          </>
        )}

        {team.status === 'voting' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 neon-button bg-gradient-135 from-blue-500 to-cyan-500 rounded-xl font-bold text-white"
          >
            🗳️ 投票
          </motion.button>
        )}

        {team.status === 'active' && (
          <div className="flex-1 py-3 bg-gray-700 text-gray-400 rounded-xl font-bold text-center">
            🔒 进行中
          </div>
        )}
      </div>
    </motion.div>
  );
}

// 组队打新页面
export default function TeamsPage() {
  const [teams] = useState<Team[]>(mockTeams);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
            👥 组队打新
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            5 人组队，共同决策买哪个新币。风险共担，盈利共享
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
              每队最多 5 人，每人投入$100
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              投票决定购买哪个代币
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              盈利按投入比例分配
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">▸</span>
              队长额外获得 10% 分润
            </li>
          </ul>
        </motion.div>

        {/* 小队列表 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        {/* 创建小队按钮 */}
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
            创建小队
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
