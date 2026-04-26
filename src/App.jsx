import { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Search,
  Briefcase,
  User,
  MapPin,
  ChevronRight,
  CheckCircle,
  Clock,
  LayoutDashboard,
  Building2,
  GraduationCap,
  Globe,
  ArrowRight,
  TrendingUp,
  Award,
  Sun,
  Moon,
} from "lucide-react";
import { JOBS_DATA, BARANGAYS, JOB_TYPES } from "./mockData";
import municipalHallImg from "./assets/municipal_hall.png";

// --- Reusable Page Header Component ---
const PageHeader = ({ title, subtitle, badge }) => (
  <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">
    <img
      src={municipalHallImg}
      alt="Sta. Maria Municipal Hall"
      className="w-full h-full object-cover transition-all duration-1000 scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 mt-4">
      {badge && (
        <div className="inline-flex items-center gap-2 bg-brand-yellow text-brand-blue px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-8 shadow-2xl animate-fade-in group">
          {badge}
        </div>
      )}
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-[calc(-0.04em)] drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] leading-[1.05] max-w-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-8 text-white/90 font-semibold text-xl md:text-2xl max-w-3xl leading-[1.6] drop-shadow-lg">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

// --- Navbar Component (Professional) ---
const Navbar = ({ user, darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`glass-nav border-b transition-all duration-300 ${isScrolled ? "h-14 shadow-lg backdrop-blur-xl bg-[var(--nav-bg)]" : "h-16"}`}
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center font-black text-brand-yellow group-hover:rotate-6 transition-transform">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tighter text-slate-800 dark:text-slate-100 uppercase">
                JobLinked
              </span>
              <span className="text-[10px] font-bold text-brand-blue tracking-[0.2em] -mt-0.5 whitespace-nowrap">
                STA. MARIA
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/for-employees"
              className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-brand-blue uppercase tracking-widest transition-colors"
            >
              For Employees
            </Link>
            <Link
              to="/jobs"
              className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-brand-blue uppercase tracking-widest transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/for-employers"
              className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-brand-blue uppercase tracking-widest transition-colors"
            >
              For Employers
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400 group active:scale-90"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun
                size={20}
                className="text-brand-yellow drop-shadow-[0_0_8px_rgba(252,209,22,0.4)]"
              />
            ) : (
              <Moon
                size={20}
                className="text-slate-600 group-hover:text-brand-blue"
              />
            )}
          </button>

          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <User size={18} className="text-brand-blue" />
              <span className="hidden sm:inline">My account</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 text-sm hover:text-brand-blue transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/login"
                className="bg-brand-blue text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-brand-blue-light transition-all shadow-md shadow-brand-blue/20"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Home Hero (High-End Professional) ---
