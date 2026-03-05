'use client';

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

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === 'undefined') return;
      
      // 检查 MetaMask
      if ((window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
            setWallet({
              isConnected: true,
              address: accounts[0],
              chainId: parseInt(chainId, 16),
              walletType: 'metamask',
            });
          }
        } catch (err) {
          console.error('MetaMask 检查失败:', err);
        }
      }

      // 检查 Phantom
      if ((window as any).solana?.isPhantom) {
        try {
          const response = await (window as any).solana.connect({ onlyIfTrusted: true });
          setWallet({
            isConnected: true,
            address: response.publicKey.toString(),
            chainId: null,
            walletType: 'phantom',
          });
        } catch (err) {
          console.error('Phantom 检查失败:', err);
        }
      }
    };

    checkConnection();
  }, []);

  const connect = async (type: 'metamask' | 'phantom') => {
    if (typeof window === 'undefined') return;
    
    setIsConnecting(true);
    setError(null);

    try {
      if (type === 'metamask') {
        if (!(window as any).ethereum) {
          throw new Error('请安装 MetaMask 钱包');
        }
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
        setWallet({
          isConnected: true,
          address: accounts[0],
          chainId: parseInt(chainId, 16),
          walletType: 'metamask',
        });
      } else if (type === 'phantom') {
        if (!(window as any).solana?.isPhantom) {
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
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      if (wallet.walletType === 'phantom' && (window as any).solana) {
        await (window as any).solana.disconnect();
      }
      setWallet({ isConnected: false, address: null, chainId: null, walletType: null });
    } catch (err: any) {
      setError(err.message || '断开连接失败');
    }
  };

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
