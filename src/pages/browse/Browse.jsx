import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, ArrowUpRight, BarChart } from 'lucide-react';
import { JOBS_DATA, JOB_TYPES } from '../../mockData';

const Label = ({ children, icon: Icon, className = "" }) => (
  <div className={`flex items-center gap-2 industrial-label text-slate-500 dark:text-slate-400 ${className}`}>
    {Icon && <Icon size={14} className="text-blue-600" />}
    <span>{children}</span>
  </div>
);

export default function Browse() {
  const [term, setTerm] = useState("");
  const [type, setType] = useState("");

  const filtered = useMemo(() => {
    return JOBS_DATA.filter(
      (j) =>
        (j.title.toLowerCase().includes(term.toLowerCase()) ||
          j.company.toLowerCase().includes(term.toLowerCase())) &&
        (type ? j.type === type : true)
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
                      <span className="text-slate-300 dark:text-slate-700">•</span>
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
}