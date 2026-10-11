import { useState, useMemo } from 'react';
import { X, ExternalLink, Users } from 'lucide-react';
import { providers, providerCategories, type ServiceProvider, type ProviderCategory } from '../data/providers';
import {
  PageHeader, Card, SearchInput, FilterSelect, VerificationBadge,
  SourceLink, EmptyState, Badge, DataNote,
} from '../components/UI';

const categoryColors: Record<ProviderCategory, string> = {
  'Legal': 'bg-purple-50 text-purple-700',
  'Accounting & Audit': 'bg-blue-50 text-blue-700',
  'Recruitment': 'bg-teal-50 text-teal-700',
  'Payroll / EOR': 'bg-emerald-50 text-emerald-700',
  'Commercial Real Estate': 'bg-orange-50 text-orange-700',
  'GCC Consulting': 'bg-navy-50 text-navy-700',
};

function ProviderCard({ provider, onOpen }: { provider: ServiceProvider; onOpen: () => void }) {
  return (
    <Card className="cursor-pointer hover:border-teal-300 hover:shadow-md transition-all group" padding="sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors text-sm">
            {provider.name}
          </div>
          <div className={`text-[10px] font-medium rounded px-1.5 py-0.5 inline-block mt-0.5 ${categoryColors[provider.category]}`}>
            {provider.category}
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <VerificationBadge status={provider.verificationStatus} />
          <button
            onClick={e => { e.stopPropagation(); onOpen(); }}
            className="text-slate-400 hover:text-teal-600 transition-colors"
            aria-label="Open provider details"
          >
            <ExternalLink size={13} />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">{provider.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {provider.cities.slice(0, 3).map(c => (
          <span key={c} className="text-[10px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">{c}</span>
        ))}
        {provider.cities.length > 3 && (
          <span className="text-[10px] text-slate-400">+{provider.cities.length - 3} more</span>
        )}
      </div>

      <button
        onClick={onOpen}
        className="text-xs text-teal-600 hover:text-teal-800 font-medium transition-colors"
      >
        View profile →
      </button>
    </Card>
  );
}

function ProviderDetail({ provider, onClose }: { provider: ServiceProvider; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl border-l border-slate-200">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-start gap-3 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-slate-900">{provider.name}</h2>
              <VerificationBadge status={provider.verificationStatus} />
            </div>
            <div className={`text-[11px] font-medium rounded px-1.5 py-0.5 inline-block mt-1 ${categoryColors[provider.category]}`}>
              {provider.category}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Disclaimer first — important */}
          {provider.disclaimer && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide mb-1">Important Disclaimer</div>
              <div className="text-xs text-amber-800 leading-relaxed">{provider.disclaimer}</div>
            </div>
          )}

          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-1">About</div>
            <div className="text-sm text-slate-700 leading-relaxed">{provider.description}</div>
          </div>

          {/* Cities */}
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">City Presence</div>
            <div className="flex flex-wrap gap-1.5">
              {provider.cities.map(c => (
                <Badge key={c} variant="default">{c}</Badge>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Documented Services</div>
            <ul className="space-y-1">
              {provider.services.map((s, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-teal-500 mt-0.5">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Documented experience */}
          {provider.documentedExperience && (
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Documented Experience</div>
              <div className="text-xs text-slate-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3 leading-relaxed">
                {provider.documentedExperience}
              </div>
            </div>
          )}

          {/* Notes */}
          {provider.notes && (
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Notes</div>
              <div className="text-xs text-slate-600 leading-relaxed">{provider.notes}</div>
            </div>
          )}

          {/* Source */}
          <div className="border-t border-slate-100 pt-4">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Data Source</div>
            <div className="space-y-1">
              <VerificationBadge status={provider.verificationStatus} />
              <div>
                <SourceLink url={provider.sourceUrl} label="Official website" date={provider.sourceDate} />
              </div>
              <div className="text-xs text-slate-400">Last verified: {provider.lastVerified}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Providers() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selected, setSelected] = useState<ServiceProvider | null>(null);

  const allCities = useMemo(() =>
    [...new Set(providers.flatMap(p => p.cities))].sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return providers.filter(p => {
      if (q && !p.name.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q) &&
        !p.services.some(s => s.toLowerCase().includes(q))) return false;
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (cityFilter && !p.cities.includes(cityFilter)) return false;
      return true;
    });
  }, [search, categoryFilter, cityFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, ServiceProvider[]> = {};
    const cats = categoryFilter ? [categoryFilter as ProviderCategory] : providerCategories;
    for (const cat of cats) {
      const items = filtered.filter(p => p.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filtered, categoryFilter]);

  function clearFilters() {
    setSearch('');
    setCategoryFilter('');
    setCityFilter('');
  }

  const hasFilters = !!(search || categoryFilter || cityFilter);

  return (
    <div className="p-5 lg:p-8 max-w-6xl mx-auto">
      <PageHeader
        title="Service Provider Directory"
        subtitle={`${filtered.length} providers across ${providerCategories.length} categories. All profiles based on publicly documented information.`}
      />

      <DataNote
        type="warning"
        text="Provider profiles are based on publicly available information only. GCC Atlas has not independently verified service quality, client outcomes, or current regulatory compliance. This directory is not an endorsement. Conduct your own due diligence before engagement."
      />

      {/* Filters */}
      <div className="mt-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search providers, services..."
            />
          </div>
          <FilterSelect
            label=""
            options={providerCategories.map(c => ({ value: c, label: c }))}
            value={categoryFilter}
            onChange={setCategoryFilter}
            allLabel="All categories"
          />
          <FilterSelect
            label=""
            options={allCities.map(c => ({ value: c, label: c }))}
            value={cityFilter}
            onChange={setCityFilter}
            allLabel="All cities"
          />
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800 font-medium whitespace-nowrap self-center"
            >
              <X size={11} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Provider groups */}
      {Object.keys(grouped).length === 0 ? (
        <EmptyState
          title="No providers match your search"
          description="Try adjusting your filters or search query."
          action={{ label: 'Clear filters', onClick: clearFilters }}
          icon={<Users size={40} />}
        />
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-bold text-slate-900">{cat}</h2>
                <span className="text-xs text-slate-400">{items.length} provider{items.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(p => (
                  <ProviderCard key={p.id} provider={p} onOpen={() => setSelected(p)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <ProviderDetail provider={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
