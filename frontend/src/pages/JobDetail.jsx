import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Briefcase, Clock, DollarSign, User, MessageSquare } from 'lucide-react';
import { jobsAPI, applicationsAPI, messagesAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../lib/utils';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import Input from '../components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedBudget: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobsAPI.getById(id);
      setJob(response.data);
    } catch (err) {
      setError('İş ilanı yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await applicationsAPI.create({
        jobId: id,
        ...applicationData,
      });
      alert('Başvurunuz gönderildi!');
      setShowApplicationForm(false);
      setApplicationData({ coverLetter: '', proposedBudget: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Başvuru gönderilirken hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContactUser = async () => {
    try {
      const response = await messagesAPI.createConversation(job.user.id);
      navigate(`/messages?conversation=${response.data.id}`);
    } catch (err) {
      alert('Konuşma başlatılırken hata oluştu');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  if (error && !job) {
    return <div className="text-center py-12 text-destructive">{error}</div>;
  }

  const isOwner = user && job.userId === user.id;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate('/jobs')}>
        ← Geri
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{job.user?.name}</span>
                {job.user?.email && <span>({job.user.email})</span>}
              </CardDescription>
            </div>
            <Badge>{job.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {job.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">Bütçe:</span>
                <span>{job.budget}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatDate(job.createdAt)}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">İş Açıklaması</h3>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Gerekli Yetenekler</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {user && !isOwner && (
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={() => setShowApplicationForm(!showApplicationForm)}>
                <Briefcase className="h-4 w-4 mr-2" />
                Başvur
              </Button>
              <Button variant="outline" onClick={handleContactUser}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Mesaj Gönder
              </Button>
            </div>
          )}

          {isOwner && (
            <div className="flex gap-3 pt-4 border-t">
              <Link to={`/jobs/${id}/applications`}>
                <Button>Başvuruları Gör</Button>
              </Link>
            </div>
          )}

          {!user && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Başvurmak için giriş yapmalısınız
              </p>
              <Link to="/login">
                <Button>Giriş Yap</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {showApplicationForm && (
        <Card>
          <CardHeader>
            <CardTitle>Başvuru Formu</CardTitle>
            <CardDescription>Başvurunuzu tamamlayın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApply} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Başvuru Mektubu *</label>
                <Textarea
                  placeholder="Kendinizi tanıtın ve neden bu iş için uygun olduğunuzu açıklayın..."
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                  required
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Teklif Edilen Bütçe (Opsiyonel)</label>
                <Input
                  placeholder="Örn: 5000 TL"
                  value={applicationData.proposedBudget}
                  onChange={(e) => setApplicationData({ ...applicationData, proposedBudget: e.target.value })}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobDetail;
