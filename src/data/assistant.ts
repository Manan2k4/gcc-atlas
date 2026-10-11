// Setup Assistant — Evidence-based deterministic analysis engine
// Generates structured setup research briefs by evaluating requirements against curated ground truth data.
// Dynamically adjusts salary bands, talent focus, and recommendations based on user-selected functions (HR, Ops, Finance, Tech, etc.)

import { cityData, type CityData, type FunctionalSalaryBenchmark } from './cities';
import { gccs } from './gccs';

export interface SetupRequirements {
  sector: string;
  cities: string[];
  employeeCount: string;
  talentSkills: string[];
  priority: 'talent' | 'cost' | 'incentives' | 'ecosystem';
  budget?: string;
  functions: string[];
}

export interface CityAnalysis {
  cityId: string;
  cityName: string;
  relevantGCCCount: number;
  relevantGCCExamples: string[];
  rentRange: string;
  salaryRange: string; // Tailored to chosen functions
  salaryRoleContext: string; // Explains which role benchmark this represents
  talentPool: string;
  talentPoolDescription: string;
  functionalBenchmarks: FunctionalSalaryBenchmark[];
  policyHighlights: string[];
  strengths: string[];
  risks: string[];
  policyUrl: string;
  score: number; // 1-10, based on requirements
  scoreReason: string;
}

export interface ResearchBrief {
  generatedAt: string;
  isAIGenerated: boolean;
  modelUsed?: string;
  requirements: SetupRequirements;
  cityAnalyses: CityAnalysis[];
  primaryRecommendation: string;
  keyTradeoffs: string[];
  missingInformation: string[];
  nextSteps: string[];
  disclaimer: string;
}

function scoreCityForRequirements(city: CityData, req: SetupRequirements): number {
  let score = 5;

  // Priority weighting
  if (req.priority === 'cost') {
    const rentMap: Record<string, number> = {
      chennai: 3, pune: 2, hyderabad: 1, bengaluru: -1, mumbai: -3,
    };
    score += (rentMap[city.id] ?? 0);
  } else if (req.priority === 'talent') {
    // If predominantly finance/accounting/legal, Mumbai & Bengaluru & Pune rank higher
    const isFinanceOrLegal = req.functions.some(f =>
      ['Finance & Accounting', 'Legal & Compliance'].includes(f)
    );
    if (isFinanceOrLegal && (city.id === 'mumbai' || city.id === 'pune')) {
      score += 2;
    }

    const talentMap: Record<string, number> = {
      bengaluru: 3, hyderabad: 2, pune: 1, chennai: 0, mumbai: isFinanceOrLegal ? 2 : -1,
    };
    score += (talentMap[city.id] ?? 0);
  } else if (req.priority === 'ecosystem') {
    const ecoMap: Record<string, number> = {
      bengaluru: 3, hyderabad: 2, pune: 1, chennai: 0, mumbai: 1,
    };
    score += (ecoMap[city.id] ?? 0);
  } else if (req.priority === 'incentives') {
    const incentiveMap: Record<string, number> = {
      hyderabad: 3, chennai: 2, pune: 1, bengaluru: 1, mumbai: -1,
    };
    score += (incentiveMap[city.id] ?? 0);
  }

  // Employee count: large headcount → talent depth matters more
  const headcount = parseInt(req.employeeCount.replace(/[^0-9]/g, '')) || 100;
  if (headcount > 500) {
    if (city.id === 'bengaluru') score += 2;
    else if (city.id === 'hyderabad') score += 1;
    else if (city.id === 'chennai') score += 1; // Great for large scaled operations
  }

  // Sector matching
  const sectorCityMatch: Record<string, string[]> = {
    'Financial Services': ['bengaluru', 'pune', 'mumbai', 'chennai'],
    'Technology': ['bengaluru', 'hyderabad', 'pune'],
    'Healthcare': ['bengaluru', 'hyderabad', 'chennai'],
    'Automotive': ['pune', 'chennai'],
    'Energy': ['bengaluru', 'hyderabad'],
    'Professional Services': ['bengaluru', 'hyderabad', 'pune', 'mumbai'],
    'Telecommunications': ['bengaluru', 'hyderabad', 'chennai'],
  };

  const matchCities = sectorCityMatch[req.sector] ?? [];
  if (matchCities.includes(city.id)) score += 1;

  return Math.min(10, Math.max(1, score));
}

