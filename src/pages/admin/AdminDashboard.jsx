import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Users, Building2, Briefcase, FileText, Trash2, Check, X, Loader2 } from 'lucide-react';
import { useAuth, api } from '../../context/AuthContext';

const Label = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 industrial-label text-slate-500 dark:text-slate-400">
    {Icon && <Icon size={14} className="text-blue-600" />}
    <span>{children}</span>
  </div>
);

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ userCount: 0, employerCount: 0, jobCount: 0, applicationCount: 0 });
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, employersData, jobsData, applicationsData] = await Promise.all([
        api.getStats(),
        api.getAllUsers(),
        api.getAllEmployers(),
        api.getJobs(),
        api.getApplications()
      ]);
      setStats(statsData);
      setUsers(usersData);
      setEmployers(employersData);
      setJobs(jobsData);
      setApplications(applicationsData);
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

  const handleEmployerStatus = async (id, status) => {
    await api.updateEmployerStatus(id, status);
    loadData();
  };

  const handleJobStatus = async (id, status) => {
    await api.updateJobStatus(id, status);
    loadData();
  };

  const handleJobDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    await api.deleteJob(id);
    loadData();
  };

  const handleApplicationStatus = async (id, status) => {
    await api.updateApplicationStatus(id, status);
    loadData();
  };

  if (!user || user.role !== 'admin') {
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
            <Label icon={ShieldCheck} className="mb-2">Admin Dashboard</Label>
            <h1 className="industrial-heading text-4xl text-slate-950 dark:text-white">
              System Administration
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Manage users, employers, jobs, and applications
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

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bento-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-blue-600" />
              <Label>Applicants</Label>
            </div>
            <p className="text-3xl font-black text-slate-950 dark:text-white">{stats.userCount}</p>
          </div>
          <div className="bento-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Building2 size={20} className="text-blue-600" />
              <Label>Employers</Label>
            </div>
            <p className="text-3xl font-black text-slate-950 dark:text-white">{stats.employerCount}</p>
          </div>
          <div className="bento-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={20} className="text-blue-600" />
              <Label>Active Jobs</Label>
            </div>
            <p className="text-3xl font-black text-slate-950 dark:text-white">{stats.jobCount}</p>
          </div>
          <div className="bento-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-blue-600" />
              <Label>Applications</Label>
            </div>
            <p className="text-3xl font-black text-slate-950 dark:text-white">{stats.applicationCount}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
          {['overview', 'users', 'employers', 'jobs', 'applications'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
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
          <div className="bento-card p-8">
            <h3 className="text-xl font-black text-slate-950 dark:text-white mb-4">System Overview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Recent Activity</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stats.applicationCount} total applications • {stats.userCount} registered applicants
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Link to="/browse" className="text-blue-600 text-sm hover:underline">View Jobs</Link>
                  <Link to="/employers" className="text-blue-600 text-sm hover:underline">View Employers</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            {users.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <Users size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No registered applicants</p>
              </div>
            ) : (
              users.map(u => (
                <div key={u.id} className="bento-card p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">{u.full_name}</h4>
                    <p className="text-sm text-slate-500">{u.email} • {u.barangay}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'employers' && (
          <div className="space-y-4">
            {employers.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <Building2 size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No registered employers</p>
              </div>
            ) : (
              employers.map(e => (
                <div key={e.id} className="bento-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">{e.company_name}</h4>
                    <p className="text-sm text-slate-500">{e.email} • {e.industry}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      e.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      e.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {e.status}
                    </span>
                    {e.status === 'pending' && (
                      <>
                        <button onClick={() => handleEmployerStatus(e.id, 'approved')} className="text-emerald-600 hover:text-emerald-700">
                          <Check size={18} />
                        </button>
                        <button onClick={() => handleEmployerStatus(e.id, 'rejected')} className="text-red-600 hover:text-red-700">
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <Briefcase size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No posted jobs</p>
              </div>
            ) : (
              jobs.map(j => (
                <div key={j.id} className="bento-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">{j.title}</h4>
                    <p className="text-sm text-slate-500">{j.company} • {j.type} • {j.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      j.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {j.status}
                    </span>
                    <button onClick={() => handleJobDelete(j.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No applications</p>
              </div>
            ) : (
              applications.map(a => (
                <div key={a.id} className="bento-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">{a.full_name}</h4>
                    <p className="text-sm text-slate-500">Applied for: {a.title} at {a.company}</p>
                    <p className="text-xs text-slate-400">{a.email} • {a.barangay}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      a.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      a.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {a.status}
                    </span>
                    {a.status === 'pending' && (
                      <>
                        <button onClick={() => handleApplicationStatus(a.id, 'accepted')} className="text-emerald-600 hover:text-emerald-700">
                          <Check size={18} />
                        </button>
                        <button onClick={() => handleApplicationStatus(a.id, 'rejected')} className="text-red-600 hover:text-red-700">
                          <X size={18} />
                        </button>
                      </>
                    )}
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