const Home = () => (
  <div className="flex flex-col">
    {/* Top Banner Header (Horizontal Alignment) */}
    <div className="relative w-full h-[400px] md:h-[650px] overflow-hidden">
      <img
        src={municipalHallImg}
        alt="Sta. Maria Municipal Hall"
        className="w-full h-full object-cover transition-all duration-1000 scale-[1.02]"
      />
      {/* Dynamic Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

      {/* Horizontal Alignment Layer */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 z-20">
        <div className="max-w-[1400px] w-full bg-slate-900/30 backdrop-blur-2xl border border-white/20 rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.6)] animate-fade-in flex flex-col items-center">
          <div className="bg-brand-blue/90 text-white px-8 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-md border border-white/20 mb-12 group transition-all hover:translate-y-[-2px]">
            <MapPin
              size={24}
              className="text-brand-yellow group-hover:scale-110 transition-transform"
            />
            <span className="text-xs md:text-sm font-black tracking-[0.3em] uppercase">
              Poblacion, Sta. Maria, Bulacan
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-[calc(-0.05em)] mb-10 drop-shadow-2xl text-shadow-lg leading-[1.02] max-w-5xl">
            Empowering the <br className="hidden md:block" />{" "}
            <span className="text-brand-yellow">Sta. Maria</span> Workforce
          </h1>

          <p className="text-slate-100 font-bold text-lg md:text-2xl lg:text-3xl max-w-4xl leading-[1.6] text-shadow-lg">
            Your official secure gateway to local jobs, state scholarships, and
            certified professional development programs.
          </p>
        </div>
      </div>
    </div>

    {/* Professional Branding Section (Left Aligned Two-Column) */}
    <section className="section-spacer relative overflow-hidden bg-white dark:bg-slate-900/40">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/[0.03] dark:bg-brand-blue/[0.07] rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-left">
            <div className="inline-flex items-center gap-3 bg-brand-blue/5 dark:bg-brand-blue/20 text-brand-blue dark:text-sky-400 px-6 py-2 rounded-xl text-[12px] font-black uppercase tracking-[0.3em] border border-brand-blue/10">
              <TrendingUp size={18} /> Established 1910
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0a123a] dark:text-white leading-[1.1] tracking-tighter">
              Elevating the workforce of <br />
              <span className="text-brand-blue dark:text-sky-400">
                Sta. Maria, Bulacan
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed max-w-2xl">
              As the town's official employment gateway, we provide seamless
              connections between local talent and premier industrial
              opportunities. Our mission is sustainable career growth for every
              resident.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link
                to="/jobs"
                className="w-full sm:w-auto bg-[#0038A8] text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-brand-blue-light hover:scale-105 shadow-2xl shadow-brand-blue/30 transition-all active:scale-95"
              >
                Start Career Path <ArrowRight size={22} />
              </Link>

              <div className="flex items-center gap-5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-lg"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?u=${idx + 20}`}
                        alt="User"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-left leading-tight pr-4">
                  <p className="text-lg font-black text-[#0a123a] dark:text-white tracking-tight">
                    2.4k+
                  </p>
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Active Seekers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Graphic Side */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden group">
              <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-8">
                <div className="flex justify-between items-center px-4">
                  <h4 className="font-black text-[#0a123a] dark:text-white text-lg">
                    Industry Distribution
                  </h4>
                  <div className="w-10 h-10 bg-brand-blue text-white rounded-xl flex items-center justify-center font-black">
                    84%
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      label: "Manufacturing",
                      val: "78%",
                      color: "bg-blue-600",
                    },
                    { label: "Agriculture", val: "62%", color: "bg-green-500" },
                    { label: "Services", val: "45%", color: "bg-purple-500" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2 px-4">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <span>{stat.label}</span>
                        <span>{stat.val}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stat.color} rounded-full transition-all duration-1000`}
                          style={{ width: stat.val }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-brand-blue animate-pulse">
                    <TrendingUp size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-brand-blue uppercase tracking-widest">
                      Growth Forecast
                    </p>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      Sustainable economic expansion project for 2024-2030.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -inset-4 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-[4rem] blur-2xl -z-10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>

    {/* Categories Breakdown */}
    <section className="section-spacer max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
            Browse by Sector
          </h2>
          <p className="text-slate-700 dark:text-slate-400 font-bold text-lg max-w-md leading-relaxed">
            Identify the industry that aligns with your specialized vocational
            skills and career trajectory.
          </p>
        </div>
        <Link
          to="/jobs"
          className="text-brand-blue dark:text-sky-400 font-black text-lg flex items-center gap-2 hover:translate-x-2 transition-all group underline-offset-[12px] decoration-4"
        >
          View all categories
          <ArrowRight
            size={24}
            className="group-hover:translate-x-2 transition-all"
          />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Corporate & Professional",
            count: 4,
            icon: <Building2 size={24} />,
            color: "bg-blue-50 dark:bg-blue-900/20 text-brand-blue",
          },
          {
            title: "Skilled Labor & Trades",
            count: 12,
            icon: <Briefcase size={24} />,
            color:
              "bg-yellow-50 dark:bg-yellow-900/20 text-amber-600 dark:text-brand-yellow",
          },
          {
            title: "Student Internships",
            count: 8,
            icon: <GraduationCap size={24} />,
            color:
              "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
          },
        ].map((cat, i) => (
          <div
            key={i}
            className="job-card group cursor-pointer hover:border-brand-blue/30"
          >
            <div
              className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}
            >
              {cat.icon}
            </div>
            <h4 className="text-xl font-black text-slate-950 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
              {cat.title}
            </h4>
            <p className="text-slate-700 dark:text-slate-400 font-bold text-sm mb-6 leading-relaxed">
              {cat.count} curated positions
            </p>
            <div className="flex items-center gap-2 text-brand-blue font-black text-[13px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
              Explore Now <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* --- Jobs Component (JobStreet Style Table/List) --- */}
    <section className="py-20 max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="section-title">Featured Job Listings</h2>
          <p className="section-desc max-w-md">
            Discover the latest and most sought-after positions in Sta. Maria.
          </p>
        </div>
        <Link
          to="/jobs"
          className="text-brand-blue font-black flex items-center gap-2 hover:translate-x-1 transition-transform group underline-offset-8 decoration-2"
        >
          View all job listings{" "}
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {JOBS_DATA.slice(0, 4).map((job, i) => (
          <div
            key={job.id}
            className="job-card stagger-item group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Building2 className="text-brand-blue opacity-80" size={30} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {job.type}
                  </span>
                  <span className="badge bg-brand-blue/5 text-brand-blue">
                    {job.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-brand-blue transition-colors leading-tight">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-slate-600 dark:text-slate-300 py-1">
                  <span className="text-brand-blue font-black flex items-center gap-1.5 bg-brand-blue/5 px-2 py-1 rounded-md">
                    <Briefcase size={16} /> {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {job.location}
                  </span>
                  <span className="text-green-700 dark:text-green-400 font-black">
                    {job.salary}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-400 font-bold line-clamp-2 mt-4 leading-[1.6]">
                  {job.description}
                </p>
              </div>
              <div className="flex md:flex-col justify-between items-end gap-4 shrink-0">
                <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    2 Days Ago
                  </span>
                </div>
                <button className="px-10 py-4 rounded-xl font-black text-sm bg-brand-blue text-white hover:bg-brand-blue-light transition-all shadow-xl shadow-brand-blue/20 active:scale-95">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// --- Jobs Component (JobStreet Style Table/List) ---
const Jobs = ({ appliedJobs, setAppliedJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBarangay = selectedBarangay
        ? job.location.includes(selectedBarangay)
        : true;
      const matchesType = selectedType ? job.type === selectedType : true;
      return matchesSearch && matchesBarangay && matchesType;
    });
  }, [searchTerm, selectedBarangay, selectedType]);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert("Application successfully submitted to the employer.");
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Find Your Next Opportunity"
        subtitle="Browse through hundreds of local listings in Santa Maria."
        badge="Live Vacancies"
      />

      <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 py-20 w-full flex flex-col gap-10">
        {/* Search Bar */}
        <div className="relative z-10 -mt-32 md:-mt-40">
          <div className="search-container">
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative group">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors"
                />
                <input
                  type="text"
                  placeholder="Job title or keywords..."
                  className="w-full pl-12 pr-4 py-4 md:py-5 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 font-semibold placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden md:block self-center" />
              <div className="flex-1 relative group">
                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-blue transition-colors"
                />
                <select
                  className="w-full pl-12 pr-10 py-4 md:py-5 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 font-semibold appearance-none cursor-pointer"
                  value={selectedBarangay}
                  onChange={(e) => setSelectedBarangay(e.target.value)}
                >
                  <option
                    value=""
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  >
                    All Sta. Maria Barangays
                  </option>
                  {BARANGAYS.map((b) => (
                    <option
                      key={b}
                      value={b}
                      className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    >
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="bg-brand-blue text-white px-10 py-4 md:py-5 rounded-2xl font-black hover:bg-brand-blue-light transition-all shadow-lg active:scale-95">
              Refine Search
            </button>
          </div>
        </div>

        {/* Main Jobs Layout */}
        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          {/* Ad/Highlight Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6 sticky top-24 self-start">
            <div className="bg-brand-blue p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h4 className="font-black text-xl mb-4 relative z-10">
                TUPAD Program
              </h4>
              <p className="text-sm opacity-90 mb-6 leading-relaxed relative z-10 font-medium">
                Emergency employment for displaced workers in Bulacan. Limited
                slots available.
              </p>
              <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl text-sm font-black transition-all border border-white/30 relative z-10">
                Apply for TUPAD
              </button>
            </div>

            <div className="glass-card !p-6 !rounded-2xl border-slate-200 dark:border-slate-800">
              <h4 className="font-black text-slate-900 dark:text-slate-100 mb-4 text-sm uppercase tracking-widest">
                Job Type
              </h4>
              <div className="space-y-3">
                {JOB_TYPES.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="jobType"
                      className="w-4 h-4 text-brand-blue focus:ring-brand-blue border-slate-300"
                      onChange={() =>
                        setSelectedType(t === selectedType ? "" : t)
                      }
                      checked={selectedType === t}
                    />
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-brand-blue transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <div className="flex-1 space-y-5">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  {filteredJobs.length} Positions Available
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                Sort:{" "}
                <span className="text-brand-blue cursor-pointer hover:underline">
                  Newest First
                </span>
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => (
                <div
                  key={job.id}
                  className="job-card stagger-item group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Building2
                        className="text-brand-blue opacity-80"
                        size={30}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {job.type}
                        </span>
                        <span className="badge bg-brand-blue/5 text-brand-blue">
                          {job.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-brand-blue transition-colors leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500 dark:text-slate-400 py-1">
                        <span className="text-brand-blue font-black flex items-center gap-1.5">
                          <Briefcase size={16} /> {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={16} /> {job.location}
                        </span>
                        <span className="text-green-600 dark:text-green-400">
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-400 font-medium line-clamp-2 mt-4 leading-[1.6]">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex md:flex-col justify-between items-end gap-4 shrink-0">
                      <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          2 Days Ago
                        </span>
                      </div>
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                        className={`px-10 py-4 rounded-xl font-black transition-all text-sm shadow-xl active:scale-95 ${
                          appliedJobs.includes(job.id)
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-brand-blue text-white hover:bg-brand-blue-light shadow-brand-blue/20"
                        }`}
                      >
                        {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center glass-card">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
                  No matching jobs found
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Try adjusting your filters or search keywords to see more
                  results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Login Component (Minimal Professional) ---
const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: "Juan Dela Cruz", role: "Applicant" });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-[500px] mx-auto py-20 px-4">
      <div className="bg-surface rounded-[40px] shadow-premium border border-slate-200/50 dark:border-slate-800 overflow-hidden transition-all duration-500">
        {/* Top Image Banner */}
        <div className="h-[220px] relative">
          <img
            src={municipalHallImg}
            alt="Sta. Maria Municipal Hall"
            className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-black/20" />
          <div className="absolute bottom-6 left-8">
            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex items-center justify-center font-black text-brand-blue text-xl border border-white/20">
              <Briefcase size={28} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 lg:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-4">
              {isLogin ? "Welcome Back" : "Join the Portal"}
            </h2>
            <p className="section-desc">
              {isLogin
                ? "Secure access to your official dashboard"
                : "Create your verified applicant profile"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1 mb-2 block">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  placeholder="Juan Dela Cruz"
                  required
                  className="w-full p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-brand-blue dark:focus:border-brand-blue text-sm font-semibold transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            )}
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1 mb-2 block">
                Official Email
              </label>
              <input
                type="email"
                placeholder="name@example.gov.ph"
                required
                className="w-full p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-brand-blue dark:focus:border-brand-blue text-sm font-semibold transition-all text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1 block">
                  Protected Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 outline-none focus:border-brand-blue dark:focus:border-brand-blue text-sm font-semibold transition-all text-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue text-white p-5 rounded-2xl font-black shadow-xl shadow-brand-blue/20 hover:bg-brand-blue-light hover:-translate-y-1 active:translate-y-0 transition-all mt-6"
            >
              Authenticate & {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm font-bold text-slate-400">
              {isLogin ? "New applicant?" : "Already registered?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brand-blue hover:underline underline-offset-4"
              >
                {isLogin ? "Create an account" : "Log in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component (Executive Personal View) ---
const Dashboard = ({ user, appliedJobs }) => {
  const applications = useMemo(() => {
    return JOBS_DATA.filter((job) => appliedJobs.includes(job.id));
  }, [appliedJobs]);

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-brand-blue/20">
            JD
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Howdy, {user?.name?.split(" ")[0] || "Juan"}!
            </h1>
            <p className="section-desc mt-1">
              Local Resident Applicant •{" "}
              <span className="text-brand-blue font-black">
                Sta. Maria Citizen
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface border border-slate-200 dark:border-slate-700 px-8 py-3 rounded-2xl text-sm font-black text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Edit Profile
          </button>
          <button className="bg-brand-yellow text-brand-blue px-8 py-3 rounded-2xl text-sm font-black hover:brightness-105 active:scale-95 transition-all shadow-lg">
            View Resume
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: "Active Applications",
            value: appliedJobs.length,
            icon: <LayoutDashboard size={20} />,
            color: "text-brand-blue",
          },
          {
            label: "Profile Views",
            value: 142,
            icon: <Globe size={20} />,
            color: "text-green-600",
          },
          {
            label: "Screening Status",
            value: "Pending",
            icon: <CheckCircle size={20} />,
            color: "text-amber-500",
          },
          {
            label: "Shortlisted",
            value: 0,
            icon: <Award size={20} />,
            color: "text-brand-blue",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm"
          >
            <div
              className={`w-10 h-10 ${stat.color} bg-slate-50 rounded-xl flex items-center justify-center mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">
              {stat.value}
            </h4>
          </div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              Recent Activity{" "}
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </h3>
            <div className="space-y-0">
              {applications.length > 0 ? (
                applications.map((app, idx) => (
                  <div
                    key={app.id}
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 ${idx !== applications.length - 1 ? "border-b border-slate-50" : ""}`}
                  >
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-800 text-base">
                        {app.title}
                      </h4>
                      <p className="text-xs font-bold text-brand-blue flex items-center gap-2">
                        {app.company} <span className="text-slate-300">•</span>{" "}
                        <span className="text-slate-400">{app.location}</span>
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          Application Status
                        </p>
                        <span className="badge bg-amber-50 text-amber-600 border border-amber-100 tracking-normal px-3">
                          Under Municipal Review
                        </span>
                      </div>
                      <button className="p-2.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase size={24} className="opacity-20" />
                  </div>
                  <p className="text-sm font-semibold italic">
                    You haven't applied to any jobs yet.
                  </p>
                  <Link
                    to="/jobs"
                    className="inline-block bg-brand-blue/5 text-brand-blue px-6 py-2 rounded-xl text-sm font-bold"
                  >
                    Start Searching
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-80 shrink-0 space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">
              Recommended for your skills
            </h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed relative z-10">
              Companies in <b>Caypombo</b> and <b>Poblacion</b> are looking for
              residents with your profile.
            </p>
            <button className="w-full bg-brand-blue text-white py-3 rounded-xl text-sm font-extrabold hover:bg-brand-blue-light transition-all shadow-lg shadow-brand-blue/20">
              Upgrade Profile
            </button>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
            <h4 className="text-slate-800 font-extrabold mb-4">
              Municipality Updates
            </h4>
            <ul className="space-y-4">
              {[
                "SPES Slots for Summer 2026 are now open.",
                "New Industrial Hub opening in Pulong Buhangin.",
                "JobLinked Orientation this Friday 9AM.",
              ].map((update, i) => (
                <li key={i} className="flex gap-3 items-start group">
                  <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {update}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- For Employees Page (Resource Center) ---
const ForEmployees = () => {
  const resources = [
    {
      title: "Career Development",
      description:
        "Tools to sharpen your competitive edge in the Sta. Maria labor market.",
      items: [
        {
          label: "JobLinked CV Builder",
          desc: "Templates optimized for local HR systems.",
          icon: <User size={18} />,
        },
        {
          label: "Interview Masterclass",
          desc: "Sta. Maria common interview questions & prep.",
          icon: <CheckCircle size={18} />,
        },
        {
          label: "TESDA Certification",
          desc: "Guide to NC II/III courses in Bulacan.",
          icon: <Award size={18} />,
        },
      ],
    },
    {
      title: "Government Programs",
      description:
        "Direct access to social safety nets and youth employment programs.",
      items: [
        {
          label: "TUPAD Orientation",
          desc: "10-day emergency work guidelines & docs.",
          icon: <Clock size={18} />,
        },
        {
          label: "SPES/GIP Application",
          desc: "Checklist for summer internships & GIP.",
          icon: <GraduationCap size={18} />,
        },
        {
          label: "Livelihood Assistance",
          desc: "DOLE grants for small business starts.",
          icon: <TrendingUp size={18} />,
        },
      ],
    },
    {
      title: "Labor Rights & Welfare",
      description:
        "Everything you need to know about your benefits as a local worker.",
      items: [
        {
          label: "Minimum Wage Update",
          desc: "Current daily rates for Region III.",
          icon: <Globe size={18} />,
        },
        {
          label: "Benefits Explorer",
          desc: "Guide to SSS, PhilHealth, & Pag-IBIG.",
          icon: <Building2 size={18} />,
        },
        {
          label: "Labor Relations",
          desc: "How to seek mediation at Municipal Hall.",
          icon: <Briefcase size={18} />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Empowering Every Worker"
        subtitle="Access vetted government resources and local professional tools."
        badge="Resource Center"
      />

      <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 pt-24 pb-32 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-8">
              <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-[15px] text-slate-700 dark:text-slate-400 font-medium leading-[1.6]">
                  {section.description}
                </p>
              </div>
              <div className="space-y-5">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="job-card group cursor-pointer hover:border-brand-blue/30 scale-[1.01] hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-brand-blue rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-slate-100 text-[15px] group-hover:text-brand-blue transition-colors">
                          {item.label}
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-400 mt-1.5 font-medium leading-[1.6]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-brand-blue rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black mb-3">
                Need personalized assistance?
              </h4>
              <p className="text-brand-blue-light font-bold text-sm bg-white px-4 py-1.5 rounded-full inline-block mb-4">
                Municipal Hall Lobby • Mon - Fri 8AM - 5PM
              </p>
              <p className="text-slate-200 max-w-md font-medium leading-relaxed">
                Visit our Career Hub in person for one-on-one resume reviews,
                labor consultations, and free internet access for job hunting.
              </p>
            </div>
            <button className="bg-brand-yellow text-brand-blue hover:brightness-105 active:scale-95 px-8 py-4 rounded-xl font-black shadow-xl shadow-black/10 transition-all">
              Connect with a Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- For Employers Page (Business Portal) ---
const ForEmployers = () => {
  const resources = [
    {
      title: "Talent Acquisition",
      description:
        "Direct access to Sta. Maria's most qualified local talent pool.",
      items: [
        {
          label: "Post a Vacancy",
          desc: "Submit job openings to the JobLinked database.",
          icon: <Briefcase size={18} />,
        },
        {
          label: "Candidate Shortlisting",
          desc: "Request pre-screened resumes from our pool.",
          icon: <User size={18} />,
        },
        {
          label: "Mass Hiring Support",
          desc: "Organize recruitment days at Municipal Hall.",
          icon: <Building2 size={18} />,
        },
      ],
    },
    {
      title: "Partnership Programs",
      description: "Level up your business through municipal collaboration.",
      items: [
        {
          label: "Join JobLinked Partners",
          desc: "Priority placement in job fairs & pre-screening.",
          icon: <Award size={18} />,
        },
        {
          label: "Job Fair Calendar",
          desc: "Register for upcoming recruitment events.",
          icon: <TrendingUp size={18} />,
        },
        {
          label: "Skills Training",
          desc: "Partner for specialized 'Build-to-Hire' programs.",
          icon: <GraduationCap size={18} />,
        },
      ],
    },
    {
      title: "Regulatory & Compliance",
      description:
        "Guides ensuring your business follows local labor standards.",
      items: [
        {
          label: "Labor Standards Guide",
          desc: "Region III wage and benefit compliance.",
          icon: <CheckCircle size={18} />,
        },
        {
          label: "Hiring Incentives",
          desc: "Local hiring tax credit information.",
          icon: <Globe size={18} />,
        },
        {
          label: "Employer Accreditation",
          desc: "Get vetted as a Trusted Local Employer.",
          icon: <MapPin size={18} />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Partner with Sta. Maria"
        subtitle="We bridge the gap between local enterprise and local talent."
        badge="Employer Portal"
      />

      <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20 pt-24 pb-32 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-8">
              <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-[15px] text-slate-700 dark:text-slate-400 font-medium leading-[1.6]">
                  {section.description}
                </p>
              </div>
              <div className="space-y-5">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="job-card group cursor-pointer hover:border-brand-blue/30 scale-[1.01] hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm text-slate-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-slate-100 text-[15px] group-hover:text-brand-blue transition-colors">
                          {item.label}
                        </h4>
                        <p className="text-sm text-slate-700 dark:text-slate-400 mt-1.5 font-medium leading-[1.6]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black mb-3 text-brand-yellow">
                Is your company new to Sta. Maria?
              </h4>
              <p className="text-slate-400 max-w-md font-medium leading-relaxed">
                Schedule a free consultation with our JobLinked Manager to learn
                about municipal incentives for pioneering companies and
                industrial hub openings.
              </p>
            </div>
            <button className="bg-brand-blue text-white hover:bg-brand-blue-light active:scale-95 px-8 py-4 rounded-xl font-black transition-all">
              Get Accredited Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Component ---
function App() {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    const theme = newDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <Router>
      <div className="ambient-orbs">
        <div className="orb-1" />
        <div className="orb-2" />
      </div>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--text-primary)] transition-colors duration-500">
        <Navbar
          user={user}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/jobs"
              element={
                <Jobs
                  appliedJobs={appliedJobs}
                  setAppliedJobs={setAppliedJobs}
                />
              }
            />
            <Route path="/for-employees" element={<ForEmployees />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={<Dashboard user={user} appliedJobs={appliedJobs} />}
            />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-24 pb-12 mt-20 transition-all duration-500">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 xl:px-20">
            <div className="grid md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-1 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-black text-brand-yellow shadow-lg shadow-brand-blue/20">
                    <Briefcase size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-xl font-black tracking-tighter text-slate-950 dark:text-white uppercase">
                      JobLinked
                    </span>
                    <span className="text-[11px] font-black text-brand-blue tracking-[0.25em] -mt-0.5 whitespace-nowrap">
                      STA. MARIA
                    </span>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                  Connecting every local resident to sustainable careers and
                  official government employment programs since 1910.
                </p>
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center hover:scale-105 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-brand-blue/20"
                    >
                      <Globe size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-10">
                  Quick Access
                </h6>
                <ul className="space-y-6 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <li>
                    <Link
                      to="/jobs"
                      className="hover:text-brand-blue transition-colors underline-offset-4 hover:underline"
                    >
                      Browse All Vacancies
                    </Link>
                  </li>
                  <li className="hover:text-brand-blue cursor-pointer transition-colors underline-offset-4 hover:underline">
                    TUPAD Program
                  </li>
                  <li className="hover:text-brand-blue cursor-pointer transition-colors underline-offset-4 hover:underline">
                    Scholarships
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-10">
                  Institutional
                </h6>
                <ul className="space-y-6 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <li>
                    <Link
                      to="/for-employers"
                      className="hover:text-brand-blue transition-colors underline-offset-4 hover:underline"
                    >
                      Employer Portal
                    </Link>
                  </li>
                  <li className="hover:text-brand-blue cursor-pointer transition-colors underline-offset-4 hover:underline">
                    LGU Portal
                  </li>
                  <li className="hover:text-brand-blue cursor-pointer transition-colors underline-offset-4 hover:underline">
                    Partner with JobLinked
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-10">
                  Contact Hub
                </h6>
                <div className="space-y-6 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-4">
                    <MapPin
                      size={22}
                      className="text-brand-blue shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed">
                      Ground Floor, Municipal Hall,
                      <br /> Poblacion, Sta. Maria, Bulacan
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={22} className="text-brand-blue shrink-0" />
                    <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-[12px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                © 2024 JobLinked Sta. Maria. Official Government Portal.
              </p>
              <div className="flex gap-10 text-[12px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <span className="hover:text-brand-blue cursor-pointer transition-colors">
                  Privacy
                </span>
                <span className="hover:text-brand-blue cursor-pointer transition-colors">
                  Terms
                </span>
                <span className="hover:text-brand-blue cursor-pointer transition-colors">
                  Accessibility
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
