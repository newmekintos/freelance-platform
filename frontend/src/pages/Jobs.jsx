import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Clock, 
  Banknote, 
  MapPin, 
  User, 
  ArrowRight,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { useGunJobs } from '../hooks/useGunJobs';
import { formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Jobs = () => {
  // Gun.js P2P - Real-time jobs
  const { jobs, loading } = useGunJobs();
  const [error] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">İş ilanları yükleniyor...</p>
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
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-pink-50 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              İş İlanları
            </h1>
            <p className="text-lg text-muted-foreground">
              {jobs.length} aktif iş ilanı - En iyi fırsatları keşfedin
            </p>
          </div>
          <Link to="/create?type=job">
            <Button size="lg" className="shadow-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              İş İlanı Ver
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Toplam İlan</p>
                <p className="text-3xl font-bold text-primary">{jobs.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2 hover:border-purple-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Açık Pozisyon</p>
                <p className="text-3xl font-bold text-purple-600">
                  {jobs.filter(j => j.status === 'open').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-200 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Yeni İlanlar</p>
                <p className="text-3xl font-bold text-green-600">
                  {jobs.filter(j => {
                    const dayAgo = new Date();
                    dayAgo.setDate(dayAgo.getDate() - 1);
                    return new Date(j.createdAt) > dayAgo;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      {jobs.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Henüz İş İlanı Yok</h3>
            <p className="text-muted-foreground mb-6">
              İlk iş ilanını verin ve en iyi freelancerları bulun
            </p>
            <Link to="/create?type=job">
              <Button size="lg">
                <TrendingUp className="h-5 w-5 mr-2" />
                İlk İlanı Ver
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card 
              key={job.id} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {job.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <Link to={`/jobs/${job.id}`}>
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <Link 
                              to={`/profile/${job.userId}`}
                              className="font-medium hover:text-primary hover:underline transition-colors"
                            >
                              {job.user?.name || 'İsimsiz'}
                            </Link>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            {formatDate(job.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    
                    <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-2 text-sm">
                      {job.category}
                    </Badge>
                  </div>

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6 text-sm">
                      {job.budget && (
                        <div className="flex items-center gap-2 font-semibold text-green-600">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Banknote className="h-4 w-4" />
                          </div>
                          <span className="text-lg">{job.budget}</span>
                        </div>
                      )}
                      {job.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <Link to={`/jobs/${job.id}`}>
                      <Button className="group/btn">
                        Detayları Gör
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
