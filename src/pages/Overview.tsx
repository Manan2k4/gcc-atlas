import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Building2, Users, Globe, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { gccs } from '../data/gccs';
import { cityData } from '../data/cities';
import { Card, StatCard, PageHeader, SourceLink, DataNote } from '../components/UI';

// Aggregated stats
const totalGCCs = gccs.length;
const verifiedCount = gccs.filter(g => g.verificationStatus === 'verified').length;
const reportedCount = gccs.filter(g => g.verificationStatus === 'reported').length;

// City distribution
const cityDist = Object.entries(
  gccs.reduce<Record<string, number>>((acc, g) => {
    acc[g.city] = (acc[g.city] ?? 0) + 1;
    return acc;
  }, {})
).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);

// Sector distribution
const sectorDist = Object.entries(
  gccs.reduce<Record<string, number>>((acc, g) => {
    acc[g.sector] = (acc[g.sector] ?? 0) + 1;
    return acc;
  }, {})
).map(([sector, count]) => ({ sector, count })).sort((a, b) => b.count - a.count);

// Country distribution
const countryDist = Object.entries(
  gccs.reduce<Record<string, number>>((acc, g) => {
    acc[g.parentCountry] = (acc[g.parentCountry] ?? 0) + 1;
    return acc;
  }, {})
).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count);

const COLORS = ['#0e7490', '#1e3160', '#22d3ee', '#2a4580', '#67e8f9', '#3a5fa0', '#7294cc'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-slate-200 shadow-lg rounded-lg px-3 py-2 text-sm">
        <div className="text-slate-500 text-xs mb-1">{label}</div>
        <div className="font-semibold text-slate-900">{payload[0].value} GCCs</div>
      </div>
    );
  }
  return null;
};

const recentDevelopments = [
  {
    title: 'India GCC sector crossed ₹4.46 lakh crore in revenue',
    source: 'NASSCOM-KPMG GCC Report',
    url: 'https://community.nasscom.in/communities/gcc',
    date: 'Sep 2023',
    city: 'National',
  },
  {
    title: 'Bengaluru maintains top position with 700+ GCCs, ahead of Hyderabad\'s 400+',
    source: 'NASSCOM-KPMG GCC Report',
    url: 'https://community.nasscom.in/communities/gcc',
    date: 'Sep 2023',
    city: 'Bengaluru / Hyderabad',
  },
  {
    title: 'Telangana ICT Policy extends employment subsidy for IT & GCC units',
    source: 'Startup Telangana / ITE&C',
    url: 'https://startup.telangana.gov.in',
    date: 'Active Policy',
    city: 'Hyderabad',
  },
  {
    title: 'India DPDPA 2023 enacted — data localisation obligations for GCCs under review',
    source: 'Ministry of Electronics & IT',
    url: 'https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf',
    date: 'Aug 2023',
    city: 'National',
  },
];

export default function Overview() {
  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="GCC Atlas — India Overview"
        subtitle="A curated intelligence platform for Global Capability Centres in India. All data is sourced and dated."
      />

      {/* Data freshness notice */}
      <DataNote
        type="info"
        text="Dataset covers 25 verified/reported GCCs across 5 major cities. Last data review: January 2024. Figures reflect publicly available information; see Data Sources for methodology."
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="GCCs in Dataset"
          value={String(totalGCCs)}
          sub={`${verifiedCount} verified · ${reportedCount} reported`}
          icon={<Building2 size={18} />}
        />
        <StatCard
          label="Cities Covered"
          value={String(cityData.length)}
          sub="Bengaluru, Hyderabad, Pune, Chennai, Mumbai"
          icon={<Globe size={18} />}
        />
        <StatCard
          label="Est. GCC Employees"
          value="1.66M+"
          sub="NASSCOM-KPMG 2023 (Industry Total)"
          icon={<Users size={18} />}
        />
        <StatCard
          label="India GCC Revenue"
          value="₹4.46L Cr"
          sub="NASSCOM-KPMG 2023 (est.)"
          icon={<TrendingUp size={18} />}
          trend={{ value: '11% CAGR', positive: true }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* City distribution */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">GCCs by City (Dataset)</h2>
              <p className="text-xs text-slate-400">From 25 curated records</p>
            </div>
            <SourceLink
              url="https://nasscom.in/knowledge-center/publications/gcc-in-india-2023"
              label="NASSCOM 2023"
            />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cityDist} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="city" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#0e7490" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sector distribution */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">GCCs by Sector (Dataset)</h2>
              <p className="text-xs text-slate-400">From 25 curated records</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sectorDist}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                nameKey="sector"
                label={(entry: any) => `${(entry.sector || '').split(' ')[0]} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {sectorDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Country distribution and Recent developments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Parent Country */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">GCCs by Parent Country</h2>
          <div className="space-y-2">
            {countryDist.map(({ country, count }) => (
              <div key={country} className="flex items-center gap-3">
                <div className="text-sm text-slate-600 w-28 flex-shrink-0">{country}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full"
                    style={{ width: `${(count / totalGCCs) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-semibold text-slate-700 w-6 text-right">{count}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent developments */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Recent Developments</h2>
          <div className="space-y-3">
            {recentDevelopments.map((item, i) => (
              <div key={i} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div className="text-sm text-slate-700 font-medium leading-snug mb-1">{item.title}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5">{item.city}</span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock size={10} /> {item.date}
                  </span>
                  <SourceLink url={item.url} label={item.source} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Module links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: '/explorer', label: 'GCC Explorer', desc: 'Search and filter 25 curated GCC records', color: 'bg-navy-900' },
          { to: '/assistant', label: 'Setup Assistant', desc: 'Generate a research brief for your GCC', color: 'bg-teal-600' },
          { to: '/providers', label: 'Service Providers', desc: 'Find legal, recruitment, and advisory firms', color: 'bg-navy-700' },
        ].map(m => (
          <NavLink
            key={m.to}
            to={m.to}
            className={`${m.color} text-white rounded-xl p-5 hover:opacity-90 transition-opacity group`}
          >
            <div className="text-sm font-bold mb-1">{m.label}</div>
            <div className="text-xs text-white/70 mb-3">{m.desc}</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white">
              Open <ArrowRight size={12} />
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
