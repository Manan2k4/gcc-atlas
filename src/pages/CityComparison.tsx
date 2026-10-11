import { useState } from 'react';
import { X, AlertCircle, ExternalLink } from 'lucide-react';
import { cityData, type CityData } from '../data/cities';
import {
  PageHeader, Card, ConfidencePill, SourceLink, DataNote, Badge,
} from '../components/UI';

const availableCities = cityData.map(c => ({ id: c.id, name: c.name }));

function CitySelector({
  selected,
  onAdd,
  onRemove,
}: {
  selected: string[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const available = availableCities.filter(c => !selected.includes(c.id));
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {selected.map(id => {
        const city = cityData.find(c => c.id === id);
        return city ? (
          <div
            key={id}
            className="flex items-center gap-1.5 bg-navy-900 text-white rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {city.name}
            <button
              onClick={() => onRemove(id)}
              className="text-navy-300 hover:text-white transition-colors"
              aria-label={`Remove ${city.name}`}
            >
              <X size={13} />
            </button>
          </div>
        ) : null;
      })}
      {selected.length < 3 && available.length > 0 && (
        <select
          value=""
          onChange={e => { if (e.target.value) onAdd(e.target.value); }}
          className="border border-dashed border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-500 bg-white
            focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 cursor-pointer hover:border-slate-400"
        >
          <option value="">+ Add city ({3 - selected.length} remaining)</option>
          {available.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      )}
    </div>
  );
}

interface MetricCompareRowProps {
  label: string;
  cities: CityData[];
  getMetric: (c: CityData) => { value: string; unit?: string; source: string; sourceUrl: string; confidence: 'high' | 'medium' | 'low' | 'unavailable'; notes?: string };
}

function MetricCompareRow({ label, cities, getMetric }: MetricCompareRowProps) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
      <td className="py-3 px-4 text-sm text-slate-500 font-medium align-top w-40">{label}</td>
      {cities.map(city => {
        const m = getMetric(city);
        const unavail = m.confidence === 'unavailable';
        return (
          <td key={city.id} className="py-3 px-4 text-sm align-top">
            <div className={`font-semibold ${unavail ? 'text-slate-400 italic text-xs' : 'text-slate-900'}`}>
              {m.value}
              {m.unit && !unavail && <span className="text-slate-400 font-normal text-xs ml-1">{m.unit}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <ConfidencePill confidence={m.confidence} />
              {m.sourceUrl && <SourceLink url={m.sourceUrl} label="Source" />}
            </div>
            {m.notes && (
              <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">{m.notes}</div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

export default function CityComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['bengaluru', 'hyderabad']);

  const addCity = (id: string) => {
    if (selectedIds.length < 3) setSelectedIds([...selectedIds, id]);
  };
  const removeCity = (id: string) => {
    setSelectedIds(selectedIds.filter(s => s !== id));
  };

  const selectedCities = cityData.filter(c => selectedIds.includes(c.id));

  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto">
      <PageHeader
        title="City Comparison"
        subtitle="Compare key indicators across cities. Confidence levels and sources shown for every figure."
      />

      {/* City selector */}
      <Card className="mb-5" padding="sm">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide pt-1.5 flex-shrink-0">Comparing</div>
          <CitySelector
            selected={selectedIds}
            onAdd={addCity}
            onRemove={removeCity}
          />
        </div>
        <DataNote
          type="warning"
          text="Data quality varies by metric and city. Confidence levels indicate how reliable each figure is. 'Data unavailable' means no reliable public source was found—not that the value is zero."
        />
      </Card>

      {selectedCities.length < 2 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm mb-5">
          <AlertCircle size={16} className="flex-shrink-0" />
          Select at least two cities to compare.
        </div>
      )}

      {selectedCities.length >= 2 && (
        <div className="space-y-5">
          {/* Summary cards */}
          <div className={`grid gap-4 ${selectedCities.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedCities.map(city => (
              <Card key={city.id} padding="sm">
                <div className="text-base font-bold text-slate-900">{city.name}</div>
                <div className="text-xs text-slate-400 mb-2">{city.state}</div>
                {city.nickname && (
                  <div className="text-[11px] bg-navy-50 text-navy-700 rounded px-2 py-0.5 inline-block mb-2">
                    {city.nickname}
                  </div>
                )}
                <div className="text-xs text-slate-600 leading-relaxed line-clamp-3">{city.summary}</div>
              </Card>
            ))}
          </div>

          {/* Comparison table */}
          <Card padding="none" className="overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <h2 className="text-sm font-semibold text-slate-900">Key Indicators</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-2 px-4 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-40">Metric</th>
                    {selectedCities.map(c => (
                      <th key={c.id} className="py-2 px-4 text-left text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <MetricCompareRow
                    label="GCCs (est.)"
                    cities={selectedCities}
                    getMetric={c => ({ ...c.gccCount, unit: 'active GCCs' })}
                  />
                  <MetricCompareRow
                    label="GCC Employees"
                    cities={selectedCities}
                    getMetric={c => c.gccEmployees}
                  />
                  <MetricCompareRow
                    label="Office Rent"
                    cities={selectedCities}
                    getMetric={c => c.officeRent}
                  />
                  <MetricCompareRow
                    label="Software Eng. (Mid)"
                    cities={selectedCities}
                    getMetric={c => ({
                      value: c.functionalSalaries['Software Engineering']?.salaryRange || c.averageEngineerSalary.value,
                      source: 'Michael Page / AmbitionBox 2023',
                      sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
                      sourceDate: '2023',
                      confidence: 'medium',
                      notes: '4-7 yrs experience'
                    })}
                  />
                  <MetricCompareRow
                    label="Finance & Accounting"
                    cities={selectedCities}
                    getMetric={c => ({
                      value: c.functionalSalaries['Finance & Accounting']?.salaryRange || 'Data unavailable',
                      source: 'Michael Page India Salary Guide 2023',
                      sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
                      sourceDate: '2023',
                      confidence: 'medium',
                      notes: 'FP&A / Accounting Lead (5-8 yrs)'
                    })}
                  />
                  <MetricCompareRow
                    label="HR & People Ops"
                    cities={selectedCities}
                    getMetric={c => ({
                      value: c.functionalSalaries['HR & People Ops']?.salaryRange || 'Data unavailable',
                      source: 'Michael Page India Salary Guide 2023',
                      sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
                      sourceDate: '2023',
                      confidence: 'medium',
                      notes: 'HRBP / People Ops Lead (5-8 yrs)'
                    })}
                  />
                  <MetricCompareRow
                    label="Operations / Process"
                    cities={selectedCities}
                    getMetric={c => ({
                      value: c.functionalSalaries['Operations']?.salaryRange || 'Data unavailable',
                      source: 'AmbitionBox Salary Insights 2023',
                      sourceUrl: 'https://www.ambitionbox.com/salaries',
                      sourceDate: '2023',
                      confidence: 'medium',
                      notes: 'Operations Manager (5-8 yrs)'
                    })}
                  />
                  <MetricCompareRow
                    label="Tier-1 Tech Talent"
                    cities={selectedCities}
                    getMetric={c => c.tier1TechTalent}
                  />
                  <MetricCompareRow
                    label="Infra Score"
                    cities={selectedCities}
                    getMetric={c => c.infrastructureScore}
                  />
                </tbody>
              </table>
            </div>
          </Card>

          {/* Strengths & Risks */}
          <div className={`grid gap-4 ${selectedCities.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedCities.map(city => (
              <Card key={city.id}>
                <div className="text-sm font-semibold text-slate-900 mb-3">{city.name} — Strengths & Risks</div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1.5">Key Strengths</div>
                  <ul className="space-y-1.5">
                    {city.keyStrengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1.5">Key Risks</div>
                  <ul className="space-y-1.5">
                    {city.keyRisks.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-red-400 mt-0.5">⚠</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Policies */}
          <div className={`grid gap-4 ${selectedCities.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedCities.map(city => (
              <Card key={city.id}>
                <div className="text-sm font-semibold text-slate-900 mb-3">State Policies — {city.name}</div>
                {city.policies.length === 0 ? (
                  <div className="text-xs text-slate-400 italic">No policy data available.</div>
                ) : city.policies.map(p => (
                  <div key={p.name}>
                    <div className="flex items-start gap-2 mb-2">
                      <div>
                        <a
                          href={p.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition-colors"
                        >
                          {p.name}
                          <ExternalLink size={12} />
                        </a>
                        <div className="text-xs text-slate-400">Last updated: {p.lastUpdated}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mb-2">{p.description}</div>
                    <ul className="space-y-1">
                      {p.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-teal-500 mt-0.5">•</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Card>
            ))}
          </div>

          {/* Tech parks */}
          <div className={`grid gap-4 ${selectedCities.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedCities.map(city => (
              <Card key={city.id} padding="sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Major Tech Parks — {city.name}</div>
                <div className="flex flex-wrap gap-1.5">
                  {city.majorTechParks.map(p => (
                    <Badge key={p} variant="default">{p}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Disclaimer */}
          <DataNote
            type="info"
            text="All city comparisons use publicly sourced data. Figures marked as 'Estimate' or 'Low confidence' should be independently verified before making location decisions. This tool does not recommend a specific city—it structures available evidence for your review."
          />
        </div>
      )}
    </div>
  );
}
