import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User,
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Shield,
  Zap,
  Clock,
  Briefcase,
  Rocket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'freelancer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { 
      icon: <Shield className="h-5 w-5" />, 
      title: 'Güvenli Platform',
      text: 'Verileriniz güvende' 
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      title: 'Hızlı Başlangıç',
      text: '30 saniyede kayıt ol' 
    },
    { 
      icon: <Clock className="h-5 w-5" />, 
      title: 'KYC Yok',
      text: 'Anında kullanmaya başla' 
    },
  ];

  const userTypeOptions = [
    {
      value: 'freelancer',
      label: 'Freelancer',
      description: 'İş ilanlarına başvur, servislerini sun',
      icon: <User className="h-5 w-5" />,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      value: 'client',
      label: 'İş Veren',
      description: 'İş ilanı ver, freelancer bul',
      icon: <Briefcase className="h-5 w-5" />,
      gradient: 'from-purple-500 to-pink-600'
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Marketing */}
        <div className="order-2 lg:order-1 space-y-8">
          <div className="space-y-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              Ücretsiz Başla
            </Badge>
            <h2 className="text-5xl font-bold leading-tight">
              Kariyerinize
              <span className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Hemen{' '}
              </span>
              Bugün Başlayın
            </h2>
            <p className="text-xl text-muted-foreground">
              Binlerce fırsatın olduğu platformda yerinizi alın. Kayıt olmak sadece 30 saniye!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <div className="font-semibold text-lg">{benefit.title}</div>
                  <div className="text-sm text-muted-foreground">{benefit.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Platform İstatistikleri</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Kullanıcı</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-90">İş İlanı</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2500+</div>
                  <div className="text-sm opacity-90">Proje</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-50 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Başarı Hikayesi</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "İlk gün kayıt oldum, ertesi gün ilk işimi buldum. Platform gerçekten çok basit ve etkili!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                  MK
                </div>
                <div>
                  <div className="font-semibold text-sm">Mehmet Kaya</div>
                  <div className="text-xs text-muted-foreground">UI/UX Designer</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Form */}
        <div className="order-1 lg:order-2">
          <Card className="p-8 shadow-2xl border-2">
            {/* Header */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Ücretsiz Kayıt
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Hesap Oluştur</h1>
              <p className="text-lg text-muted-foreground">
                30 saniyede ücretsiz hesap oluştur ve hemen başla
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
                <label className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  Adınız Soyadınız
                </label>
                <Input
                  name="name"
                  placeholder="Ahmet Yılmaz"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  Email Adresiniz
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Şifre Belirleyin
                </label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-12 text-base"
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">En az 6 karakter</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Hesap Tipi Seçin</label>
                <div className="grid grid-cols-1 gap-3">
                  {userTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: option.value })}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        formData.userType === option.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-200 hover:bg-green-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center text-white`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-base">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        {formData.userType === option.value && (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Hesap oluşturuluyor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Ücretsiz Hesap Oluştur
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-muted-foreground">veya</span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Zaten hesabınız var mı?
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full h-12 font-semibold">
                    Giriş Yap
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-center text-muted-foreground pt-4">
                Kayıt olarak{' '}
                <span className="text-primary hover:underline cursor-pointer">Kullanım Şartları</span>
                {' '}ve{' '}
                <span className="text-primary hover:underline cursor-pointer">Gizlilik Politikası</span>
                'nı kabul etmiş olursunuz.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
