import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  Shield, 
  Zap, 
  Target, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Home = () => {
  const features = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      title: 'İş İlanları',
      description: 'İş verenler kolayca ilan verebilir, freelancerlar profesyonel başvurular yapabilir.',
      color: 'bg-blue-50'
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: 'Freelancer Servisleri',
      description: 'Yeteneklerinizi sergileyin, kendi hizmet portföyünüzü oluşturun.',
      color: 'bg-purple-50'
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-green-600" />,
      title: 'Gerçek Zamanlı Chat',
      description: 'Anlık mesajlaşma ile hızlı ve etkili iletişim kurun.',
      color: 'bg-green-50'
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: 'Hızlı ve Basit',
      description: 'Karmaşık süreçler yok, sadece saf bağlantı. Hemen başlayın!',
      color: 'bg-yellow-50'
    },
  ];

  const stats = [
    { label: 'Aktif Kullanıcı', value: '1000+', icon: <Users className="h-5 w-5" /> },
    { label: 'İş İlanı', value: '500+', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Tamamlanan Proje', value: '2500+', icon: <CheckCircle2 className="h-5 w-5" /> },
    { label: 'Ortalama Yanıt Süresi', value: '< 2 saat', icon: <Clock className="h-5 w-5" /> },
  ];

  const steps = [
    {
      number: '01',
      title: 'Hesap Oluştur',
      description: 'Sadece email ve şifre ile 30 saniyede kayıt ol. KYC yok, doğrulama yok.',
      icon: <Target className="h-8 w-8" />
    },
    {
      number: '02',
      title: 'İlan Ver veya Başvur',
      description: 'İş ilanı yayınla veya mevcut iş ilanlarına profesyonel başvurular yap.',
      icon: <Briefcase className="h-8 w-8" />
    },
    {
      number: '03',
      title: 'Bağlantı Kur',
      description: 'Gerçek zamanlı chat ile direkt iletişime geç ve projenizi başlat.',
      icon: <MessageSquare className="h-8 w-8" />
    },
  ];

  const benefits = [
    { text: 'KYC ve onay süreci yok', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
    { text: 'Ödeme entegrasyonu yok, özgür karar', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
    { text: 'Gerçek zamanlı mesajlaşma', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
    { text: 'Sınırsız ilan ve başvuru', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
    { text: 'Tamamen ücretsiz kullanım', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
    { text: 'Modern ve hızlı arayüz', icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
  ];

  return (
    <div className="space-y-24 -mt-8">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50 dark:from-primary/10 dark:via-purple-950/20 dark:to-pink-950/20 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
        
        <div className="text-center space-y-8 py-20 px-4">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground border-0">
              <Sparkles className="h-4 w-4 mr-2 inline" />
              Yeni Nesil Freelance Platform
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Freelance
              </span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">İşlerinizi Yönetin</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Karmaşık süreçlerden kurtulun. İş verenler ve freelancerlar için 
              <span className="font-semibold text-primary"> basit</span>, 
              <span className="font-semibold text-purple-600"> hızlı</span> ve 
              <span className="font-semibold text-pink-600"> etkili</span> bir platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                <Zap className="h-5 w-5 mr-2" />
                Hemen Başla - Ücretsiz
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                İş İlanlarına Göz At
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Güvenli</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Global Erişim</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Hızlı Kurulum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-center text-primary">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features Section - Enhanced */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2 inline" />
            Özellikler
          </Badge>
          <h2 className="text-4xl font-bold dark:text-gray-100">Neden Bizi Seçmelisiniz?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern teknoloji ve kullanıcı dostu arayüz ile freelance işlerinizi yönetmek hiç bu kadar kolay olmamıştı
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-primary/20"
            >
              <CardHeader>
                <div className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2 inline" />
            Nasıl Çalışır
          </Badge>
          <h2 className="text-4xl font-bold dark:text-gray-100">3 Adımda Başlayın</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dakikalar içinde platformu kullanmaya başlayın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-primary">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-primary/5 to-purple-50 dark:from-primary/10 dark:to-purple-950/20 rounded-3xl p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge className="px-4 py-2 bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4 mr-2 inline" />
              Avantajlar
            </Badge>
            <h2 className="text-4xl font-bold dark:text-gray-100">Özgürlük ve Basitlik</h2>
            <p className="text-lg text-muted-foreground">
              Karmaşık süreçlerden ve gereksiz kısıtlamalardan uzak
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4">
                {benefit.icon}
                <span className="font-medium dark:text-gray-200">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600 -z-10" />
        <div className="relative text-center space-y-6 py-20 px-4 text-white">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Hayalinizdeki Projeye Bugün Başlayın
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Binlerce iş veren ve freelancer'ın güvendiği platformda siz de yerinizi alın.
            Ücretsiz hesap oluşturun ve fırsatları keşfetmeye başlayın!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-xl">
                <Sparkles className="h-5 w-5 mr-2" />
                Ücretsiz Kayıt Ol
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white/20 hover:bg-white/30 border-white/50 text-white backdrop-blur"
              >
                Freelancerları Keşfet
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Kredi kartı gerekmez</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Anında başla</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
