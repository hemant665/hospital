import React from 'react'
import {
  TrendingUp,
  Users,
  Building2,
  FileCheck,
  Clock,
  Activity,
  CheckCircle,
} from 'lucide-react'

const Dashboard = () => {
  // sample / placeholder data — replace with real data as needed
  const totalHospitals = 6
  const totalPatients = 8
  const labReports = 3
  const aiProcessed = 3

  const metrics = [
    { label: 'Active Hospitals', value: '5' },
    { label: 'Total Beds', value: '2080' },
    { label: 'Service Types', value: '7' },
    { label: 'AI Processing Rate', value: '100%' },
  ]

  const serviceTags = [
    { name: 'ICU', count: 5 },
    { name: 'OPD', count: 6 },
    { name: 'Emergency', count: 5 },
    { name: 'Lab', count: 6 },
    { name: 'Radiology', count: 3 },
    { name: 'Pharmacy', count: 2 },
    { name: 'Surgery', count: 3 },
  ]

  const recentActivity = [
    { type: 'report', title: 'Lab report for "Rahul Sharma"', meta: 'AI Processed', date: 'Dec 13' },
    { type: 'report', title: 'Lab report for "Priya Patel"', meta: 'AI Processed', date: 'Dec 13' },
    { type: 'report', title: 'Lab report for "Amit Kumar"', meta: 'AI Processed', date: 'Dec 13' },
    { type: 'patient', title: 'Patient "Rahul Sharma" registered', meta: 'Apollo Multi-Specialty Hospital', date: 'Dec 13' },
    { type: 'patient', title: 'Patient "Priya Patel" registered', meta: 'Fortis Healthcare', date: 'Dec 13' },
    { type: 'patient', title: 'Patient "Amit Kumar" registered', meta: 'Max Super Speciality', date: 'Dec 13' },
    { type: 'hospital', title: 'Hospital "Apollo Multi-Speciality Hospital" added', meta: 'Mumbai', date: 'Dec 13' },
    { type: 'hospital', title: 'Hospital "Fortis Healthcare" added', meta: 'Delhi', date: 'Dec 13' },
  ]

  const ActivityIcon = ({ type }) => {
    if (type === 'patient') return <Users className="w-4 h-4 text-sky-600" />
    if (type === 'report') return <FileCheck className="w-4 h-4 text-emerald-600" />
    if (type === 'hospital') return <Building2 className="w-4 h-4 text-emerald-600" />
    return <Activity className="w-4 h-4 text-slate-600" />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome to Digiihospital Healthcare Portal</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI Card */}
          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-emerald-50 opacity-70 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Total Hospitals</p>
                <div className="mt-3 text-2xl font-bold text-slate-900">{totalHospitals}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    5 active
                  </span>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center ring-1 ring-emerald-100">
                  <Building2 className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-blue-50 opacity-70 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Total Patients</p>
                <div className="mt-3 text-2xl font-bold text-slate-900">{totalPatients}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">↑ 12%</span>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center ring-1 ring-blue-100">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-violet-50 opacity-70 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Lab Reports</p>
                <div className="mt-3 text-2xl font-bold text-slate-900">{labReports}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">↑ 3 processed</span>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center ring-1 ring-violet-100">
                  <FileCheck className="w-6 h-6 text-violet-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-5 overflow-hidden">
            <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-emerald-50 opacity-70 pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">AI Processed</p>
                <div className="mt-3 text-2xl font-bold text-slate-900">{aiProcessed}</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">Today</span>
                  <span className="text-xs text-slate-400">vs last month</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-white shadow flex items-center justify-center ring-1 ring-emerald-100">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left: Healthcare Metrics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-semibold text-slate-900">Healthcare Metrics</h3>
              </div>
              <div className="text-sm text-slate-500">Overview</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              {metrics.map((m) => (
                <div key={m.label} className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900">{m.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <hr className="border-slate-100" />

            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Services Distribution</h4>
              <div className="flex flex-wrap gap-3">
                {serviceTags.map((t) => (
                  <span key={t.name} className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full shadow-sm text-sm text-slate-700">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white ring-1 ring-emerald-100 text-emerald-600 text-xs font-semibold">{t.count}</span>
                    {t.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 min-h-[140px] rounded-lg border border-dashed border-slate-100 bg-white/50" />
            </div>
          </div>

          {/* Right: Recent Activity */}
          <aside className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
              </div>
              <div className="text-sm text-slate-400">Dec 13</div>
            </div>

            <ul className="space-y-3">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 text-slate-700">
                      <ActivityIcon type={a.type} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{a.meta}</p>
                      </div>
                      <div className="text-xs text-slate-400 whitespace-nowrap">{a.date}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Bottom status strip */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-25 rounded-xl p-5 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2L22 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <p className="font-medium text-slate-900">All Systems Operational</p>
              <p className="text-sm text-slate-500">Healthcare portal is running smoothly</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              <span className="text-sm text-slate-600">Database Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              <span className="text-sm text-slate-600">AI Services Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              <span className="text-sm text-slate-600">API Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
