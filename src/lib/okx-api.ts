/**
 * OKX OnchainOS Skills API 集成
 * 
 * 封装所有 OKX API 调用，供前端组件使用
 */

import crypto from 'crypto';
import https from 'https';

// 配置
const BASE_URL = 'https://web3.okx.com';

interface OkxConfig {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

// 从环境变量加载配置
function loadConfig(): OkxConfig {
  return {
    apiKey: process.env.OKX_API_KEY || '',
    secretKey: process.env.OKX_SECRET_KEY || '',
    passphrase: process.env.OKX_PASSPHRASE || '',
  };
}

// 生成签名
function generateSignature(
  method: string,
  path: string,
  body: string = '',
  secretKey: string
): { timestamp: string; signature: string } {
  const timestamp = new Date().toISOString();
  const signStr = timestamp + method + path + body;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(signStr)
    .digest('base64');
  
  return { timestamp, signature };
}

// 通用请求函数
async function okxFetch<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: any
): Promise<T> {
  const config = loadConfig();
  
  if (!config.apiKey || !config.secretKey || !config.passphrase) {
    throw new Error('OKX API 配置缺失，请检查环境变量');
  }

  const bodyStr = body ? JSON.stringify(body) : '';
  const { timestamp, signature } = generateSignature(method, path, bodyStr, config.secretKey);

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'web3.okx.com',
      path: path,
      method: method,
      headers: {
        'OK-ACCESS-KEY': config.apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-PASSPHRASE': config.passphrase,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.code !== '0') {
            reject(new Error(`API 错误：${json.code} - ${json.msg}`));
          } else {
            resolve(json.data as T);
          }
        } catch (e) {
          reject(new Error(`解析失败：${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时 (10s)'));
    });

    if (body) {
      req.write(bodyStr);
    }
    req.end();
  });
}

// ============ 代币相关 API ============

/**
 * 搜索代币
 */
export async function searchTokens(chainIndex: string, search: string) {
  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/market/token/search?chains=${chainIndex}&search=${encodeURIComponent(search)}`
  );
}

/**
 * 获取代币排行榜
 */
export async function getTokenToplist(
  chainIndex: string,
  sortBy: 'volume' | 'gainers' | 'marketcap' = 'volume',
  timeFrame: '5m' | '1h' | '4h' | '24h' = '24h'
) {
  const sortByMap = {
    volume: '5',
    gainers: '2',
    marketcap: '6',
  };
  
  const timeFrameMap = {
    '5m': '1',
    '1h': '2',
    '4h': '3',
    '24h': '4',
  };

  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/market/token/toplist?chains=${chainIndex}&sortBy=${sortByMap[sortBy]}&timeFrame=${timeFrameMap[timeFrame]}&limit=100`
  );
}

/**
 * 获取代币详细信息
 */
export async function getTokenPriceInfo(chainIndex: string, tokenAddress: string) {
  return okxFetch<any[]>(
    'POST',
    '/api/v6/dex/market/price-info',
    [{ chainIndex, tokenContractAddress: tokenAddress }]
  );
}

/**
 * 获取代币持有者分布
 */
export async function getTokenHolders(chainIndex: string, tokenAddress: string) {
  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/market/token/holder?chainIndex=${chainIndex}&tokenContractAddress=${tokenAddress}`
  );
}

// ============ 市场价格 API ============

/**
 * 获取实时价格
 */
export async function getCurrentPrice(chainIndex: string, tokenAddress: string) {
  return okxFetch<any[]>(
    'POST',
    '/api/v6/dex/market/price',
    [{ chainIndex, tokenContractAddress: tokenAddress }]
  );
}

/**
 * 获取 K 线数据
 */
export async function getCandles(
  chainIndex: string,
  tokenAddress: string,
  bar: string = '1H',
  limit: number = 100
) {
  return okxFetch<any[][]>(
    'GET',
    `/api/v6/dex/market/candles?chainIndex=${chainIndex}&tokenContractAddress=${tokenAddress}&bar=${bar}&limit=${limit}`
  );
}

