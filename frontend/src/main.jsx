import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { GunAuthProvider } from './context/GunAuthContext'
import { SocketProvider } from './context/SocketContext'
import { ThemeProvider } from './context/ThemeContext'
import ModeSelector from './pages/ModeSelector'

const Root = () => {
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has selected a mode before
    const savedMode = localStorage.getItem('platform_mode');
    if (savedMode) {
      setMode(savedMode);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Yükleniyor...</div>
      </div>
    );
  }

  if (!mode) {
    return <ModeSelector onSelectMode={setMode} />;
  }

  // P2P Mode
  if (mode === 'p2p') {
    return (
      <ThemeProvider>
        <GunAuthProvider>
          <App isPeerMode={true} />
        </GunAuthProvider>
      </ThemeProvider>
    );
  }

  // Classic Mode
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <App isPeerMode={false} />
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
