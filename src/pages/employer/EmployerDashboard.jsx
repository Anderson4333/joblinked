import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, Plus, Users, Briefcase, Trash2, Loader2 } from 'lucide-react';
import { useAuth, api } from '../../context/AuthContext';
import { BARANGAYS, JOB_TYPES, JOB_CATEGORIES } from '../../mockData';

const Label = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 industrial-label text-slate-500 dark:text-slate-400">
    {Icon && <Icon size={14} className="text-blue-600" />}
    <span>{children}</span>
  </div>
);

export default function EmployerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJobApplications, setSelectedJobApplications] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    type: '',
    category: '',
    salary: '',
    description: '',
    requirements: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      navigate('/employers/login');
      return;
    }
    loadJobs();
  }, [user, navigate]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await api.getJobsByEmployer(user.id);
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await api.createJob({
        employerId: user.id,
        title: newJob.title,
        company: user.company_name,
        location: newJob.location,
        type: newJob.type,
        category: newJob.category,
        salary: newJob.salary,
        description: newJob.description,
        requirements: newJob.requirements
      });
      loadJobs();
      setShowJobForm(false);
      setNewJob({
        title: '',
        location: '',
        type: '',
        category: '',
        salary: '',
        description: '',
        requirements: '',
      });
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.deleteJob(jobId);
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const viewApplications = async (jobId) => {
    setSelectedJobApplications(jobId);
    const apps = await api.getApplicationsByJob(jobId);
    setJobApplications(apps);
    setActiveTab('applications');
  };

  if (!user || user.role !== 'employer') {
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
            <Label icon={ShieldCheck} className="mb-2">Employer Dashboard</Label>
            <h1 className="industrial-heading text-4xl text-slate-950 dark:text-white">
              {user.company_name}
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              {user.industry} • {user.address || 'Santa Maria, Bulacan'}
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

        <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => { setActiveTab('jobs'); setSelectedJobApplications(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'jobs' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              activeTab === 'applications' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {selectedJobApplications ? 'Applications' : 'Select a Job'}
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {!showJobForm ? (
              <button
                onClick={() => setShowJobForm(true)}
                className="w-full bento-card p-6 flex items-center justify-center gap-3 hover:border-blue-600/30 transition-all"
              >
                <Plus size={24} className="text-blue-600" />
                <span className="font-bold text-slate-900 dark:text-white">Post New Job</span>
              </button>
            ) : (
              <div className="bento-card p-8">
                <h3 className="text-xl font-black text-slate-950 dark:text-white mb-6">Post New Job</h3>
                <form onSubmit={handleCreateJob} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="industrial-label text-slate-500 block mb-1">Job Title</label>
                      <input
                        type="text"
                        required
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                        placeholder="e.g. Software Developer"
                      />
                    </div>
                    <div>
                      <label className="industrial-label text-slate-500 block mb-1">Job Type</label>
                      <select
                        required
                        value={newJob.type}
                        onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                      >
                        <option value="">Select Type</option>
                        {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="industrial-label text-slate-500 block mb-1">Location</label>
                      <select
                        required
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                      >
                        <option value="">Select Location</option>
                        {BARANGAYS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="industrial-label text-slate-500 block mb-1">Category</label>
                      <select
                        required
                        value={newJob.category}
                        onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                      >
                        <option value="">Select Category</option>
                        {JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="industrial-label text-slate-500 block mb-1">Salary</label>
                      <input
                        type="text"
                        required
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                        placeholder="e.g. ₱25,000 - ₱35,000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="industrial-label text-slate-500 block mb-1">Description</label>
                    <textarea
                      required
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                      placeholder="Job description..."
                    />
                  </div>
                  <div>
                    <label className="industrial-label text-slate-500 block mb-1">Requirements (comma-separated)</label>
                    <input
                      type="text"
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600"
                      placeholder="e.g. BS Degree, 2 years experience"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-500"
                    >
                      Post Job
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="border border-slate-300 dark:border-slate-700 px-6 py-2 rounded-lg font-bold text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="bento-card p-8 text-center">
                  <Briefcase size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 font-medium">No jobs posted yet</p>
                </div>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="bento-card p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="industrial-label text-blue-600">{job.type}</span>
                          <span className="text-slate-300">•</span>
                          <span className="industrial-label text-slate-500">{job.category}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            job.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-950 dark:text-white">{job.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Users size={14} /> {jobApplications.length} applicants</span>
                          <span className="flex items-center gap-1">{job.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewApplications(job.id)}
                          className="text-blue-600 font-bold text-sm hover:underline"
                        >
                          View Applications
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {!selectedJobApplications ? (
              <div className="bento-card p-8 text-center">
                <p className="text-slate-500 font-medium">Select a job to view its applications</p>
              </div>
            ) : jobApplications.length === 0 ? (
              <div className="bento-card p-8 text-center">
                <Users size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <p className="text-slate-500 font-medium">No applications yet</p>
              </div>
            ) : (
              jobApplications.map(app => (
                <div key={app.id} className="bento-card p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-950 dark:text-white">{app.full_name}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                        <span>{app.email}</span>
                        <span>{app.phone}</span>
                        <span>{app.barangay}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
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