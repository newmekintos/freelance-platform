import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Zap,
  Users,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Zap className="h-5 w-5" />, text: 'Anında erişim' },
    { icon: <Users className="h-5 w-5" />, text: '1000+ aktif kullanıcı' },
    { icon: <MessageSquare className="h-5 w-5" />, text: 'Gerçek zamanlı chat' },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
        <div className="order-2 lg:order-1">
          <Card className="p-8 shadow-2xl border-2 dark:bg-gray-800 dark:border-gray-700">
            {/* Header */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
                <Badge className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Hoş Geldiniz
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight dark:text-white">Tekrar Hoş Geldiniz</h1>
              <p className="text-lg text-muted-foreground">
                Hesabınıza giriş yapın ve projelerinize devam edin
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <div className="w-1 h-12 bg-destructive rounded-full" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Adresiniz
                </label>
                <Input
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 dark:text-gray-200">
                  <Lock className="h-4 w-4 text-primary" />
                  Şifreniz
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Giriş yapılıyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Giriş Yap
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-muted-foreground dark:text-gray-400">veya</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Henüz hesabınız yok mu?
                </p>
                <Link to="/register">
                  <Button variant="outline" className="w-full h-12 font-semibold">
                    Ücretsiz Hesap Oluştur
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Side - Marketing */}
        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Freelance Platform
            </Badge>
            <h2 className="text-5xl font-bold leading-tight dark:text-white">
              Kariyerinizi Bir Sonraki
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {' '}Seviyeye{' '}
              </span>
              Taşıyın
            </h2>
            <p className="text-xl text-muted-foreground">
              Binlerce iş fırsatı, yetenekli freelancerlar ve başarılı projeler sizi bekliyor.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 bg-gradient-to-r from-primary/5 to-purple-50 dark:from-primary/10 dark:to-purple-950/20 rounded-xl p-4 border border-primary/10 dark:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <span className="font-medium text-lg dark:text-gray-200">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-50 dark:from-primary/10 dark:to-purple-950/20 border-primary/20 dark:border-primary/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-semibold dark:text-gray-200">Güvenilir Platform</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                "Freelance Platform sayesinde kariyerime yön verdim. Harika projeler, güvenilir müşteriler ve hızlı ödemeler!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                  AY
                </div>
                <div>
                  <div className="font-semibold text-sm dark:text-gray-200">Ahmet Yılmaz</div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">Senior Developer</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-sm text-muted-foreground">İş İlanı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">2500+</div>
              <div className="text-sm text-muted-foreground">Proje</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
