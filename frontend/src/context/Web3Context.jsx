import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined';
  };

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert('MetaMask kurulu değil! Lütfen MetaMask yükleyin: https://metamask.io');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();
      const accountBalance = await web3Provider.getBalance(accounts[0]);

      setAccount(accounts[0]);
      setProvider(web3Provider);
      setSigner(web3Signer);
      setBalance(ethers.formatEther(accountBalance));
      setChainId(network.chainId.toString());
      setIsConnected(true);

      // Save to localStorage
      localStorage.setItem('web3_connected', 'true');
    } catch (error) {
      console.error('Wallet bağlantı hatası:', error);
      alert('Wallet bağlanamadı: ' + error.message);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
    localStorage.removeItem('web3_connected');
  };

  // Send payment
  const sendPayment = async (to, amountInEth) => {
    if (!signer) throw new Error('Wallet bağlı değil');

    try {
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(amountInEth.toString()),
      });

      await tx.wait();
      
      // Update balance
      const newBalance = await provider.getBalance(account);
      setBalance(ethers.formatEther(newBalance));

      return tx;
    } catch (error) {
      console.error('Ödeme hatası:', error);
      throw error;
    }
  };

  // Listen to account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        // Reload balance
        if (provider) {
          provider.getBalance(accounts[0]).then((bal) => {
            setBalance(ethers.formatEther(bal));
          });
        }
      }
    };

    const handleChainChanged = (chainId) => {
      setChainId(chainId);
      // Reload page on chain change (recommended by MetaMask)
      window.location.reload();
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', handleChainChanged);

    // Auto-connect if was connected before
    const wasConnected = localStorage.getItem('web3_connected');
    if (wasConnected === 'true') {
      connectWallet();
    }

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  // Get network name
  const getNetworkName = () => {
    if (!chainId) return 'Unknown';
    
    const networks = {
      '1': 'Ethereum Mainnet',
      '5': 'Goerli Testnet',
      '11155111': 'Sepolia Testnet',
      '137': 'Polygon Mainnet',
      '80001': 'Mumbai Testnet',
      '56': 'BSC Mainnet',
      '97': 'BSC Testnet',
    };

    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const value = {
    account,
    provider,
    signer,
    balance,
    chainId,
    isConnected,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    sendPayment,
    getNetworkName,
    formatAddress,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
