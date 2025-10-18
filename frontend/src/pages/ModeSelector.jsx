import { useState } from 'react';
import { Wifi, WifiOff, Server, Users, Zap, Shield, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const ModeSelector = ({ onSelectMode }) => {
  const [selected, setSelected] = useState(null);

  const modes = [
    {
      id: 'p2p',
      name: 'P2P Mode',
      subtitle: 'Decentralized',
      icon: <Users className="h-12 w-12" />,
      gradient: 'from-green-500 to-emerald-600',
      features: [
        { icon: <WifiOff />, text: 'Merkezi sunucu yok' },
        { icon: <Shield />, text: 'Tam gizlilik' },
        { icon: <Zap />, text: 'Offline çalışır' },
        { icon: <Globe />, text: 'Her kullanıcı sunucu' },
      ],
      pros: [
        'Tamamen bedava',
        'Sansür edilemez',
        'Kendi verini kontrol edersin',
        'İnternet kesilince bile çalışır',
      ],
      cons: [
        'İlk sync daha yavaş',
        'Experimental özellik',
      ],
    },
    {
      id: 'classic',
      name: 'Classic Mode',
      subtitle: 'Traditional Server',
      icon: <Server className="h-12 w-12" />,
      gradient: 'from-blue-500 to-purple-600',
      features: [
        { icon: <Wifi />, text: 'Merkezi sunucu' },
        { icon: <Zap />, text: 'Hızlı başlangıç' },
        { icon: <Shield />, text: 'Güvenli' },
        { icon: <Globe />, text: 'Stabil' },
      ],
      pros: [
        'Hızlı ve güvenilir',
        'Test edilmiş sistem',
        'Daha az teknik bilgi gerekli',
      ],
      cons: [
        'Sunucu gerekli',
        '15 dakika inaktiflikten sonra uyku modu',
      ],
    },
  ];

  const handleSelect = (modeId) => {
    setSelected(modeId);
  };

  const handleConfirm = () => {
    if (selected) {
      localStorage.setItem('platform_mode', selected);
      onSelectMode(selected);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Platform Modu Seçin
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-400">
            Freelance Platform'u nasıl kullanmak istersiniz?
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700 ${
                selected === mode.id
                  ? 'ring-4 ring-primary shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => handleSelect(mode.id)}
            >
              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center text-white mb-6 mx-auto`}>
                {mode.icon}
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 dark:text-white">{mode.name}</h2>
                <p className="text-muted-foreground dark:text-gray-400">{mode.subtitle}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {mode.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 dark:text-gray-300">
                    <div className="text-primary dark:text-primary-foreground">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Pros */}
              <div className="mb-4">
                <div className="font-semibold text-green-600 dark:text-green-400 mb-2">✅ Avantajlar:</div>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-gray-400">
                  {mode.pros.map((pro, idx) => (
                    <li key={idx}>• {pro}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <div className="font-semibold text-orange-600 dark:text-orange-400 mb-2">⚠️ Dezavantajlar:</div>
                <ul className="space-y-1 text-sm text-muted-foreground dark:text-gray-400">
                  {mode.cons.map((con, idx) => (
                    <li key={idx}>• {con}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Confirm Button */}
        {selected && (
          <div className="text-center">
            <Button
              onClick={handleConfirm}
              size="lg"
              className="px-12 py-6 text-lg shadow-xl"
            >
              {selected === 'p2p' ? '🌐 P2P Mode ile Devam Et' : '🖥️ Classic Mode ile Devam Et'}
            </Button>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">
              Not: Daha sonra ayarlardan değiştirebilirsiniz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;
