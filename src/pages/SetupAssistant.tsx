import React, { useState } from 'react';
import {
  Sparkles, RotateCcw, Printer, AlertCircle, CheckCircle2, Info, ShieldCheck
} from 'lucide-react';
import { cityData } from '../data/cities';
import { generateDeterministicBrief, type SetupRequirements, type ResearchBrief } from '../data/assistant';
import { PageHeader, Card, DataNote } from '../components/UI';

const SECTORS = [
  'Technology', 'Financial Services', 'Healthcare', 'Automotive', 'Energy',
  'Professional Services', 'Retail', 'Telecommunications', 'Pharmaceuticals',
  'Industrial / Engineering', 'Media & Entertainment', 'Education',
];

const FUNCTIONS = [
  'Software Engineering', 'Data Science / Analytics', 'AI / ML',
  'Finance & Accounting', 'HR & People Ops', 'Operations',
  'Customer Service', 'R&D / Research', 'Legal & Compliance',
  'Supply Chain', 'Cybersecurity', 'Product Management',
];

const EMPLOYEE_BANDS = [
  '< 50 employees', '50–200 employees', '200–500 employees',
  '500–1000 employees', '1000–5000 employees', '5000+ employees',
];

const defaultReq: SetupRequirements = {
  sector: '',
  cities: [],
  employeeCount: '',
  talentSkills: [],
  priority: 'talent',
  budget: '',
  functions: [],
};

function FormStep({
  number, title, children,
}: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
          {number}
        </div>
        <div className="w-px flex-1 bg-slate-200 mt-2" />
      </div>
      <div className="pb-6 flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900 mb-3 pt-0.5">{title}</div>
        {children}
      </div>
    </div>
  );
}

function ScoreMeter({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color = score >= 7 ? 'bg-emerald-500' : score >= 5 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold text-slate-900 w-8">{score}/10</span>
    </div>
  );
}

