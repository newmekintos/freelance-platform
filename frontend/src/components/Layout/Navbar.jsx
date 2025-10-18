import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, MessageSquare, LogOut, Plus, Moon, Sun } from 'lucide-react';
import { useGunAuth } from '../../context/GunAuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Navbar = () => {
  const { currentUser: user, logout } = useGunAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold dark:text-white">FreelancePlatform</span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 p-0"
              title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {user ? (
              <>
                <Link to="/jobs">
                  <Button variant="ghost">İş İlanları</Button>
                </Link>
                <Link to="/services">
                  <Button variant="ghost">Servisler</Button>
                </Link>
                <Link to="/messages">
                  <Button variant="ghost">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    İlan Ver
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Giriş Yap</Button>
                </Link>
                <Link to="/register">
                  <Button>Kayıt Ol</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
