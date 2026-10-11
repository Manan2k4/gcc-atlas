import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Database } from 'lucide-react';
import { PageHeader, Card, DataNote, VerificationBadge } from '../components/UI';

const sources = [
  {
    category: 'GCC Market Research',
    items: [
      {
        name: 'NASSCOM-KPMG: GCC in India Landscape Report',
        description: 'Comprehensive industry report covering GCC count, revenue, employee headcount, and city distribution. Primary source for ecosystem-level statistics.',
        url: 'https://community.nasscom.in/communities/gcc',
        publisher: 'NASSCOM & KPMG',
        date: 'September 2023 / 2024 Update',
        coverage: 'Ecosystem-level statistics, city distribution',
        limitations: 'Aggregate figures; city-level breakdowns are estimates. Some definitions (what counts as a GCC) differ from other reports.',
        verificationStatus: 'verified' as const,
      },
      {
        name: 'Zinnov: GCC Zones Report 2023',
        description: 'Annual benchmarking report covering GCC maturity, talent, and operating costs by location.',
        url: 'https://zinnov.com/engineering-rd-outsourcing/zinnov-zones-engineering-rnd-services-2023/',
        publisher: 'Zinnov',
        date: '2023',
        coverage: 'GCC benchmarking, location analysis, talent',
        limitations: 'Report purchase required for full data; summary publicly available.',
        verificationStatus: 'reported' as const,
      },
      {
        name: 'Everest Group: GCC State of the Market 2023',
        description: 'Research on GCC setup trends, deal activity, and service provider landscape.',
        url: 'https://www.everestgrp.com/2023-research/global-capability-centers-gcc-state-of-the-market-report-2023.html',
        publisher: 'Everest Group',
        date: '2023',
        coverage: 'GCC deal activity, advisory trends',
        limitations: 'Full report behind paywall. Summary findings referenced.',
        verificationStatus: 'reported' as const,
      },
    ],
  },
  {
    category: 'Real Estate & Office Markets',
    items: [
      {
        name: 'JLL India Office Market Update Q3 2023',
        description: 'Quarterly real estate report covering office rents, vacancy rates, and GCC leasing activity across major Indian cities.',
        url: 'https://www.jll.co.in/en/trends-and-insights/research',
        publisher: 'JLL India',
        date: 'October 2023',
        coverage: 'Office rents, vacancy, leasing volumes',
        limitations: 'Rent ranges are for Grade A space. Specific micro-market rates vary. Figures updated quarterly; current availability may differ.',
        verificationStatus: 'verified' as const,
      },
      {
        name: 'CBRE India Office Market Report 2023',
        description: 'Annual and quarterly office market data used for infrastructure and rent comparisons.',
        url: 'https://www.cbre.co.in/research-and-reports',
        publisher: 'CBRE India',
        date: 'Q2/Q3 2023',
        coverage: 'Office rents, tech park ratings',
        limitations: 'Infrastructure scores are composite estimates, not official ratings. Treat as directional only.',
        verificationStatus: 'reported' as const,
      },
    ],
  },
  {
    category: 'Talent & Compensation',
    items: [
      {
        name: 'AmbitionBox Salary Insights 2023',
        description: 'Crowd-sourced salary data for technology professionals across Indian cities.',
        url: 'https://www.ambitionbox.com/salaries',
        publisher: 'AmbitionBox',
        date: '2023',
        coverage: 'Salary benchmarks by role and city',
        limitations: 'Crowd-sourced data; sample sizes vary by city and role. Directional only. Do not use for compensation benchmarking without additional sources.',
        verificationStatus: 'reported' as const,
      },
      {
        name: 'NASSCOM Talent Estimates',
        description: 'Industry-level estimates for technology talent pool size by city, used for talent availability indicators.',
        url: 'https://nasscom.in/',
        publisher: 'NASSCOM',
        date: '2023',
        coverage: 'Tech talent pool estimates',
        limitations: 'City-level disaggregation is estimated. Definitions of "tech professional" vary. Treat as order-of-magnitude figures.',
        verificationStatus: 'reported' as const,
      },
    ],
  },
  {
    category: 'Government & Policy',
    items: [
      {
        name: 'Karnataka IT Policy (K-Tech Initiative)',
        description: 'Official state policy documentation covering incentives for IT/ITES and GCC units in Karnataka.',
        url: 'https://karnatakadigital.in/policies/',
        publisher: 'Government of Karnataka / KDEM',
        date: '2021 (Active)',
        coverage: 'Karnataka IT/ITES & GCC incentives',
        limitations: 'Incentive guidelines undergo periodic gazette updates. Verify operational rules via KDEM single window.',
        verificationStatus: 'verified' as const,
      },
      {
        name: 'Telangana ICT Policy (ITE&C Department)',
        description: 'Official Telangana government portal for ICT sector investment and GCC incentives.',
        url: 'https://startup.telangana.gov.in',
        publisher: 'Government of Telangana, ITE&C Dept.',
        date: 'June 2021',
        coverage: 'Telangana IT incentives',
        limitations: 'Incentive eligibility depends on capital investment thresholds and employment counts.',
        verificationStatus: 'verified' as const,
      },
      {
        name: 'Maharashtra IT/ITES Policy 2023 (MAITRI)',
        description: 'Maharashtra industrial single-window portal covering IT investment incentives for Pune and Mumbai.',
        url: 'https://maitri.maharashtra.gov.in',
        publisher: 'Government of Maharashtra',
        date: 'June 2023',
        coverage: 'Maharashtra IT incentives',
        limitations: 'Stamp duty and electricity waivers require registration via the state MAITRI portal.',
        verificationStatus: 'verified' as const,
      },
      {
        name: 'Tamil Nadu ICT & Industrial Policy (Guidance TN)',
        description: 'Tamil Nadu state investment promotion agency portal for IT investment and employment incentives.',
        url: 'https://www.investingintamilnadu.com',
        publisher: 'Government of Tamil Nadu / Guidance',
        date: 'September 2021',
        coverage: 'Tamil Nadu IT incentives',
        limitations: 'Policy details and land concessions in TIDEL parks require verification with Guidance TN.',
        verificationStatus: 'verified' as const,
      },
    ],
  },
  {
    category: 'Regulatory & Legal',
    items: [
      {
        name: 'Digital Personal Data Protection Act 2023 (DPDPA)',
        description: 'India\'s new data protection law, relevant for GCCs handling personal data of Indian residents.',
        url: 'https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf',
        publisher: 'Ministry of Electronics & Information Technology',
        date: 'August 2023',
        coverage: 'Data protection obligations',
        limitations: 'Rules under DPDPA are yet to be fully notified. Compliance obligations will be clarified in subordinate legislation. Consult legal counsel for current obligations.',
        verificationStatus: 'verified' as const,
      },
    ],
  },
];

