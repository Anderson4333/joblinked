import { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Search,
  Briefcase,
  MapPin,
  ChevronRight,
  ArrowRight,
  Zap,
  Globe,
  BarChart,
  ShieldCheck,
  Sun,
  Moon,
  LogOut,
  Layers,
  Cpu,
  Activity,
  ArrowUpRight,
  PieChart,
  Building2,
} from "lucide-react";
import { JOBS_DATA, BARANGAYS, JOB_TYPES } from "./mockData";
import municipalHallImg from "./assets/municipal_hall.png";

// --- Custom Hooks ---
const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrolled;
};

// --- Reusable Industrial Components ---
const Label = ({ children, icon: Icon, className = "" }) => (
  <div
    className={`flex items-center gap-2 industrial-label text-slate-500 dark:text-slate-400 ${className}`}
  >
    {Icon && <Icon size={14} className="text-blue-600 dark:text-blue-500" />}
    <span>{children}</span>
  </div>
);

const IconButton = ({ icon: onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg border transition-all ${
      active
        ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
        : "bg-transparent text-slate-600 border-slate-200 hover:border-slate-400 dark:text-slate-400 dark:border-slate-800 dark:hover:border-slate-600"
    }`}
  >
    <Icon size={16} />
  </button>
);

// --- Minimal Navbar ---
const Navbar = ({ user, setUser, darkMode, toggleDarkMode }) => {
  const scrolled = useScroll();
  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "glass-nav py-3" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-slate-950 dark:bg-white rounded flex items-center justify-center transition-transform group-hover:scale-105">
            <Layers size={16} className="text-white dark:text-slate-950" />
          </div>
          <span className="industrial-heading text-xl text-slate-950 dark:text-white tracking-tight">
            JOBLINKED<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Sectors", "Employers"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <IconButton icon={darkMode ? Sun : Moon} onClick={toggleDarkMode} />

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-sm font-semibold hover:text-blue-600 transition-colors"
              >
                {user.name.split(" ")[0]}
              </Link>
              <IconButton
                icon={LogOut}
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-shimmer bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-sm font-semibold px-5 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-all"
            >
              Access Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Industrial Home / Landing ---
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-grid-pattern min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-16 space-y-6">
          <Label icon={Activity}>System Status: Optimal</Label>
          <h1 className="industrial-heading text-6xl md:text-8xl lg:text-[100px] text-slate-950 dark:text-white text-gradient gradient-dark">
            Santa Maria's <br /> Engine for Growth.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
            The infrastructure connecting local talent with industrial scale
            opportunities. Streamlined, verified, and built for the modern
            workforce.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Main Visual/Data Card */}
          <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 aspect-[4/3] md:aspect-auto md:h-[400px] group">
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
              <img
                src={municipalHallImg}
                alt="Municipal Hall"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay animate-slow-pan grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
            </div>
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-md text-white text-xs font-mono flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  LIVE INFRASTRUCTURE
                </div>
                <Globe className="text-white/30" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-2">
                  Centralized Talent Hub
                </h3>
                <p className="text-slate-400 font-medium max-w-sm">
                  Direct integration with 24 barangay registries and 120+ local
                  enterprises.
                </p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bento-card col-span-1 p-8 flex flex-col justify-between !bg-blue-600 border-none shadow-xl shadow-blue-900/20">
            <div className="space-y-4">
              <Cpu className="text-white/60" size={32} />
              <h3 className="text-3xl font-black text-white tracking-tight leading-none">
                Deploy Your <br /> Career.
              </h3>
              <p className="text-blue-50/80 text-sm font-medium leading-relaxed">
                Access the live database of local vacancies and government
                programs.
              </p>
            </div>
            <button
              onClick={() => navigate("/browse")}
              className="mt-8 w-full bg-white text-blue-700 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95"
            >
              Initialize Search <ArrowRight size={18} />
            </button>
          </div>

          {/* Metric Cards */}
          <div className="bento-card col-span-1 p-8 flex flex-col justify-between hover:border-blue-600/30">
            <div>
              <Label className="mb-1 text-blue-600">Metric Output</Label>
              <h4 className="industrial-label text-slate-400">
                Placement Rate
              </h4>
            </div>
            <div className="py-6">
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">
                  94
                </span>
                <span className="text-2xl font-bold text-blue-600">%</span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed uppercase tracking-wider">
                Verified deployments <br /> Q3 2024 fiscal year.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                ↑ 2.4% from Q2
              </span>
            </div>
          </div>

          <div className="bento-card col-span-1 md:col-span-2 p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-8">
              <Label icon={Activity}>Registry Status</Label>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Real-time Data
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Industrial Mfg",
                  count: "342",
                  color: "text-blue-600",
                },
                {
                  title: "Tech & Services",
                  count: "128",
                  color: "text-slate-900 dark:text-white",
                },
                {
                  title: "Gov't Programs",
                  count: "84",
                  color: "text-slate-900 dark:text-white",
                },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-blue-600/20 transition-colors"
                >
                  <p
                    className={`text-3xl font-black ${stat.color} tracking-tighter`}
                  >
                    {stat.count}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mt-2 leading-tight">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Ticker */}
          <div className="bento-card col-span-1 md:col-span-4 lg:col-span-2 p-8 flex items-center overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
            <div className="flex items-center gap-16 whitespace-nowrap animate-ticker font-black text-xl tracking-tighter text-slate-300 dark:text-slate-700">
              <span className="hover:text-blue-600/50 transition-colors">
                WALTERMART
              </span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="hover:text-blue-600/50 transition-colors">
                PUREGOLD
              </span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="hover:text-blue-600/50 transition-colors">
                BULACAN METAL
              </span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="hover:text-blue-600/50 transition-colors">
                STA MARIA DEV
              </span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="hover:text-blue-600/50 transition-colors">
                GLOBAL LOGISTICS
              </span>
              <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="hover:text-blue-600/50 transition-colors">
                WALTERMART
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Jobs / Browse (Industrial Style) ---
const Browse = () => {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    return JOBS_DATA.filter(
      (j) =>
        (j.title.toLowerCase().includes(term.toLowerCase()) ||
          j.company.toLowerCase().includes(term.toLowerCase())) &&
        (type ? j.type === type : true),
    );
  }, [term, type]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <Label icon={Search} className="mb-4">
              Database Query
            </Label>
            <h1 className="industrial-heading text-4xl text-slate-950 dark:text-white">
              Active Positions.
            </h1>
          </div>

          {/* Clean Search Input */}
          <div className="w-full md:w-96 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search registry..."
              className="w-full bg-transparent border border-slate-300 dark:border-slate-700 rounded-lg py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-blue-600 transition-colors"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Minimal Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <Label className="mb-4">Employment Classification</Label>
              <div className="space-y-2">
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t === type ? "" : t)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      type === t
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* List View */}
          <div className="flex-1">
            <div className="border-t border-slate-200 dark:border-slate-800">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="group py-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors px-4 -mx-4 rounded-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="industrial-label text-blue-600">
                        {job.type}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">
                        •
                      </span>
                      <span className="industrial-label text-slate-500">
                        {job.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} /> {job.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="text-right hidden sm:block">
                      <p className="industrial-label text-slate-400 mb-1">
                        Compensation
                      </p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {job.salary}
                      </p>
                    </div>
                    <button className="w-full md:w-auto bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      Apply <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-20 text-center text-slate-500">
                  <BarChart className="mx-auto mb-4 opacity-20" size={48} />
                  <p className="font-medium">
                    No records found matching query parameters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Login / Auth (Industrial) ---
const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: "Admin User", role: "Applicant" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle top border accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-blue-600" />

        <div className="mb-8">
          <Layers size={32} className="text-slate-950 dark:text-white mb-6" />
          <h2 className="industrial-heading text-3xl text-slate-950 dark:text-white mb-2">
            Authentication.
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Access secured municipal infrastructure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="industrial-label text-slate-500 block">
              Identifier (Email)
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="industrial-label text-slate-500 block">
                Access Key
              </label>
              <span className="industrial-label text-blue-600 cursor-pointer hover:underline">
                Reset
              </span>
            </div>
            <input
              type="password"
              required
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold py-3 rounded-lg mt-4 hover:bg-blue-600 hover:text-white transition-colors"
          >
            Establish Connection
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Minimal Dashboard ---
const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <Label icon={ShieldCheck} className="mb-2">
              Verified Identity
            </Label>
            <h1 className="industrial-heading text-4xl text-slate-950 dark:text-white">
              {user?.name}
            </h1>
          </div>
          <button className="border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            Manage Credentials
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bento-card p-6">
            <Label>Deployment Status</Label>
            <p className="text-2xl font-black text-slate-950 dark:text-white mt-2">
              Active
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-1">
              Ready for placement.
            </p>
          </div>
          <div className="bento-card p-6">
            <Label>Submitted Proposals</Label>
            <p className="text-2xl font-black text-slate-950 dark:text-white mt-2">
              3
            </p>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Pending review.
            </p>
          </div>
          <div className="bento-card p-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950">
            <Label className="!text-slate-400 dark:!text-slate-500">
              System Notice
            </Label>
            <p className="font-bold mt-2">
              TUPAD slot allocation begins next week.
            </p>
            <button className="text-sm font-bold text-blue-400 dark:text-blue-600 mt-4 flex items-center gap-1 hover:underline">
              View Directives <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sectors Page (Job Viewer) ---
const SectorsPage = () => {
  const [activeSector, setActiveSector] = useState("All");

  const sectors = [
    {
      id: "All",
      title: "Global Database",
      icon: Globe,
      count: JOBS_DATA.length,
    },
    {
      id: "Professional",
      title: "Tech & Corporate",
      icon: Cpu,
      count: JOBS_DATA.filter((j) => j.category === "Professional").length,
    },
    {
      id: "Skilled Labor",
      title: "Industrial & Mfg",
      icon: Building2,
      count: JOBS_DATA.filter((j) => j.category === "Skilled Labor").length,
    },
    {
      id: "Student Programs",
      title: "Gov't & Youth",
      icon: ShieldCheck,
      count: JOBS_DATA.filter((j) => j.category === "Student Programs").length,
    },
  ];

  const filteredJobs = useMemo(() => {
    if (activeSector === "All") return JOBS_DATA;
    return JOBS_DATA.filter((j) => j.category === activeSector);
  }, [activeSector]);

  return (
    <div className="bg-grid-pattern min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Label icon={PieChart}>Sector Job Viewer</Label>
          <h1 className="industrial-heading text-5xl md:text-6xl text-slate-950 dark:text-white mt-4 tracking-tighter">
            Registry Access.
          </h1>
          <p className="text-slate-500 font-medium mt-4 max-w-2xl">
            Query live opportunities directly from the municipal database.
            Filter by strategic economic sector.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sector Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-4">
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  activeSector === sec.id
                    ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xl"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-600/30 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                <div className="flex items-center gap-4">
                  <sec.icon
                    size={20}
                    className={activeSector === sec.id ? "" : "text-blue-600"}
                  />
                  <span className="font-black tracking-tight">{sec.title}</span>
                </div>
                <span
                  className={`industrial-label ${activeSector === sec.id ? "text-white/70 dark:text-slate-500" : ""}`}
                >
                  {sec.count}
                </span>
              </button>
            ))}
          </aside>

          {/* Job List */}
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  {sectors.find((s) => s.id === activeSector)?.title} Positions
                </h3>
                <p className="industrial-label text-slate-400 mt-2">
                  Live Query Results
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg industrial-label text-blue-600">
                {filteredJobs.length} Found
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex flex-col md:flex-row gap-6 justify-between items-start md:items-center cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="industrial-label text-blue-600">
                        {job.type}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">
                        •
                      </span>
                      <span className="industrial-label text-slate-500">
                        {job.company}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-950 dark:text-white group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium mt-2 flex items-center gap-2">
                      <MapPin size={14} /> {job.location}
                    </p>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 shrink-0">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {job.salary}
                    </span>
                    <button className="text-sm font-bold text-blue-600 flex items-center gap-1 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Specs <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Employers Page ---
const EmployersPage = () => (
  <div className="bg-grid-pattern min-h-screen pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-4xl mb-16 space-y-6">
        <Label icon={ShieldCheck}>Employer Portal: v4.2</Label>
        <h1 className="industrial-heading text-6xl md:text-8xl text-slate-950 dark:text-white">
          Recruitment <br /> Infrastructure.
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
          Scale your local workforce with precision. Access the verified
          registry of Sta. Maria's talent and streamline your acquisition
          pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Talent Acquisition",
            label: "API Access",
            desc: "Direct integration with our verified applicant database. Filter by skills, barangay, and certification level.",
            icon: Cpu,
          },
          {
            title: "Tax Incentives",
            label: "Economic Zone",
            desc: "Access local municipal tax credits for businesses that prioritize hiring local residents of Sta. Maria.",
            icon: BarChart,
          },
          {
            title: "Mass Hiring",
            label: "Deployment",
            desc: "Request municipal hall support for large-scale recruitment events and job fairs in the plaza.",
            icon: Layers,
          },
        ].map((item, i) => (
          <div key={i} className="bento-card p-8 group">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-blue-600 mb-8 transition-transform group-hover:scale-110">
              <item.icon size={24} />
            </div>
            <Label className="mb-2">{item.label}</Label>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

        <div className="bento-card col-span-1 md:col-span-2 p-10 bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tight">
              Accreditation Process
            </h3>
            <p className="text-slate-400 max-w-md font-medium">
              Is your company registered in Sta. Maria? Initialize your partner
              accreditation to start posting vacancies.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all">
            Begin Onboarding
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Platform Page ---
const PlatformPage = () => (
  <div className="bg-grid-pattern min-h-screen pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-4xl mb-16 space-y-6">
        <Label icon={Cpu}>Core System: JobLinked Architecture</Label>
        <h1 className="industrial-heading text-6xl md:text-8xl text-slate-950 dark:text-white">
          Digital Governance<span className="text-blue-600">.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
          A centralized, high-performance ecosystem designed to streamline the
          economic integration of Sta. Maria, Bulacan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bento-card col-span-1 md:col-span-2 p-10 border-blue-600/20">
          <div className="flex items-start gap-8">
            <div className="hidden sm:flex w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl items-center justify-center text-blue-600">
              <Activity size={40} />
            </div>
            <div className="space-y-4">
              <Label>Real-time Integration</Label>
              <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Barangay Data Link
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                JobLinked connects directly with local barangay registries,
                ensuring every applicant is a verified resident of Sta. Maria.
                This protocol eliminates data redundancy and enhances screening
                security.
              </p>
            </div>
          </div>
        </div>

        <div className="bento-card p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <ShieldCheck size={40} className="text-blue-600" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Data Sovereignty
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              All employment data is hosted on secured local infrastructure,
              compliant with national data privacy standards.
            </p>
          </div>
        </div>

        <div className="bento-card col-span-1 md:col-span-3 p-12 bg-white dark:bg-slate-900 text-center space-y-8">
          <Label className="justify-center">System Evolution</Label>
          <h3 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
            Unified Workforce Monitoring.
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Uptime", val: "99.9%" },
              { label: "Sync Latency", val: "< 50ms" },
              { label: "Encrypted", val: "AES-256" },
              { label: "Active Nodes", val: "24" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <p className="text-2xl font-black text-blue-600">{s.val}</p>
                <p className="industrial-label text-[10px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---
function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light",
    );
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Navbar
        user={user}
        setUser={setUser}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-slate-400" />
            <span className="industrial-heading tracking-tight text-slate-500">
              JOBLINKED.
            </span>
          </div>
          <p className="industrial-label text-slate-400">
            © 2024 LGU STA MARIA. INFRASTRUCTURE ACTIVE.
          </p>
          <p className="industrial-label text-blue-600/50 hover:text-blue-600 transition-colors cursor-crosshair">
            i love sir jays
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
