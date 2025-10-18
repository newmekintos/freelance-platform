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
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-1 sm:space-x-2">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-base sm:text-xl font-bold dark:text-white hidden sm:inline">FreelancePlatform</span>
            <span className="text-base font-bold dark:text-white inline sm:hidden">FP</span>
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
              title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            {user ? (
              <>
                <Link to="/jobs" className="hidden md:block">
                  <Button variant="ghost" size="sm">İş İlanları</Button>
                </Link>
                <Link to="/services" className="hidden md:block">
                  <Button variant="ghost" size="sm">Servisler</Button>
                </Link>
                <Link to="/messages">
                  <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0" title="Mesajlar">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="/create">
                  <Button size="sm" className="h-8 sm:h-10 text-xs sm:text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">İlan Ver</span>
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="w-8 h-8 sm:w-10 sm:h-10 p-0" title="Profil">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-8 h-8 sm:w-10 sm:h-10 p-0" title="Çıkış">
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">Giriş Yap</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">Kayıt Ol</Button>
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
