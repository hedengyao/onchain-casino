/**
 * 钱包连接 Hook - 支持多种钱包
 */
import { useState, useEffect } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  walletType: 'metamask' | 'phantom' | null;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    walletType: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检查钱包是否已连接
  useEffect(() => {
    const checkConnection = async () => {
      // 检查 MetaMask (EVM)
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({ 
            method: 'eth_accounts' 
          });
          if (accounts.length > 0) {
            const chainId = await (window as any).ethereum.request({ 
              method: 'eth_chainId' 
            });
            setWallet({
              isConnected: true,
              address: accounts[0],
              chainId: parseInt(chainId, 16),
              walletType: 'metamask',
            });
          }
        } catch (err) {
          console.error('检查 MetaMask 连接失败:', err);
        }
      }

      // 检查 Phantom (Solana)
      if (typeof window !== 'undefined' && (window as any).solana?.isPhantom) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true });
          setWallet({
            isConnected: true,
            address: response.publicKey.toString(),
            chainId: null,
            walletType: 'phantom',
          });
        } catch (err) {
          console.error('检查 Phantom 连接失败:', err);
        }
      }
    };

    checkConnection();
  }, []);

  // 连接钱包
  const connect = async (type: 'metamask' | 'phantom') => {
    setIsConnecting(true);
    setError(null);

    try {
      if (type === 'metamask') {
        if (typeof window === 'undefined' || !(window as any).ethereum) {
          throw new Error('请安装 MetaMask 钱包');
        }
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        const chainId = await (window as any).ethereum.request({ 
          method: 'eth_chainId' 
        });
        setWallet({
          isConnected: true,
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          walletType: 'metamask',
        });
      } else if (type === 'phantom') {
        if (typeof window === 'undefined' || !(window as any).solana?.isPhantom) {
          throw new Error('请安装 Phantom 钱包');
        }
        const response = await (window as any).solana.connect();
        setWallet({
          isConnected: true,
          address: response.publicKey.toString(),
          chainId: null,
          walletType: 'phantom',
        });
      }
    } catch (err: any) {
      setError(err.message || '连接失败');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  // 断开连接
  const disconnect = async () => {
    try {
      if (wallet.walletType === 'phantom' && (window as any).solana) {
        await (window as any).solana.disconnect();
      }
      setWallet({
        isConnected: false,
        address: null,
        chainId: null,
        walletType: null,
      });
    } catch (err: any) {
      setError(err.message || '断开连接失败');
    }
  };

  // 格式化地址显示
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    ...wallet,
    isConnecting,
    error,
    connect,
    disconnect,
    formatAddress,
  };
}
