/**
 * 多语言支持 - i18n 配置
 * 支持：中文 (zh)、英文 (en)、日文 (ja)、韩文 (ko)
 */

export type Language = 'zh' | 'en' | 'ja' | 'ko';

export const translations = {
  zh: {
    // 导航
    nav: {
      home: '首页',
      prediction: '预测市场',
      battleRoyale: '交易大逃杀',
      teams: '组队打新',
      bet: '对赌协议',
      leaderboard: '排行榜',
      connectWallet: '连接钱包',
    },
    // 首页
    home: {
      title: 'OnChain Casino',
      subtitle: '炒币 + 预测 + 社交 + 博弈 = 下一代 DeFi 体验',
      startPrediction: '开始预测',
      joinBattle: '交易大逃杀',
      totalVolume: '总交易量',
      activeUsers: '活跃用户',
      predictionMarkets: '预测市场',
      prizePool: '奖金池',
      scrollDown: '向下滚动了解更多',
    },
    // 功能卡片
    features: {
      title: '六大核心玩法',
      subtitle: '融合预测市场、社交交易、竞技博弈，打造前所未有的 DeFi 体验',
      prediction: {
        title: '预测市场',
        desc: '对代币价格走向进行二元预测，动态赔率，全额赔付。像 Polymarket 一样简单，但更刺激。',
      },
      teams: {
        title: '组队打新',
        desc: '5 人组队，共同决策买哪个新币。风险共担，盈利共享，不再一个人战斗。',
      },
      bet: {
        title: '对赌协议',
        desc: '1v1 或多人对赌，自定义赌约内容。智能合约自动结算，公平透明。',
      },
      battle: {
        title: '交易大逃杀',
        desc: '100 人参赛，24h 后收益最高者赢。实时排名，紧张刺激，奖金池高达 80% 返奖。',
      },
      copytrade: {
        title: '带单分润',
        desc: '创建跟投池，别人跟投你赚分润。透明化持仓，自动分润，建立你的交易帝国。',
      },
      achievements: {
        title: '成就系统',
        desc: '完成特定任务获得 NFT 徽章。链上永久记录，可展示、可交易，证明你的传奇。',
      },
    },
    // CTA
    cta: {
      title: '准备好开始了吗？',
      subtitle: '连接钱包，立即参与预测市场、组队打新、交易大逃杀... 下一个传奇交易者就是你！',
      connectWallet: '连接钱包',
      viewTutorial: '查看教程',
      riskWarning: '⚠️ 风险提示：请仅使用你能承受损失的资金参与',
    },
    // 页脚
    footer: {
      description: '下一代社交交易赌场',
      product: '产品',
      resources: '资源',
      social: '社交',
      docs: '文档',
      faq: 'FAQ',
      blog: '博客',
      copyright: '© 2026 OnChain Casino. Built with OKX OnchainOS Skills.',
      riskWarning: '⚠️ 本平台为娱乐性质，存在资金风险。请谨慎参与。',
    },
    // 语言切换
    language: {
      zh: '中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
    },
  },
  en: {
    nav: {
      home: 'Home',
      prediction: 'Prediction',
      battleRoyale: 'Battle Royale',
      teams: 'Teams',
      bet: 'Bet',
      leaderboard: 'Leaderboard',
      connectWallet: 'Connect Wallet',
    },
    home: {
      title: 'OnChain Casino',
      subtitle: 'Trading + Prediction + Social + Gaming = Next-Gen DeFi Experience',
      startPrediction: 'Start Prediction',
      joinBattle: 'Battle Royale',
      totalVolume: 'Total Volume',
      activeUsers: 'Active Users',
      predictionMarkets: 'Prediction Markets',
      prizePool: 'Prize Pool',
      scrollDown: 'Scroll to learn more',
    },
    features: {
      title: '6 Core Features',
      subtitle: 'Combining prediction markets, social trading, and competitive gaming for an unprecedented DeFi experience',
      prediction: {
        title: 'Prediction Market',
        desc: 'Binary predictions on token prices with dynamic odds and full payout. Like Polymarket, but more exciting.',
      },
      teams: {
        title: 'Team Trading',
        desc: '5-person teams decide together which new tokens to buy. Share risks and rewards.',
      },
      bet: {
        title: 'Betting Protocol',
        desc: '1v1 or multi-player bets with custom terms. Smart contract settlement, fair and transparent.',
      },
      battle: {
        title: 'Battle Royale',
        desc: '100 players, 24h competition. Top trader wins. Real-time ranking, up to 80% prize pool.',
      },
      copytrade: {
        title: 'Copy Trading',
        desc: 'Create a pool, earn from followers. Transparent positions, automatic profit sharing.',
      },
      achievements: {
        title: 'Achievements',
        desc: 'Earn NFT badges by completing tasks. On-chain records, tradable, prove your legacy.',
      },
    },
    cta: {
      title: 'Ready to Start?',
      subtitle: 'Connect wallet and join prediction markets, team trading, battle royale... You could be the next legend!',
      connectWallet: 'Connect Wallet',
      viewTutorial: 'View Tutorial',
      riskWarning: '⚠️ Risk Warning: Only use funds you can afford to lose',
    },
    footer: {
      description: 'Next-Gen Social Trading Casino',
      product: 'Product',
      resources: 'Resources',
      social: 'Social',
      docs: 'Docs',
      faq: 'FAQ',
      blog: 'Blog',
      copyright: '© 2026 OnChain Casino. Built with OKX OnchainOS Skills.',
      riskWarning: '⚠️ This platform is for entertainment. Capital at risk.',
    },
    language: {
      zh: '中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      prediction: '予測市場',
      battleRoyale: 'バトルロイヤル',
      teams: 'チーム',
      bet: '賭け',
      leaderboard: 'リーダーボード',
      connectWallet: 'ウォレットを接続',
    },
    home: {
      title: 'OnChain Casino',
      subtitle: '取引 + 予測 + ソーシャル + ゲーム = 次世代 DeFi 体験',
      startPrediction: '予測を開始',
      joinBattle: 'バトルロイヤル',
      totalVolume: '総取引量',
      activeUsers: 'アクティブユーザー',
      predictionMarkets: '予測市場',
      prizePool: '賞金プール',
      scrollDown: 'スクロールして詳細を見る',
    },
    features: {
      title: '6 つのコア機能',
      subtitle: '予測市場、ソーシャル取引、競技ゲームを組み合わせた前例のない DeFi 体験',
      prediction: {
        title: '予測市場',
        desc: 'トークン価格の二項予測、動的オッズ、全額払い戻し。Polymarket よりシンプルで、もっとエキサイティング。',
      },
      teams: {
        title: 'チーム取引',
        desc: '5 人のチームで新しいトークンの購入を共同決定。リスクと報酬を共有。',
      },
      bet: {
        title: '賭けプロトコル',
        desc: '1v1 またはマルチプレイヤーの賭け、カスタム条件。スマートコントラクト決済、公平で透明。',
      },
      battle: {
        title: 'バトルロイヤル',
        desc: '100 人のプレイヤー、24 時間競争。上位トレーダーが勝利。リアルタイムランキング、最大 80% 賞金。',
      },
      copytrade: {
        title: 'コピー取引',
        desc: 'プールを作成、フォロワーから収益。透明なポジション、自動利益分配。',
      },
      achievements: {
        title: '実績',
        desc: 'タスクを完了して NFT バッジを獲得。オンチェーン記録、取引可能、あなたの遺産を証明。',
      },
    },
    cta: {
      title: '始める準備はできましたか？',
      subtitle: 'ウォレットを接続して、予測市場、チーム取引、バトルロイヤルに参加... 次の伝説はあなたかもしれません！',
      connectWallet: 'ウォレットを接続',
      viewTutorial: 'チュートリアルを見る',
      riskWarning: '⚠️ リスク警告：失ってもよい資金のみを使用してください',
    },
    footer: {
      description: '次世代ソーシャル取引カジノ',
      product: '製品',
      resources: 'リソース',
      social: 'ソーシャル',
      docs: 'ドキュメント',
      faq: 'FAQ',
      blog: 'ブログ',
      copyright: '© 2026 OnChain Casino. Built with OKX OnchainOS Skills.',
      riskWarning: '⚠️ このプラットフォームは娯楽用です。資本が危険にさらされています。',
    },
    language: {
      zh: '中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
    },
  },
  ko: {
    nav: {
      home: '홈',
      prediction: '예측 시장',
      battleRoyale: '배틀로얄',
      teams: '팀',
      bet: '내기',
      leaderboard: '리더보드',
      connectWallet: '지갑 연결',
    },
    home: {
      title: 'OnChain Casino',
      subtitle: '트레이딩 + 예측 + 소셜 + 게이밍 = 차세대 DeFi 경험',
      startPrediction: '예측 시작',
      joinBattle: '배틀로얄',
      totalVolume: '총 거래량',
      activeUsers: '활성 사용자',
      predictionMarkets: '예측 시장',
      prizePool: '상금 풀',
      scrollDown: '스크롤하여 자세히 알아보기',
    },
    features: {
      title: '6 가지 핵심 기능',
      subtitle: '예측 시장, 소셜 트레이딩, 경쟁 게이밍을 결합한 전례 없는 DeFi 경험',
      prediction: {
        title: '예측 시장',
        desc: '토큰 가격 이진 예측, 동적 배당률, 전액 지급. Polymarket 보다 간단하고 더 흥미진진합니다.',
      },
      teams: {
        title: '팀 트레이딩',
        desc: '5 인 팀이 함께 새로운 토큰 구매를 결정. 위험과 보상 공유.',
      },
      bet: {
        title: '내기 프로토콜',
        desc: '1v1 또는 멀티플레이어 내기, 사용자 정의 조건. 스마트 계약 결제, 공정하고 투명.',
      },
      battle: {
        title: '배틀로얄',
        desc: '100 명 플레이어, 24 시간 경쟁. 상위 트레이더 승리. 실시간 순위, 최대 80% 상금.',
      },
      copytrade: {
        title: '카피 트레이딩',
        desc: '풀 생성, 팔로워로부터 수익. 투명한 포지션, 자동 이익 분배.',
      },
      achievements: {
        title: '업적',
        desc: '작업 완료로 NFT 배지 획득. 온체인 기록, 거래 가능, 당신의 유산 증명.',
      },
    },
    cta: {
      title: '시작할 준비가 되셨나요?',
      subtitle: '지갑을 연결하고 예측 시장, 팀 트레이딩, 배틀로얄에 참여... 다음 전설은 당신일 수 있습니다!',
      connectWallet: '지갑 연결',
      viewTutorial: '튜토리얼 보기',
      riskWarning: '⚠️ 위험 경고: 잃어도 좋은 자금만 사용하세요',
    },
    footer: {
      description: '차세대 소셜 트레이딩 카지노',
      product: '제품',
      resources: '리소스',
      social: '소셜',
      docs: '문서',
      faq: 'FAQ',
      blog: '블로그',
      copyright: '© 2026 OnChain Casino. Built with OKX OnchainOS Skills.',
      riskWarning: '⚠️ 이 플랫폼은 엔터테인먼트용입니다. 자본이 위험에 처해 있습니다.',
    },
    language: {
      zh: '中文',
      en: 'English',
      ja: '日本語',
      ko: '한국어',
    },
  },
};

// 默认语言
export const defaultLanguage: Language = 'zh';

// 语言名称映射
export const languageNames: Record<Language, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
};

// 语言标志
export const languageFlags: Record<Language, string> = {
  zh: '🇨🇳',
  en: '🇬🇧',
  ja: '🇯🇵',
  ko: '🇰🇷',
};
