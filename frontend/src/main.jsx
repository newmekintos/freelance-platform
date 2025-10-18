import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GunAuthProvider } from './context/GunAuthContext'
import { Web3Provider } from './context/Web3Context'
import { ThemeProvider } from './context/ThemeContext'

// 🌐 WEB3 DECENTRALIZED FREELANCE PLATFORM
// ✅ P2P Database (Gun.js)
// ✅ Crypto Payments (Ethers.js + MetaMask)
// ✅ Decentralized Storage
// ❌ NO CENTRAL SERVER!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Web3Provider>
        <GunAuthProvider>
          <App isPeerMode={true} isWeb3={true} />
        </GunAuthProvider>
      </Web3Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
