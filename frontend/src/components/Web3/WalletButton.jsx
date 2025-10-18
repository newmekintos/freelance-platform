import { Wallet, LogOut, AlertCircle } from 'lucide-react';
import { useWeb3 } from '../../context/Web3Context';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const WalletButton = () => {
  const {
    account,
    balance,
    isConnected,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet,
    getNetworkName,
    formatAddress,
  } = useWeb3();

  if (!isMetaMaskInstalled()) {
    return (
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/30 transition-colors"
      >
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm font-medium">MetaMask Yükle</span>
      </a>
    );
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        <span>Cüzdan Bağla</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Network Badge */}
      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-0">
        {getNetworkName()}
      </Badge>

      {/* Balance */}
      <div className="hidden md:flex flex-col items-end">
        <div className="text-xs text-muted-foreground dark:text-gray-400">Bakiye</div>
        <div className="text-sm font-semibold dark:text-gray-200">
          {parseFloat(balance).toFixed(4)} ETH
        </div>
      </div>

      {/* Account */}
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
        <Wallet className="h-4 w-4 text-primary" />
        <span className="text-sm font-mono font-semibold dark:text-gray-200">
          {formatAddress(account)}
        </span>
      </div>

      {/* Disconnect */}
      <Button
        onClick={disconnectWallet}
        variant="ghost"
        size="sm"
        className="text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WalletButton;
