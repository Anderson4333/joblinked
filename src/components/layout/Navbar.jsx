import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layers, Sun, Moon, LogOut, ChevronDown, User, Briefcase, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrolled;
};

const IconButton = ({ icon: Icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg border transition-all ${
      active
        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
        : 'bg-transparent text-slate-600 border-slate-200 hover:border-slate-400 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-600'
    }`}
  >
    {Icon && <Icon size={16} />}
  </button>
);

export default function Navbar({ darkMode, toggleDarkMode }) {
  const scrolled = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin':
        return { to: '/admin/dashboard', label: 'Admin' };
      case 'employer':
        return { to: '/employer/dashboard', label: user.company_name?.split(' ')[0] || 'Employer' };
      case 'applicant':
        return { to: '/applicant/dashboard', label: user.full_name?.split(' ')[0] || 'Applicant' };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-slate-950 dark:bg-white rounded flex items-center justify-center transition-transform group-hover:scale-105">
            <Layers size={16} className="text-white dark:text-slate-950" />
          </div>
          <span className="industrial-heading text-xl text-slate-950 dark:text-white tracking-tight">
            JOBLINKED<span className="text-blue-600">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user?.role === 'admin' ? (
            <Link
              to="/admin/dashboard"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/platform"
                className={`text-sm font-medium transition-colors ${location.pathname === '/platform' ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
              >
                Platform
              </Link>
              <Link
                to="/browse"
                className={`text-sm font-medium transition-colors ${location.pathname === '/browse' ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
              >
                Jobs
              </Link>
              <Link
                to="/sectors"
                className={`text-sm font-medium transition-colors ${location.pathname === '/sectors' ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'}`}
              >
                Sectors
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Portals <ChevronDown size={14} />
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-2 min-w-[180px]">
                    <Link
                      to="/applicants"
                      className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setShowDropdown(false)}
                    >
                      For Job Seekers
                    </Link>
                    <Link
                      to="/employers"
                      className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setShowDropdown(false)}
                    >
                      For Employers
                    </Link>
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setShowDropdown(false)}
                    >
                      Admin
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <IconButton icon={darkMode ? Sun : Moon} onClick={toggleDarkMode} />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {user.role === 'admin' && <Shield size={14} className="text-blue-600" />}
                {user.role === 'employer' && <Briefcase size={14} className="text-blue-600" />}
                {user.role === 'applicant' && <User size={14} className="text-blue-600" />}
                <Link
                  to={dashboardLink?.to}
                  className="text-sm font-semibold hover:text-blue-600 transition-colors"
                >
                  {dashboardLink?.label}
                </Link>
              </div>
              <IconButton icon={LogOut} onClick={handleLogout} />
            </div>
          ) : (
            <div className="relative group">
              <button className="btn-shimmer bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all">
                Access Portal
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/applicants/login"
                  className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Job Seeker Login
                </Link>
                <Link
                  to="/employers/login"
                  className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Employer Login
                </Link>
                <Link
                  to="/admin/login"
                  className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}