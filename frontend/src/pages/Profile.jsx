import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Briefcase, Package, MessageCircle } from 'lucide-react';
import { usersAPI, jobsAPI, servicesAPI, messagesAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();
  
  const [profileUser, setProfileUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
  });
  const [myJobs, setMyJobs] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      // Başka birinin profili
      setIsOwnProfile(false);
      fetchUserProfile(userId);
    } else if (user) {
      // Kendi profilim
      setIsOwnProfile(true);
      setProfileUser(user);
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        skills: user.skills?.join(', ') || '',
      });
      fetchMyPosts(user.id);
    }
  }, [user, userId]);

  const fetchUserProfile = async (id) => {
    try {
      const response = await usersAPI.getById(id);
      setProfileUser(response.data);
      fetchMyPosts(id);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Kullanıcı profili yüklenemedi');
    }
  };

  const fetchMyPosts = async (targetUserId) => {
    try {
      const [jobsRes, servicesRes] = await Promise.all([
        jobsAPI.getAll(),
        servicesAPI.getAll(),
      ]);
      
      setMyJobs(jobsRes.data.filter(job => job.userId === targetUserId));
      setMyServices(servicesRes.data.filter(service => service.userId === targetUserId));
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleContact = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const response = await messagesAPI.createConversation(profileUser.id);
      navigate(`/messages?conversation=${response.data.id}`);
    } catch (err) {
      alert('Konuşma başlatılırken hata oluştu');
    }
  };

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

      const response = await usersAPI.updateMe({
        name: formData.name,
        bio: formData.bio,
        skills,
      });

      updateUser(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Profil güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!profileUser && !userId) {
    if (!user) {
      navigate('/login');
      return null;
    }
  }

  if (!profileUser) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isOwnProfile ? 'Profilim' : `${profileUser.name} - Profil`}
        </h1>
        {isOwnProfile && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>Profili Düzenle</Button>
        )}
        {!isOwnProfile && user && (
          <Button onClick={handleContact} className="bg-gradient-to-r from-purple-600 to-pink-600">
            <MessageCircle className="h-4 w-4 mr-2" />
            Mesaj Gönder
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center text-2xl font-bold">
              {profileUser.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle>{profileUser.name}</CardTitle>
              {isOwnProfile && <CardDescription>{profileUser.email}</CardDescription>}
              <Badge className="mt-2">
                {profileUser.userType === 'freelancer' ? 'Freelancer' : 'İş Veren'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && isOwnProfile ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">İsim</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hakkımda</label>
                <Textarea
                  name="bio"
                  placeholder="Kendinizi tanıtın..."
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Yetenekler (virgülle ayırın)</label>
                <Input
                  name="skills"
                  placeholder="Örn: React, Node.js, Design"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  İptal
                </Button>
              </div>
            </form>
          ) : (
            <>
              {profileUser.bio && (
                <div>
                  <h3 className="font-semibold mb-2">Hakkımda</h3>
                  <p className="text-muted-foreground">{profileUser.bio}</p>
                </div>
              )}

              {profileUser.skills && profileUser.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Yetenekler</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* My Jobs */}
      {myJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {isOwnProfile ? 'Verdiğim İş İlanları' : 'İş İlanları'} ({myJobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {job.description}
                      </p>
                    </div>
                    <Badge>{job.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* My Services */}
      {myServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {isOwnProfile ? 'Sunduğum Servisler' : 'Servisler'} ({myServices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myServices.map((service) => (
                <div
                  key={service.id}
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {service.description}
                      </p>
                    </div>
                    <Badge>{service.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