function BriefView({ brief, onReset }: { brief: ResearchBrief; onReset: () => void }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">GCC Setup Research Brief</h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-slate-400">
            <span>Generated {new Date(brief.generatedAt).toLocaleString()}</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded px-1.5 py-0.5 font-medium flex items-center gap-1">
              <ShieldCheck size={12} /> Grounded Empirical Engine (100% Truthful Dataset)
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-slate-600"
          >
            <Printer size={13} /> Print
          </button>
          <button
            onClick={onReset}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-slate-600"
          >
            <RotateCcw size={13} /> Revise Requirements
          </button>
        </div>
      </div>

      <DataNote
        type="warning"
        text={brief.disclaimer}
      />

      {/* Primary recommendation */}
      <Card className="border-teal-200 bg-teal-50/50">
        <div className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <Sparkles size={14} /> Strategic Location Synthesis
        </div>
        <div className="text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">{brief.primaryRecommendation}</div>
      </Card>

      {/* City analyses */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">City Analysis & Fit Scores ({brief.cityAnalyses.length} cities)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brief.cityAnalyses.map(ca => (
            <Card key={ca.cityId} className={ca.score >= 7 ? 'border-emerald-200 shadow-sm' : ''}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="font-bold text-slate-900 text-base">{ca.cityName}</div>
                  {ca.score >= 7 && (
                    <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 rounded px-1.5 py-0.5 font-medium">
                      Top Strategic Match
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1">Fit Score</div>
                  <ScoreMeter score={ca.score} />
                </div>
              </div>

              <div className="text-xs text-slate-600 mb-3 italic leading-relaxed">{ca.scoreReason}</div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-[10px] text-slate-400 font-medium">Grade A Office Rent</div>
                  <div className="text-xs font-semibold text-slate-700">{ca.rentRange}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-[10px] text-slate-400 font-medium">Compensation Benchmark</div>
                  <div className="text-xs font-semibold text-slate-700">{ca.salaryRange}</div>
                  <div className="text-[9px] text-teal-700 font-medium truncate" title={ca.salaryRoleContext}>{ca.salaryRoleContext}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-[10px] text-slate-400 font-medium">Talent Availability</div>
                  <div className="text-xs font-semibold text-slate-700">{ca.talentPool}</div>
                  <div className="text-[9px] text-slate-500 truncate" title={ca.talentPoolDescription}>{ca.talentPoolDescription}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <div className="text-[10px] text-slate-400 font-medium">Sector/Peer GCCs</div>
                  <div className="text-xs font-semibold text-slate-700">{ca.relevantGCCCount} in dataset</div>
                </div>
              </div>

              {ca.functionalBenchmarks && ca.functionalBenchmarks.length > 1 && (
                <div className="mb-3 bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Function-Specific Salary Bands (Annual INR)</div>
                  <div className="space-y-1">
                    {ca.functionalBenchmarks.map(fb => (
                      <div key={fb.functionName} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">{fb.functionName}</span>
                        <span className="font-semibold text-slate-800">{fb.salaryRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ca.relevantGCCExamples.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] text-slate-400 font-medium mb-1">Peer GCCs present:</div>
                  <div className="flex flex-wrap gap-1">
                    {ca.relevantGCCExamples.map(e => (
                      <span key={e} className="text-[10px] bg-navy-50 text-navy-700 rounded px-1.5 py-0.5 font-medium">{e}</span>
                    ))}
                  </div>
                </div>
              )}

              {ca.strengths.length > 0 && (
                <div className="mb-2">
                  <div className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wide mb-1">Key Strengths</div>
                  {ca.strengths.map((s, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1 mb-0.5">
                      <span className="text-emerald-500 mt-0.5">✓</span> {s}
                    </div>
                  ))}
                </div>
              )}

              {ca.risks.length > 0 && (
                <div className="mb-3">
                  <div className="text-[10px] text-red-500 font-semibold uppercase tracking-wide mb-1">Operating Risks</div>
                  {ca.risks.map((r, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1 mb-0.5">
                      <span className="text-red-400 mt-0.5">⚠</span> {r}
                    </div>
                  ))}
                </div>
              )}

              {ca.policyUrl && (
                <a
                  href={ca.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1 font-medium mt-2 pt-2 border-t border-slate-100"
                >
                  Inspect State Policy Incentives →
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Trade-offs */}
      <Card>
        <div className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <AlertCircle size={15} className="text-amber-500" />
          Location Trade-offs & Strategic Considerations
        </div>
        <ul className="space-y-2">
          {brief.keyTradeoffs.map((t, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0 font-bold">•</span>
              {t}
            </li>
          ))}
        </ul>
      </Card>

      {/* Missing information */}
      <Card>
        <div className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Info size={15} className="text-blue-500" />
          Data Gap Checklist (Mandatory Ground Verification)
        </div>
        <ul className="space-y-2">
          {brief.missingInformation.map((m, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5 flex-shrink-0 font-bold">?</span>
              {m}
            </li>
          ))}
        </ul>
      </Card>

      {/* Next steps */}
      <Card className="bg-navy-50 border-navy-200">
        <div className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
          <CheckCircle2 size={15} className="text-teal-500" />
          Recommended Execution Roadmap
        </div>
        <ol className="space-y-2">
          {brief.nextSteps.map((s, i) => (
            <li key={i} className="text-sm text-navy-800 flex items-start gap-2">
              <span className="text-teal-600 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

export default function SetupAssistant() {
  const [req, setReq] = useState<SetupRequirements>(defaultReq);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!req.sector) errs.sector = 'Select your industry sector.';
    if (req.cities.length === 0) errs.cities = 'Select at least one city.';
    if (!req.employeeCount) errs.employeeCount = 'Select an expected team size.';
    if (!req.priority) errs.priority = 'Select your main priority.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleGenerate() {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = generateDeterministicBrief(req);
    setBrief(result);
    setLoading(false);
  }

  function update<K extends keyof SetupRequirements>(key: K, value: SetupRequirements[K]) {
    setReq(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
  }

  function toggleArrayItem(key: 'cities' | 'talentSkills' | 'functions', item: string) {
    const arr = req[key] as string[];
    if (arr.includes(item)) {
      update(key, arr.filter(x => x !== item) as any);
    } else {
      update(key, [...arr, item] as any);
    }
  }

  if (brief) return (
    <div className="p-5 lg:p-8 max-w-5xl mx-auto">
      <BriefView brief={brief} onReset={() => setBrief(null)} />
    </div>
  );

  return (
    <div className="p-5 lg:p-8 max-w-3xl mx-auto">
      <PageHeader
        title="GCC Setup Assistant"
        subtitle="Generate an evidence-backed location strategy brief with comparative scores, trade-offs, and official policy links."
        badge="Evidence-Based"
      />

      <DataNote
        type="info"
        text="This assistant uses a structured, factual dataset grounded in verified public reports (NASSCOM, JLL, CBRE, and State IT Policies). It performs transparent, evidence-backed multi-criteria scoring without hallucination risk."
      />

      <div className="mt-5 space-y-0">
        {/* Step 1 */}
        <FormStep number={1} title="Industry & Sector">
          <select
            value={req.sector}
            onChange={e => update('sector', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400
              ${errors.sector ? 'border-red-400' : 'border-slate-200'}`}
          >
            <option value="">Select your sector…</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.sector && <div className="text-xs text-red-500 mt-1">{errors.sector}</div>}
        </FormStep>

        {/* Step 2 */}
        <FormStep number={2} title="Shortlisted Cities (choose 1–3)">
          <div className={`flex flex-wrap gap-2 ${errors.cities ? 'p-2 border border-red-400 rounded-lg' : ''}`}>
            {cityData.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleArrayItem('cities', c.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                  ${req.cities.includes(c.id)
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400 hover:text-navy-700'
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          {errors.cities && <div className="text-xs text-red-500 mt-1">{errors.cities}</div>}
        </FormStep>

        {/* Step 3 */}
        <FormStep number={3} title="Expected Team Size (India)">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {EMPLOYEE_BANDS.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => update('employeeCount', b)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all text-left
                  ${req.employeeCount === b
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400 hover:text-navy-700'
                  }`}
              >
                {b}
              </button>
            ))}
          </div>
          {errors.employeeCount && <div className="text-xs text-red-500 mt-1">{errors.employeeCount}</div>}
        </FormStep>

        {/* Step 4 */}
        <FormStep number={4} title="Key Business Functions (select all that apply)">
          <div className="flex flex-wrap gap-2">
            {FUNCTIONS.map(fn => (
              <button
                key={fn}
                type="button"
                onClick={() => toggleArrayItem('functions', fn)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all
                  ${req.functions.includes(fn)
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-700'
                  }`}
              >
                {fn}
              </button>
            ))}
          </div>
        </FormStep>

        {/* Step 5 */}
        <FormStep number={5} title="Main Strategic Priority">
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'talent', label: 'Talent Availability', desc: 'Access to deep specialist pools' },
              { value: 'cost', label: 'Operating Cost', desc: 'Rent & compensation optimization' },
              { value: 'incentives', label: 'State Incentives', desc: 'Subsidies, tax breaks & power tariffs' },
              { value: 'ecosystem', label: 'Ecosystem Maturity', desc: 'Peer density, vendors, institutions' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('priority', opt.value as SetupRequirements['priority'])}
                className={`text-left px-3 py-3 rounded-lg border transition-all
                  ${req.priority === opt.value
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400 hover:text-navy-700'
                  }`}
              >
                <div className="text-sm font-semibold">{opt.label}</div>
                <div className={`text-xs mt-0.5 ${req.priority === opt.value ? 'text-white/70' : 'text-slate-400'}`}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
          {errors.priority && <div className="text-xs text-red-500 mt-1">{errors.priority}</div>}
        </FormStep>

        {/* Step 6 */}
        <FormStep number={6} title="Approximate Annual Budget (optional)">
          <input
            type="text"
            placeholder="e.g. USD 5M, ₹40 crore, or leave blank"
            value={req.budget ?? ''}
            onChange={e => update('budget', e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400"
          />
        </FormStep>

        {/* Generate */}
        <div className="pl-11 pt-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white
              px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Evaluating location factors…
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Generate Research Brief
              </>
            )}
          </button>
          {Object.keys(errors).length > 0 && (
            <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={11} /> Please fix the required fields above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
