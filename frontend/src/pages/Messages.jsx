import { MessageSquare, Construction } from 'lucide-react';
import { useGunAuth } from '../context/GunAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Messages = () => {
  const { currentUser: user, userProfile } = useGunAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Construction className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            <MessageSquare className="inline h-6 w-6 mr-2" />
            Mesajlaşma Özelliği Yakında!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hoş geldin, {userProfile?.name}! 👋
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Gerçek zamanlı mesajlaşma özelliği şu anda geliştirilme aşamasında.
              Gun.js P2P altyapısı ile tamamen merkeziyetsiz mesajlaşma yakında aktif olacak!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              🚀 Gelecek Özellikler:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>P2P şifreli mesajlaşma (Gun.js SEA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Gerçek zamanlı bildirimler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Dosya paylaşımı (IPFS üzerinden)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Offline mesaj senkronizasyonu</span>
              </li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Şimdilik Dashboard ve İş İlanları özelliklerini kullanabilirsiniz!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
