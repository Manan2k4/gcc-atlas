import { useState, useMemo } from 'react';
import { Building2, X, ExternalLink, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { gccs, sectors, cities, allFunctions, type GCC } from '../data/gccs';
import {
  PageHeader, Card, SearchInput, FilterSelect,
  VerificationBadge, SourceLink, EmptyState, Badge,
} from '../components/UI';

type SortField = 'companyName' | 'city' | 'sector' | 'established';
type SortDir = 'asc' | 'desc';

function GCCDetail({ gcc, onClose }: { gcc: GCC; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl border-l border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-start gap-3 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900">{gcc.companyName}</h2>
              <VerificationBadge status={gcc.verificationStatus} size="sm" />
            </div>
            <div className="text-sm text-slate-500">{gcc.parentCompany} · {gcc.parentCountry}</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0"
            aria-label="Close detail"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Key facts */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'City', value: gcc.city },
              { label: 'State', value: gcc.state },
              { label: 'Sector', value: gcc.sector },
              { label: 'Established', value: gcc.established },
              { label: 'Employees (India)', value: gcc.employeeCount },
              { label: 'Parent Country', value: gcc.parentCountry },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-slate-800">{value}</div>
              </div>
            ))}
          </div>

          {/* Business functions */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Business Functions</div>
            <div className="flex flex-wrap gap-1.5">
              {gcc.functions.map(fn => (
                <Badge key={fn} variant="teal">{fn}</Badge>
              ))}
            </div>
          </div>

          {/* Additional locations */}
          {gcc.additionalLocations?.length && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Additional India Locations</div>
              <div className="flex flex-wrap gap-1.5">
                {gcc.additionalLocations.map(l => (
                  <Badge key={l} variant="default">{l}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {gcc.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-[10px] text-blue-600 font-semibold uppercase tracking-wide mb-1">Notes</div>
              <div className="text-sm text-blue-800">{gcc.notes}</div>
            </div>
          )}

          {/* Source */}
          <div className="border-t border-slate-100 pt-4">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Data Source</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <VerificationBadge status={gcc.verificationStatus} />
                <span className="text-xs text-slate-500">
                  {gcc.verificationStatus === 'verified'
                    ? 'Cross-checked with official sources'
                    : gcc.verificationStatus === 'reported'
                    ? 'From credible press / industry sources'
                    : 'Illustrative demonstration record'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SourceLink url={gcc.sourceUrl} label="Primary source" date={gcc.sourceDate} />
              </div>
              <div className="text-xs text-slate-400">Last verified: {gcc.lastVerified}</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-[11px] text-slate-400 bg-slate-50 rounded-lg p-3 leading-relaxed">
            Employee counts and operational details may have changed. Verify current figures via official company sources before making investment decisions.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Explorer() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [functionFilter, setFunctionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<SortField>('companyName');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selected, setSelected] = useState<GCC | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return gccs
      .filter(g => {
        if (q && !g.companyName.toLowerCase().includes(q) &&
          !g.parentCompany.toLowerCase().includes(q) &&
          !g.sector.toLowerCase().includes(q) &&
          !g.functions.some(f => f.toLowerCase().includes(q))) return false;
        if (cityFilter && g.city !== cityFilter) return false;
        if (sectorFilter && g.sector !== sectorFilter) return false;
        if (functionFilter && !g.functions.includes(functionFilter)) return false;
        if (statusFilter && g.verificationStatus !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        const av = a[sortField] ?? '';
        const bv = b[sortField] ?? '';
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, cityFilter, sectorFilter, functionFilter, statusFilter, sortField, sortDir]);

  const hasFilters = !!(search || cityFilter || sectorFilter || functionFilter || statusFilter);

  function clearFilters() {
    setSearch('');
    setCityFilter('');
    setSectorFilter('');
    setFunctionFilter('');
    setStatusFilter('');
  }

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ChevronDown size={13} className="text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={13} className="text-teal-500" />
      : <ChevronDown size={13} className="text-teal-500" />;
  }

  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto">
      <PageHeader
        title="GCC Explorer"
        subtitle={`${filtered.length} of ${gccs.length} GCCs shown · Curated dataset with source references`}
      />

      {/* Filters */}
      <Card className="mb-5" padding="sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div className="sm:col-span-2 lg:col-span-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search company, sector..."
            />
          </div>
          <FilterSelect
            label="City"
            options={cities.map(c => ({ value: c, label: c }))}
            value={cityFilter}
            onChange={setCityFilter}
          />
          <FilterSelect
            label="Sector"
            options={sectors.map(s => ({ value: s, label: s }))}
            value={sectorFilter}
            onChange={setSectorFilter}
          />
          <FilterSelect
            label="Function"
            options={allFunctions.map(f => ({ value: f, label: f }))}
            value={functionFilter}
            onChange={setFunctionFilter}
            allLabel="All functions"
          />
          <FilterSelect
            label="Status"
            options={[
              { value: 'verified', label: 'Verified' },
              { value: 'reported', label: 'Reported' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            allLabel="All statuses"
          />
        </div>
        {hasFilters && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-slate-500">{filtered.length} results</span>
            <button
              onClick={clearFilters}
              className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1 font-medium"
            >
              <X size={11} /> Clear filters
            </button>
          </div>
        )}
      </Card>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No GCCs match your filters"
          description="Try removing or adjusting filters to broaden your search."
          action={{ label: 'Clear all filters', onClick: clearFilters }}
          icon={<Building2 size={40} />}
        />
      ) : (
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {[
                    { field: 'companyName' as SortField, label: 'Company' },
                    { field: 'city' as SortField, label: 'City' },
                    { field: 'sector' as SortField, label: 'Sector' },
                    { field: 'established' as SortField, label: 'Est.' },
                  ].map(col => (
                    <th
                      key={col.field}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:text-slate-700 transition-colors"
                      onClick={() => toggleSort(col.field)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon field={col.field} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Functions</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((gcc, i) => (
                  <tr
                    key={gcc.id}
                    className={`border-b border-slate-100 cursor-pointer transition-colors
                      ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      hover:bg-teal-50/50`}
                    onClick={() => setSelected(gcc)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{gcc.companyName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Globe size={10} />
                        {gcc.parentCompany} ({gcc.parentCountry})
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{gcc.city}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600 bg-slate-100 rounded px-2 py-0.5">{gcc.sector}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{gcc.established}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {gcc.functions.slice(0, 2).map(fn => (
                          <span key={fn} className="text-[10px] bg-navy-50 text-navy-700 rounded px-1.5 py-0.5">{fn}</span>
                        ))}
                        {gcc.functions.length > 2 && (
                          <span className="text-[10px] text-slate-400">+{gcc.functions.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <VerificationBadge status={gcc.verificationStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={gcc.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-slate-400 hover:text-teal-600 transition-colors"
                        aria-label="Open source"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 text-xs text-slate-400">
            {filtered.length} records · Click a row for details
          </div>
        </Card>
      )}

      {/* Detail panel */}
      {selected && <GCCDetail gcc={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