function getScoreReason(city: CityData, req: SetupRequirements, score: number): string {
  const reasons: string[] = [];
  const selectedFns = req.functions.length > 0 ? req.functions : ['Software Engineering'];

  if (req.priority === 'cost' && ['chennai', 'pune'].includes(city.id)) {
    reasons.push('lower real estate and compensation cost structure aligns directly with your cost priority');
  }
  if (req.priority === 'talent') {
    if (city.id === 'bengaluru') {
      reasons.push('largest multi-functional and technology talent ecosystem in India');
    } else if (city.id === 'mumbai' && selectedFns.includes('Finance & Accounting')) {
      reasons.push('unrivaled financial, risk, and regulatory compliance talent pool');
    } else if (city.id === 'hyderabad') {
      reasons.push('rapidly expanding high-density skilled workforce with strong retention');
    }
  }
  if (req.priority === 'incentives' && city.id === 'hyderabad') {
    reasons.push('proactive Telangana state IT/ITES policy and employment subsidies');
  }
  if (selectedFns.some(f => ['Operations', 'Customer Service', 'HR & People Ops'].includes(f)) && ['chennai', 'pune'].includes(city.id)) {
    reasons.push('proven hub for stable, scaled business operations and shared services');
  }

  if (score >= 7) return `Strong fit: ${reasons.join(', ') || 'closely aligns with stated functional and location goals'}.`;
  if (score >= 5) return `Moderate fit: balance of advantages with notable trade-offs in talent density or operating cost.`;
  return `Selective fit: city profile diverges from primary priorities.`;
}