/**
 * 获取交易记录
 */
export async function getTrades(
  chainIndex: string,
  tokenAddress: string,
  limit: number = 100
) {
  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/market/trades?chainIndex=${chainIndex}&tokenContractAddress=${tokenAddress}&limit=${limit}`
  );
}

// ============ 钱包相关 API ============

/**
 * 获取钱包总价值
 */
export async function getWalletTotalValue(
  address: string,
  chains: string[]
) {
  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/balance/total-value-by-address?address=${address}&chains=${chains.join(',')}`
  );
}

/**
 * 获取钱包所有代币余额
 */
export async function getAllTokenBalances(
  address: string,
  chains: string[]
) {
  return okxFetch<any[]>(
    'GET',
    `/api/v6/dex/balance/all-token-balances-by-address?address=${address}&chains=${chains.join(',')}`
  );
}

/**
 * 获取特定代币余额
 */
export async function getTokenBalances(
  address: string,
  tokens: Array<{ chainIndex: string; tokenContractAddress: string }>
) {
  return okxFetch<any[]>(
    'POST',
    '/api/v6/dex/balance/token-balances-by-address',
    { address, tokenContractAddresses: tokens }
  );
}

// ============ 交易相关 API ============

/**
 * 获取 Swap 报价
 */
export async function getSwapQuote(
  chainIndex: string,
  fromToken: string,
  toToken: string,
  amount: string
) {
  return okxFetch<any>(
    'POST',
    '/api/v6/dex/aggregator/quote',
    {
      chainIndex,
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount,
    }
  );
}

/**
 * 获取 Swap 指令 (Solana)
 */
export async function getSwapInstruction(
  chainIndex: string,
  fromToken: string,
  toToken: string,
  amount: string,
  slippage: number = 1
) {
  return okxFetch<any>(
    'POST',
    '/api/v6/dex/aggregator/swap-instruction',
    {
      chainIndex,
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount,
      slippage,
    }
  );
}

// ============ 工具函数 ============

/**
 * 链 ID 映射
 */
export const CHAIN_MAP = {
  solana: '501',
  xlayer: '196',
  ethereum: '1',
  base: '8453',
  bsc: '56',
  arbitrum: '42161',
  polygon: '137',
};

/**
 * 格式化金额
 */
export function formatUSD(value: number): string {
  if (!value || isNaN(value)) return '$0';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

/**
 * 格式化价格
 */
export function formatPrice(price: number): string {
  if (!price || isNaN(price)) return '$0';
  if (price < 0.0001) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(4)}`;
}

/**
 * 计算风险评分
 */
export function calculateRiskScore(token: any): { score: number; level: string; reasons: string[] } {
  let score = 100;
  const reasons: string[] = [];

  // 流动性检查
  const liquidity = parseFloat(token.liquidity || 0);
  if (liquidity < 10000) {
    score -= 40;
    reasons.push('流动性极低 (<$10K)');
  } else if (liquidity < 50000) {
    score -= 25;
    reasons.push('流动性低 (<$50K)');
  } else if (liquidity < 100000) {
    score -= 10;
    reasons.push('流动性中等 (<$100K)');
  }

  // 持有者检查
  const holders = parseInt(token.holders || 0);
  if (holders < 100) {
    score -= 30;
    reasons.push('持有者极少 (<100)');
  } else if (holders < 1000) {
    score -= 15;
    reasons.push('持有者较少 (<1K)');
  }

  // 社区认证
  if (!token.tagList?.communityRecognized) {
    score -= 15;
    reasons.push('未社区认证');
  }

  // 交易活跃度
  const txs = parseInt(token.txs || 0);
  if (txs < 100) {
    score -= 20;
    reasons.push('交易不活跃 (<100)');
  }

  score = Math.max(0, Math.min(100, score));

  let level = '🟢';
  if (score < 40) level = '🔴';
  else if (score < 70) level = '🟡';

  return { score, level, reasons };
}
