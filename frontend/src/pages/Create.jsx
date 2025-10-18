import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jobsAPI, servicesAPI } from '../lib/api';
import { useGunAuth } from '../context/GunAuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const Create = () => {
  const { currentUser: user } = useGunAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL'den type parametresini al (job veya service)
  const typeParam = searchParams.get('type');
  const [postType, setPostType] = useState(typeParam === 'service' ? 'service' : 'job');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Geliştirme',
    skills: '',
    budget: '',
    price: '',
    deliveryTime: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // URL parametresi değiştiğinde postType'ı güncelle
  useEffect(() => {
    if (typeParam === 'service') {
      setPostType('service');
    } else if (typeParam === 'job') {
      setPostType('job');
    }
  }, [typeParam]);

  const categories = [
    'Web Geliştirme',
    'Mobil Uygulama',
    'Grafik Tasarım',
    'İçerik Yazarlığı',
    'SEO & Marketing',
    'Video Düzenleme',
    'Veri Girişi',
    'Diğer',
  ];

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
      const skills = formData.skills
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      if (postType === 'job') {
        await jobsAPI.create({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          skills,
          budget: formData.budget,
        });
        navigate('/jobs');
      } else {
        await servicesAPI.create({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          skills,
          price: formData.price,
          deliveryTime: formData.deliveryTime,
        });
        navigate('/services');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'İlan oluşturulurken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Yeni İlan Oluştur</h1>
        <p className="text-muted-foreground">İş ilanı veya servis ilanı oluşturun</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İlan Tipi</CardTitle>
          <CardDescription>Hangi tip ilan oluşturmak istiyorsunuz?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={postType === 'job' ? 'primary' : 'outline'}
              onClick={() => setPostType('job')}
              className="flex-1"
            >
              İş İlanı
            </Button>
            <Button
              variant={postType === 'service' ? 'primary' : 'outline'}
              onClick={() => setPostType('service')}
              className="flex-1"
            >
              Freelancer Servisi
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {postType === 'job' ? 'İş İlanı Detayları' : 'Servis Detayları'}
          </CardTitle>
          <CardDescription>
            {postType === 'job' 
              ? 'Aradığınız işi detaylı bir şekilde açıklayın'
              : 'Sunduğunuz servisi detaylı bir şekilde açıklayın'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Başlık *</label>
              <Input
                name="title"
                placeholder={postType === 'job' ? 'Örn: React Developer Aranıyor' : 'Örn: Modern Web Sitesi Tasarımı'}
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama *</label>
              <Textarea
                name="description"
                placeholder={postType === 'job' 
                  ? 'İşin detaylarını, gereksinimlerini ve beklentilerinizi açıklayın...'
                  : 'Sunduğunuz servisi, ne sağladığınızı ve nasıl çalıştığınızı açıklayın...'}
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Yetenekler (virgülle ayırın)
              </label>
              <Input
                name="skills"
                placeholder="Örn: React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            {postType === 'job' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Bütçe</label>
                <Input
                  name="budget"
                  placeholder="Örn: 5000-10000 TL"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fiyat</label>
                  <Input
                    name="price"
                    placeholder="Örn: 3000 TL"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teslimat Süresi</label>
                  <Input
                    name="deliveryTime"
                    placeholder="Örn: 7 gün"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Oluşturuluyor...' : 'İlanı Yayınla'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