export function generateDeterministicBrief(req: SetupRequirements): ResearchBrief {
  const selectedCities = req.cities.length > 0
    ? cityData.filter(c => req.cities.includes(c.id))
    : cityData.filter(c => ['bengaluru', 'hyderabad', 'pune'].includes(c.id));

  // Determine dominant function or first selected function for contextual compensation
  const primaryFn = req.functions.length > 0 ? req.functions[0] : 'Software Engineering';

  const cityAnalyses: CityAnalysis[] = selectedCities.map(city => {
    // Filter relevant GCCs based on sector OR functions
    const relevantGCCs = gccs.filter(g => {
      const cityMatches = g.city === city.name;
      const sectorMatches = req.sector === '' || g.sector.toLowerCase().includes(req.sector.toLowerCase().split(' ')[0]?.toLowerCase() ?? '');
      const functionMatches = req.functions.length === 0 || g.functions.some(f => req.functions.includes(f));
      return cityMatches && (sectorMatches || functionMatches);
    });

    const score = scoreCityForRequirements(city, req);

    // Contextual salary benchmark
    const matchedBenchmark = city.functionalSalaries[primaryFn] || city.functionalSalaries['Software Engineering'];

    // Gather functional benchmarks for all selected functions
    const functionalBenchmarks: FunctionalSalaryBenchmark[] = req.functions.length > 0
      ? req.functions.map(f => city.functionalSalaries[f]).filter(Boolean)
      : [city.functionalSalaries['Software Engineering']];

    // Contextual talent pool description
    const isTechHeavy = req.functions.length === 0 || req.functions.some(f => ['Software Engineering', 'AI / ML', 'Data Science / Analytics'].includes(f));
    const talentDesc = isTechHeavy
      ? `${city.tier1TechTalent.value} active tech professionals`
      : `Extensive multi-functional workforce (Finance, Shared Services & Ops clusters)`;

    return {
      cityId: city.id,
      cityName: city.name,
      relevantGCCCount: relevantGCCs.length,
      relevantGCCExamples: relevantGCCs.slice(0, 3).map(g => g.companyName),
      rentRange: city.officeRent.confidence !== 'unavailable'
        ? `${city.officeRent.value} ${city.officeRent.unit ?? ''}`
        : 'Data unavailable',
      salaryRange: matchedBenchmark.salaryRange,
      salaryRoleContext: `${matchedBenchmark.functionName} (${matchedBenchmark.roleLevel})`,
      talentPool: city.tier1TechTalent.confidence !== 'unavailable' ? city.tier1TechTalent.value : 'Data unavailable',
      talentPoolDescription: talentDesc,
      functionalBenchmarks,
      policyHighlights: city.policies[0]?.highlights.slice(0, 3) ?? [],
      strengths: city.keyStrengths.slice(0, 3),
      risks: city.keyRisks.slice(0, 2),
      policyUrl: city.policies[0]?.officialUrl ?? '',
      score,
      scoreReason: getScoreReason(city, req, score),
    };
  });

  // Sort by score descending
  cityAnalyses.sort((a, b) => b.score - a.score);
  const topCity = cityAnalyses[0];

  const tradeoffs: string[] = [];
  const hasOpsOrHR = req.functions.some(f => ['Operations', 'HR & People Ops', 'Finance & Accounting'].includes(f));
  const hasTech = req.functions.some(f => ['Software Engineering', 'AI / ML', 'Data Science / Analytics'].includes(f));

  if (hasOpsOrHR && !hasTech) {
    tradeoffs.push('For Shared Services, HR, and Operations, Pune and Chennai offer 25-35% lower base compensation and lease costs compared to Bengaluru/Mumbai, with significantly lower attrition.');
  } else if (req.priority === 'talent') {
    tradeoffs.push('Bengaluru and Hyderabad provide unmatched talent volume, but command a 15–25% compensation premium and higher market attrition.');
  }

  if (req.priority === 'cost') {
    tradeoffs.push('Chennai and Pune deliver maximum real estate and operational cost efficiencies, but specialized domain architects and VP-level leaders may require relocation packages.');
  }

  if (parseInt(req.employeeCount.replace(/[^0-9]/g, '')) > 500) {
    tradeoffs.push('For a team size of 500+ employees, contiguous Grade A office space availability and public transit accessibility (metro connectivity) become major location bottlenecks.');
  }

  tradeoffs.push('Indian commercial leases customarily require a 3 to 5-year lock-in period with a 9-year total tenure; verify early termination and sub-leasing flexibility.');
  tradeoffs.push('Corporate structure selection (Wholly Owned Subsidiary vs. Branch vs. EOR model) carries distinct transfer pricing and FEMA compliance obligations.');

  return {
    generatedAt: new Date().toISOString(),
    isAIGenerated: false,
    requirements: req,
    cityAnalyses,
    primaryRecommendation: `Based on your stated priority (${req.priority}), sector (${req.sector}), and functional mix (${req.functions.join(', ') || 'General'}), ${topCity.cityName} scores highest in this assessment (${topCity.score}/10). ${topCity.scoreReason} Review the functional compensation bands and trade-offs below before finalizing location commitments.`,
    keyTradeoffs: tradeoffs,
    missingInformation: [
      `Specific salary bands for ${req.functions.length > 0 ? req.functions.join(', ') : 'your chosen roles'} at the 8-12 year leadership level in shortlisted locations`,
      'Current vacancy rates and contiguous floor-plate availability in specific micro-markets (e.g. Outer Ring Road vs HITEC City vs Hinjewadi)',
      'Statutory incentive eligibility criteria based on your entity’s capital expenditure thresholds and export commitments',
      'Local transfer pricing mark-up guidelines (customarily Cost-Plus 15-18% under safe harbor rules) vetted by a qualified tax advisor',
      'Compliance implications under the Digital Personal Data Protection Act (DPDPA 2023) for cross-border data transfers',
    ],
    nextSteps: [
      'Commission a detailed functional compensation and talent availability survey for your target headcount mix',
      `Schedule initial state investment consultations with ${cityAnalyses.slice(0, 2).map(c => c.cityName).join(' and ')} investment promotion bodies`,
      'Engage commercial real estate advisory to issue a Request for Proposal (RFP) for Grade A options',
      'Consult legal and tax advisors to determine optimal corporate entity structuring (Pvt Ltd Wholly Owned Subsidiary vs EOR)',
      'Plan a 3-day on-site reconnaissance visit to evaluate business parks, commute infrastructure, and peer GCC operations',
    ],
    disclaimer: 'This brief is compiled from verified public reports (NASSCOM-KPMG, JLL, CBRE, Michael Page, and State Gazettes). It structures preliminary location research and does not replace formal legal, tax, or commercial real estate due diligence.',
  };
}