const methodology = [
  {
    q: 'How is a GCC defined for this dataset?',
    a: 'We follow the NASSCOM definition: a GCC is a captive centre established by a multinational corporation in India to serve its parent company\'s global operations. Pure IT outsourcing vendors, shared service centres of Indian companies, and BPOs are generally excluded unless they are wholly owned by the MNC parent.',
  },
  {
    q: 'What verification status labels mean',
    a: '"Verified" means the record was cross-checked against at least two official sources (company website, press release, or government filing). "Reported" means the record is from a credible media or industry source but was not independently cross-checked. "Demo" means the record is illustrative only and should not be treated as factual.',
  },
  {
    q: 'How are employee counts determined?',
    a: 'We use figures from official company careers pages, annual reports, or credible press coverage. Where a precise figure is not available, we show a range or note the source\'s methodology. Employee counts change frequently; treat all figures as approximate at time of data collection.',
  },
  {
    q: 'How should I use the Setup Assistant output?',
    a: 'The Setup Assistant generates a research brief using structured retrieval from our curated dataset. It is designed to structure your research process, not to replace professional analysis. The output labels whether a real LLM was used or whether the analysis is deterministic. Always verify key metrics and incentive details independently before making investment decisions.',
  },
  {
    q: 'What is the currency of office rent figures?',
    a: 'All office rent figures are in Indian Rupees (₹) per square foot per month for Grade A commercial space, sourced from JLL or CBRE India quarterly reports. Figures represent a range across micro-markets within each city. Current market rents may vary—verify with a commercial real estate advisor.',
  },
  {
    q: 'Why are some values shown as "Data unavailable"?',
    a: 'We prefer to show honest gaps rather than invent or extrapolate numbers. When no reliable public source was found for a metric, we display "Data unavailable" rather than estimating. This includes cases where data may exist but is only available via paid reports or direct inquiry.',
  },
  {
    q: 'What does "confidence level" mean for metrics?',
    a: '"High" = from official or primary sources with clear methodology. "Medium" = from credible secondary sources or industry estimates. "Low" / "Estimate" = derived or extrapolated; treat as directional only. "Unavailable" = no reliable source found.',
  },
];

function MethodologyAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 py-3 text-left"
      >
        <span className="text-sm font-medium text-slate-800">{q}</span>
        {open ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="pb-3 text-sm text-slate-600 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function Methodology() {
  return (
    <div className="p-5 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        title="Data Sources & Methodology"
        subtitle="How data was collected, what each verification status means, and what limitations you should be aware of."
        badge="Transparency"
      />

      <DataNote
        type="info"
        text="Transparency is central to GCC Atlas. This page documents where every data point comes from, what confidence we assign it, and where data is unavailable or uncertain."
      />

      {/* Methodology */}
      <div className="mt-6 mb-6">
        <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Database size={15} className="text-teal-600" />
          Methodology & Definitions
        </h2>
        <Card>
          {methodology.map((item, i) => (
            <MethodologyAccordion key={i} q={item.q} a={item.a} />
          ))}
        </Card>
      </div>

      {/* Sources */}
      <div className="space-y-6">
        {sources.map(cat => (
          <div key={cat.category}>
            <h2 className="text-sm font-bold text-slate-900 mb-3">{cat.category}</h2>
            <div className="space-y-3">
              {cat.items.map(src => (
                <Card key={src.name} padding="sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                      >
                        {src.name}
                        <ExternalLink size={12} />
                      </a>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {src.publisher} · {src.date}
                      </div>
                    </div>
                    <VerificationBadge status={src.verificationStatus} />
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{src.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-1">Coverage</div>
                      <div className="text-xs text-slate-600">{src.coverage}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-500 font-semibold uppercase tracking-wide mb-1">Limitations</div>
                      <div className="text-xs text-amber-700 leading-relaxed">{src.limitations}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GCC record details */}
      <div className="mt-8">
        <h2 className="text-sm font-bold text-slate-900 mb-3">GCC Record Data Schema</h2>
        <Card>
          <div className="text-xs font-mono text-slate-600 leading-relaxed space-y-1">
            {[
              ['id', 'Unique identifier (gcc-XXX)'],
              ['companyName', 'Official trading name of the GCC entity in India'],
              ['parentCompany', 'Name of the ultimate parent MNC'],
              ['parentCountry', 'Country of parent company headquarters'],
              ['city / state', 'Primary location of GCC operations'],
              ['sector', 'Industry classification of parent company'],
              ['functions', 'Business functions performed at the GCC'],
              ['employeeCount', 'Approximate employee range at time of last verification'],
              ['established', 'Year GCC operations began in India (approximate)'],
              ['sourceUrl', 'URL of primary source for this record'],
              ['sourceDate', 'Publication or report date of primary source'],
              ['lastVerified', 'Date GCC Atlas last reviewed this record'],
              ['verificationStatus', '"verified" | "reported" | "demo"'],
              ['notes', 'Qualitative notes and context from source materials'],
            ].map(([field, desc]) => (
              <div key={field} className="flex gap-3">
                <span className="text-teal-600 font-semibold w-36 flex-shrink-0">{field}</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
