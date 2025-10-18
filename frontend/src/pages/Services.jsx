import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  Banknote, 
  User, 
  MessageCircle,
  Star,
  Zap,
  Plus
} from 'lucide-react';
import { useGunAuth } from '../context/GunAuthContext';
import { useGunServices } from '../hooks/useGunServices';
import { formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Services = () => {
  const { currentUser: user } = useGunAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Gun.js P2P - Real-time services
  const { services, loading } = useGunServices();
  const [error] = useState('');

  const handleContact = (userId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // TODO: Gun.js P2P messaging
    // For now, redirect to messages page
    navigate(`/messages?user=${userId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Servisler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Package className="h-8 w-8 text-purple-600" />
              Freelancer Servisleri
            </h1>
            <p className="text-lg text-muted-foreground">
              {services.length} profesyonel servis - Yetenekli freelancerları keşfedin
            </p>
          </div>
          {user && (
            <Link to="/create?type=service">
              <Button size="lg" className="shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-5 w-5 mr-2" />
                Servis Ekle
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Toplam Servis</p>
                <p className="text-3xl font-bold text-purple-600">{services.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 hover:border-pink-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Aktif Freelancer</p>
                <p className="text-3xl font-bold text-pink-600">
                  {new Set(services.map(s => s.userId)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <User className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-orange-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Yeni Servisler</p>
                <p className="text-3xl font-bold text-orange-600">
                  {services.filter(s => {
                    const dayAgo = new Date();
                    dayAgo.setDate(dayAgo.getDate() - 7);
                    return new Date(s.createdAt) > dayAgo;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Package className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Henüz Servis Yok</h3>
            <p className="text-muted-foreground mb-6">
              İlk servisi ekleyin ve müşterilerle buluşun
            </p>
            {user && (
              <Link to="/create?type=service">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="h-5 w-5 mr-2" />
                  İlk Servisi Ekle
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-200 flex flex-col"
            >
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="space-y-3">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      {service.category}
                    </Badge>
                    <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                      {service.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <Link 
                        to={`/profile/${service.userId}`}
                        className="font-medium text-sm hover:text-purple-600 hover:underline transition-colors"
                      >
                        {service.user?.name || 'İsimsiz'}
                      </Link>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(service.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {service.description}
                  </p>

                  {/* Skills */}
                  {service.skills && service.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.skills.slice(0, 3).map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{service.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Price & Time */}
                  <div className="flex items-center gap-4 py-3 border-t">
                    {service.price && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <Banknote className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Başlangıç</p>
                          <p className="font-bold text-green-600 text-sm">{service.price}</p>
                        </div>
                      </div>
                    )}
                    {service.deliveryTime && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Teslimat</p>
                          <p className="font-semibold text-sm">{service.deliveryTime}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleContact(service.userId)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    İletişime Geç
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
