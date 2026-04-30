import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Briefcase, MapPin, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { useAuth, api } from '../../context/AuthContext';

const Label = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 industrial-label text-slate-500 dark:text-slate-400">
    {Icon && <Icon size={14} className="text-blue-600" />}
    <span>{children}</span>
  </div>
);

export default function ApplicantDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'applicant') {
      navigate('/applicants/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apps, allJobs] = await Promise.all([
        api.getApplicationsByUser(user.id),
        api.getJobs()
      ]);
      setApplications(apps);
      setJobs(allJobs.slice(0, 5));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.role !== 'applicant') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <Label icon={ShieldCheck} className="mb-2">Applicant Dashboard</Label>
            <h1 className="industrial-heading text-4xl text-slate-950 dark:text-white">
              Welcome, {user.full_name || 'Job Seeker'}
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              {user.barangay ? `Barangay: ${user.barangay}` : 'Complete your profile to apply for jobs'}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bento-card p-6">
            <Label>Total Applications</Label>
            <p className="text-3xl font-black text-slate-950 dark:text-white mt-2">
              {applications.length}
            </p>
          </div>
          <div className="bento-card p-6">
            <Label>Pending</Label>
            <p className="text-3xl font-black text-slate-950 dark:text-white mt-2">
              {applications.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bento-card p-6">
            <Label>Accepted</Label>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              {applications.filter(a => a.status === 'accepted').length}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          {['overview', 'jobs', 'applications'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                activeTab === tab 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bento-card p-8">
              <h3 className="text-xl font-black text-slate-950 dark:text-white mb-4">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.full_name || 'Not set'}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.phone || 'Not set'}</p>
                </div>
                <div>
                  <Label>Barangay</Label>
                  <p className="text-slate-900 dark:text-white font-medium">{user.barangay || 'Not set'}</p>
                </div>
              </div>
            </div>

            <div className="bento-card p-8 bg-blue-50 dark:bg-blue-900/10">
              <h3 className="text-xl font-black text-slate-950 dark:text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/browse"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-500 transition-all"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-950 dark:text-white mb-4">Recommended Jobs</h3>
            {jobs.map(job => (
              <div key={job.id} className="bento-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="industrial-label text-blue-600">{job.type}</span>
                    <span className="text-slate-300">•</span>
                    <span className="industrial-label text-slate-500">{job.category}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 dark:text-white">{job.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
              </div>
            ))}
            <Link 
              to="/browse" 
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mt-4"
            >
              View all jobs <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No applications yet</p>
                <Link 
                  to="/browse" 
                  className="text-blue-600 font-bold text-sm mt-2 inline-block"
                >
                  Browse jobs to apply
                </Link>
              </div>
            ) : (
              applications.map(app => (
                <div key={app.id} className="bento-card p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-950 dark:text-white">{app.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                        <span>{app.company}</span>
                        <span>{app.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                      <span className="text-slate-500 text-sm">
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}