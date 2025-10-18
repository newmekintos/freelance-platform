import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Package, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  User,
  FileText
} from 'lucide-react';
import { useGunAuth } from '../context/GunAuthContext';
import { useGunJobs } from '../hooks/useGunJobs';
import { useGunServices } from '../hooks/useGunServices';
import { formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  const { currentUser: user } = useGunAuth();
  
  // Gun.js P2P - Real-time data
  const { jobs, loading: jobsLoading, getMyJobs } = useGunJobs();
  const { services, loading: servicesLoading, getMyServices } = useGunServices();
  
  const loading = jobsLoading || servicesLoading;
  
  // Get user's own jobs and services
  const myJobs = user ? getMyJobs() : [];
  const myServices = user ? getMyServices() : [];

  const stats = {
    myJobs,
    myServices,
    myApplications: [], // TODO: Gun.js applications
    conversations: [], // TODO: Gun.js messages
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  // Freelancer Dashboard
  if (user.userType === 'freelancer') {
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Hoş Geldin, {user.name}! 👋</h1>
              <p className="text-lg opacity-90">
                Freelancer Dashboard'ına hoş geldin. İşte bugünkü özetin.
              </p>
            </div>
            <Link to="/create?type=service">
              <Button size="lg" variant="secondary" className="shadow-xl">
                <Plus className="h-5 w-5 mr-2" />
                Yeni Servis Ekle
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Başvurularım</p>
                  <p className="text-3xl font-bold text-primary">{stats.myApplications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Servislerim</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.myServices.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mesajlar</p>
                  <p className="text-3xl font-bold text-green-600">{stats.conversations.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profil</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {user.skills?.length || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Yetenek</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Applications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Son Başvurularım
                </CardTitle>
                <Link to="/jobs">
                  <Button variant="ghost" size="sm">
                    Tümünü Gör
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {stats.myApplications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Henüz başvurun yok</p>
                  <Link to="/jobs">
                    <Button className="mt-4" size="sm">İş İlanlarına Göz At</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.myApplications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{app.job?.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {app.coverLetter}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(app.createdAt)}
                          </p>
                        </div>
                        <Badge variant={
                          app.status === 'accepted' ? 'success' : 
                          app.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {app.status === 'pending' ? 'Beklemede' :
                           app.status === 'accepted' ? 'Kabul Edildi' : 'Reddedildi'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Services */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Servislerim
                </CardTitle>
                <Link to="/create?type=service">
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Yeni Ekle
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {stats.myServices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Henüz servisiniz yok</p>
                  <Link to="/create?type=service">
                    <Button className="mt-4" size="sm">İlk Servisi Ekle</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.myServices.slice(0, 3).map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{service.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {service.price || 'Fiyat belirtilmemiş'}
                          </p>
                        </div>
                        <Badge>{service.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-primary/5 to-purple-50">
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Platformu keşfetmeye devam edin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/jobs">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <Briefcase className="h-6 w-6 mb-2" />
                  İş İlanlarına Göz At
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <User className="h-6 w-6 mb-2" />
                  Profilimi Düzenle
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="outline" className="w-full h-20 flex-col">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Mesajlarım
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Client (İş Veren) Dashboard
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Hoş Geldin, {user.name}! 👋</h1>
            <p className="text-lg opacity-90">
              İş Veren Dashboard'ına hoş geldin. Projelerini yönet.
            </p>
          </div>
          <Link to="/create?type=job">
            <Button size="lg" variant="secondary" className="shadow-xl">
              <Plus className="h-5 w-5 mr-2" />
              Yeni İş İlanı Ver
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">İş İlanlarım</p>
                <p className="text-3xl font-bold text-green-600">{stats.myJobs.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aktif İlanlar</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.myJobs.filter(j => j.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mesajlar</p>
                <p className="text-3xl font-bold text-purple-600">{stats.conversations.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.myJobs.filter(j => j.status === 'closed').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                İş İlanlarım
              </CardTitle>
              <Link to="/create?type=job">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni İlan
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats.myJobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Henüz iş ilanınız yok</p>
                <Link to="/create?type=job">
                  <Button className="mt-4" size="sm">İlk İlanı Ver</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.myJobs.slice(0, 3).map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {job.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(job.createdAt)}
                          </p>
                        </div>
                        <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                          {job.status === 'open' ? 'Aktif' : 'Kapalı'}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Son Mesajlar
              </CardTitle>
              <Link to="/messages">
                <Button variant="ghost" size="sm">
                  Tümünü Gör
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats.conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Henüz mesajınız yok</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.conversations.slice(0, 3).map((conv) => (
                  <Link key={conv.id} to={`/messages?conversation=${conv.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                          {conv.otherUser?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{conv.otherUser?.name}</h4>
                          {conv.lastMessage && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {conv.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>Platformu etkin kullanın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/services">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Package className="h-6 w-6 mb-2" />
                Freelancer Bul
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full h-20 flex-col">
                <User className="h-6 w-6 mb-2" />
                Profilimi Düzenle
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="outline" className="w-full h-20 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                Mesajlarım
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
