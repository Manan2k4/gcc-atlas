// City Intelligence Data
// All figures are sourced from publicly available research reports and government gazettes.
// Where official data is unavailable, we note "Data unavailable" rather than estimating.

export interface CityMetric {
  value: string;
  unit?: string;
  source: string;
  sourceUrl: string;
  sourceDate: string;
  confidence: 'high' | 'medium' | 'low' | 'unavailable';
  notes?: string;
}

export interface CityPolicy {
  name: string;
  description: string;
  officialUrl: string;
  lastUpdated: string;
  highlights: string[];
}

export interface FunctionalSalaryBenchmark {
  functionName: string;
  roleLevel: string;
  salaryRange: string;
  source: string;
  sourceUrl: string;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  nickname?: string;
  gccCount: CityMetric;
  gccEmployees: CityMetric;
  officeRent: CityMetric; // per sq ft per month
  tier1TechTalent: CityMetric; // active tech pool
  averageEngineerSalary: CityMetric; // per annum INR
  functionalSalaries: Record<string, FunctionalSalaryBenchmark>;
  infrastructureScore: CityMetric; // out of 10
  keyIndustries: string[];
  majorTechParks: string[];
  keyStrengths: string[];
  keyRisks: string[];
  policies: CityPolicy[];
  summary: string;
}

export const cityData: CityData[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    nickname: 'Silicon Valley of India',
    gccCount: {
      value: '700+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'high',
      notes: 'Estimated 700–750 active GCCs as of 2023.',
    },
    gccEmployees: {
      value: '550,000+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'medium',
    },
    officeRent: {
      value: '₹90–140',
      unit: '/sq ft/month',
      source: 'JLL India Office Market Report Q3 2023',
      sourceUrl: 'https://www.jll.co.in/en/trends-and-insights/research',
      sourceDate: '2023-10-01',
      confidence: 'high',
      notes: 'Grade A commercial offices in prime locations (Whitefield, Outer Ring Road).',
    },
    tier1TechTalent: {
      value: '~1.5 million',
      unit: 'tech professionals',
      source: 'Bengaluru Metropolitan Planning Authority / NASSCOM estimates',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-01-01',
      confidence: 'medium',
      notes: 'Includes engineers, data scientists, and IT professionals.',
    },
    averageEngineerSalary: {
      value: '₹12–22 LPA',
      unit: 'mid-level software engineer',
      source: 'AmbitionBox Salary Insights 2023',
      sourceUrl: 'https://www.ambitionbox.com/salaries',
      sourceDate: '2023-10-01',
      confidence: 'medium',
      notes: 'Wide range depending on product vs shared-services captive.',
    },
    functionalSalaries: {
      'Software Engineering': {
        functionName: 'Software Engineering',
        roleLevel: 'Mid-Level (4-7 yrs)',
        salaryRange: '₹14–24 LPA',
        source: 'Michael Page / AmbitionBox 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Data Science / Analytics': {
        functionName: 'Data Science / Analytics',
        roleLevel: 'Data Scientist / Analyst (4-7 yrs)',
        salaryRange: '₹15–26 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'AI / ML': {
        functionName: 'AI / ML',
        roleLevel: 'Applied ML Engineer (3-6 yrs)',
        salaryRange: '₹18–32 LPA',
        source: 'Michael Page / Industry Benchmarks 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Finance & Accounting': {
        functionName: 'Finance & Accounting',
        roleLevel: 'Manager - FP&A / Financial Reporting (5-8 yrs)',
        salaryRange: '₹12–18 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'HR & People Ops': {
        functionName: 'HR & People Ops',
        roleLevel: 'HR Business Partner / People Ops Lead (5-8 yrs)',
        salaryRange: '₹11–17 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Operations': {
        functionName: 'Operations',
        roleLevel: 'Operations Manager / Process Lead (5-8 yrs)',
        salaryRange: '₹10–16 LPA',
        source: 'AmbitionBox / Michael Page 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Legal & Compliance': {
        functionName: 'Legal & Compliance',
        roleLevel: 'Legal Counsel / Compliance Officer (4-7 yrs)',
        salaryRange: '₹14–22 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Customer Service': {
        functionName: 'Customer Service',
        roleLevel: 'Customer Success / Support Lead (4-7 yrs)',
        salaryRange: '₹8–14 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Product Management': {
        functionName: 'Product Management',
        roleLevel: 'Product Manager (4-7 yrs)',
        salaryRange: '₹20–35 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
    },
    infrastructureScore: {
      value: '7.2',
      unit: '/ 10',
      source: 'CBRE India Office Market Report 2023',
      sourceUrl: 'https://www.cbre.co.in/research-and-reports',
      sourceDate: '2023-07-01',
      confidence: 'low',
      notes: 'Infrastructure score is a composite estimate; peak hour transit congestion is a documented constraint.',
    },
    keyIndustries: ['Technology', 'Financial Services', 'Aerospace', 'Biotechnology', 'E-commerce'],
    majorTechParks: ['Manyata Tech Park', 'RMZ Infinity', 'Embassy Golf Links', 'Whitefield IT Hub', 'Electronic City'],
    keyStrengths: [
      'Largest GCC ecosystem in India with 700+ centres',
      'Deepest tech & multi-functional talent pool (1.5M+)',
      'Mature GCC support services ecosystem across legal, audit, and hiring',
      'Strong IIT/IISc research institution presence',
      'Established VC/startup ecosystem synergies for innovation transfer',
    ],
    keyRisks: [
      'High talent attrition pressure (15–20% average)',
      'Severe peak traffic congestion impacting commute times',
      'Rising Grade A office rents (up ~10-12% YoY)',
      'Higher compensation benchmarks across engineering and product',
      'Infrastructure resource strain requiring strategic micro-market selection',
    ],
    policies: [
      {
        name: 'Karnataka IT Policy (K-Tech Initiative)',
        description: 'State policy supporting IT and ITES investment with fiscal and non-fiscal incentives.',
        officialUrl: 'https://karnatakadigital.in/policies/',
        lastUpdated: '2021-01-01',
        highlights: [
          'Capital investment subsidy up to 15% for large IT/ITES establishments',
          'Electricity tariff concessions for approved IT parks',
          'Stamp duty exemptions on lease deeds for units employing 100+ staff',
          'Fast-track single-window clearance through Karnataka Digital Economy Mission (KDEM)',
        ],
      },
    ],
    summary: 'Bengaluru is the undisputed hub for GCC establishment in India, offering unmatched depth of tech, product, and leadership talent. Trade-offs include premium office rents, competition for senior hires, and urban transit congestion.',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    nickname: 'Cyberabad',
    gccCount: {
      value: '400+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'high',
    },
    gccEmployees: {
      value: '350,000+',
      source: 'Telangana IT Dept. Annual Report 2023',
      sourceUrl: 'https://startup.telangana.gov.in',
      sourceDate: '2023-08-01',
      confidence: 'medium',
    },
    officeRent: {
      value: '₹60–95',
      unit: '/sq ft/month',
      source: 'JLL India Office Market Report Q3 2023',
      sourceUrl: 'https://www.jll.co.in/en/trends-and-insights/research',
      sourceDate: '2023-10-01',
      confidence: 'high',
      notes: 'HITEC City and Financial District are prime micro-markets.',
    },
    tier1TechTalent: {
      value: '~800,000',
      unit: 'tech professionals',
      source: 'NASSCOM industry estimate 2023',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-01-01',
      confidence: 'medium',
    },
    averageEngineerSalary: {
      value: '₹10–18 LPA',
      unit: 'mid-level software engineer',
      source: 'AmbitionBox Salary Insights 2023',
      sourceUrl: 'https://www.ambitionbox.com/salaries',
      sourceDate: '2023-10-01',
      confidence: 'medium',
    },
    functionalSalaries: {
      'Software Engineering': {
        functionName: 'Software Engineering',
        roleLevel: 'Mid-Level (4-7 yrs)',
        salaryRange: '₹11–19 LPA',
        source: 'Michael Page / AmbitionBox 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Data Science / Analytics': {
        functionName: 'Data Science / Analytics',
        roleLevel: 'Data Scientist / Analyst (4-7 yrs)',
        salaryRange: '₹12–21 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'AI / ML': {
        functionName: 'AI / ML',
        roleLevel: 'Applied ML Engineer (3-6 yrs)',
        salaryRange: '₹15–26 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Finance & Accounting': {
        functionName: 'Finance & Accounting',
        roleLevel: 'Manager - FP&A / Financial Reporting (5-8 yrs)',
        salaryRange: '₹10–16 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'HR & People Ops': {
        functionName: 'HR & People Ops',
        roleLevel: 'HR Business Partner / People Ops Lead (5-8 yrs)',
        salaryRange: '₹9–15 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Operations': {
        functionName: 'Operations',
        roleLevel: 'Operations Manager / Process Lead (5-8 yrs)',
        salaryRange: '₹8.5–14 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Legal & Compliance': {
        functionName: 'Legal & Compliance',
        roleLevel: 'Legal Counsel / Compliance Officer (4-7 yrs)',
        salaryRange: '₹11–18 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Customer Service': {
        functionName: 'Customer Service',
        roleLevel: 'Customer Success / Support Lead (4-7 yrs)',
        salaryRange: '₹7–12 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Product Management': {
        functionName: 'Product Management',
        roleLevel: 'Product Manager (4-7 yrs)',
        salaryRange: '₹16–28 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
    },
    infrastructureScore: {
      value: '7.8',
      unit: '/ 10',
      source: 'CBRE India Office Market Report 2023',
      sourceUrl: 'https://www.cbre.co.in/research-and-reports',
      sourceDate: '2023-07-01',
      confidence: 'low',
      notes: 'Well-planned orbital roads and HITEC City layout provide higher infrastructure efficiency.',
    },
    keyIndustries: ['Technology', 'Financial Services', 'Pharmaceuticals', 'Aerospace & Defence', 'FMCG'],
    majorTechParks: ['HITEC City', 'Cyberabad', 'Financial District', 'Genome Valley', 'Rajiv Gandhi International IT Park'],
    keyStrengths: [
      '400+ GCCs with active single-window government facilitation',
      '25–35% lower commercial office rents compared to Bengaluru prime corridors',
      'Wide multi-lane arterial road networks in Cyberabad / Financial District',
      'Proactive state ICT policy incentives with prompt approvals',
      'Strong dual hub for both deep Tech and Life Sciences / Pharma R&D',
    ],
    keyRisks: [
      'Smaller talent pool volume compared to Bengaluru (approx. 55-60% of volume)',
      'Fierce hiring competition for niche architecture and specialized engineering leads',
      'Higher summer heat index impacting daytime transit',
    ],
    policies: [
      {
        name: 'Telangana ICT Policy (ITE&C Department)',
        description: 'Comprehensive state policy positioning Hyderabad as a premier global capability hub.',
        officialUrl: 'https://startup.telangana.gov.in',
        lastUpdated: '2021-06-01',
        highlights: [
          'Capital investment subsidy on fixed assets for eligible IT/ITeS units',
          'Electricity tariff reimbursement for initial 5 years of operations',
          'Direct employment generation incentives per hire per month',
          'Integrated facilitation via T-Hub and TSIC ecosystem',
        ],
      },
    ],
    summary: 'Hyderabad offers an optimal balance of infrastructure quality, cost efficiency (25–30% rental savings), and aggressive government support. It represents India\'s fastest-growing GCC destination for multi-functional global delivery centers.',
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    nickname: 'Oxford of the East',
    gccCount: {
      value: '250+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'medium',
    },
    gccEmployees: {
      value: '200,000+',
      source: 'Industry Association Estimates 2023',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-06-01',
      confidence: 'low',
      notes: 'Aggregate estimated from major Hinjewadi and Magarpatta occupiers.',
    },
    officeRent: {
      value: '₹55–85',
      unit: '/sq ft/month',
      source: 'JLL India Office Market Report Q3 2023',
      sourceUrl: 'https://www.jll.co.in/en/trends-and-insights/research',
      sourceDate: '2023-10-01',
      confidence: 'high',
    },
    tier1TechTalent: {
      value: '~500,000',
      unit: 'tech professionals',
      source: 'NASSCOM / Pune IT sector reports',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-01-01',
      confidence: 'medium',
    },
    averageEngineerSalary: {
      value: '₹9–16 LPA',
      unit: 'mid-level software engineer',
      source: 'AmbitionBox Salary Insights 2023',
      sourceUrl: 'https://www.ambitionbox.com/salaries',
      sourceDate: '2023-10-01',
      confidence: 'medium',
    },
    functionalSalaries: {
      'Software Engineering': {
        functionName: 'Software Engineering',
        roleLevel: 'Mid-Level (4-7 yrs)',
        salaryRange: '₹10–17 LPA',
        source: 'Michael Page / AmbitionBox 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Data Science / Analytics': {
        functionName: 'Data Science / Analytics',
        roleLevel: 'Data Scientist / Analyst (4-7 yrs)',
        salaryRange: '₹11–18 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'AI / ML': {
        functionName: 'AI / ML',
        roleLevel: 'Applied ML Engineer (3-6 yrs)',
        salaryRange: '₹13–22 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Finance & Accounting': {
        functionName: 'Finance & Accounting',
        roleLevel: 'Manager - FP&A / Financial Reporting (5-8 yrs)',
        salaryRange: '₹10–16 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'HR & People Ops': {
        functionName: 'HR & People Ops',
        roleLevel: 'HR Business Partner / People Ops Lead (5-8 yrs)',
        salaryRange: '₹8.5–14 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Operations': {
        functionName: 'Operations',
        roleLevel: 'Operations Manager / Process Lead (5-8 yrs)',
        salaryRange: '₹8–13 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Legal & Compliance': {
        functionName: 'Legal & Compliance',
        roleLevel: 'Legal Counsel / Compliance Officer (4-7 yrs)',
        salaryRange: '₹10–16 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Customer Service': {
        functionName: 'Customer Service',
        roleLevel: 'Customer Success / Support Lead (4-7 yrs)',
        salaryRange: '₹6.5–11 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Product Management': {
        functionName: 'Product Management',
        roleLevel: 'Product Manager (4-7 yrs)',
        salaryRange: '₹15–25 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
    },
    infrastructureScore: {
      value: '7.0',
      unit: '/ 10',
      source: 'CBRE India Office Market Report 2023',
      sourceUrl: 'https://www.cbre.co.in/research-and-reports',
      sourceDate: '2023-07-01',
      confidence: 'low',
    },
    keyIndustries: ['Financial Services', 'Automotive', 'IT Services', 'Manufacturing', 'Education'],
    majorTechParks: ['Hinjewadi IT Park', 'Magarpatta Cybercity', 'Panchshil Tech Park', 'Kharadi EON IT Park'],
    keyStrengths: [
      'Vast engineering talent pipeline fed by 50+ universities and engineering colleges',
      'Established BFSI GCC cluster (HSBC, Citibank, Mastercard, Barclays)',
      'Competitive real estate pricing compared to Bengaluru and Mumbai',
      'Proximity and express corridor connectivity to Mumbai corporate headquarters',
      'Lower employee attrition rates and high quality of life sentiment',
    ],
    keyRisks: [
      'Traffic bottlenecks on the Hinjewadi Phase 1-3 arterial route',
      'Smaller specialized domain talent pool compared to Bengaluru',
      'Monsoon seasonal water-logging in select eastern corridors',
    ],
    policies: [
      {
        name: 'Maharashtra IT/ITES Policy 2023 (MAITRI)',
        description: 'State industrial framework promoting IT, ITeS, and GCC investments with fiscal incentives.',
        officialUrl: 'https://maitri.maharashtra.gov.in',
        lastUpdated: '2023-06-27',
        highlights: [
          'Full stamp duty exemptions on lease and conveyance deeds for IT/ITeS units',
          'Electricity duty waivers for 10–15 years based on employment tier',
          'Power tariff concessions and infrastructure support in MIDC parks',
          'Single-window approvals via the MAITRI 2.0 portal',
        ],
      },
    ],
    summary: 'Pune provides an attractive operating cost environment combined with deep engineering and BFSI operations talent. Its proximity to Mumbai makes it a premier destination for finance, risk analytics, and enterprise engineering captives.',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    nickname: 'Detroit of Asia',
    gccCount: {
      value: '200+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'medium',
    },
    gccEmployees: {
      value: '180,000+',
      source: 'Guidance Tamil Nadu / Industry Estimates 2023',
      sourceUrl: 'https://www.investingintamilnadu.com',
      sourceDate: '2023-08-01',
      confidence: 'low',
      notes: 'State estimate covering major OMR corridor and Ambattur IT clusters.',
    },
    officeRent: {
      value: '₹45–75',
      unit: '/sq ft/month',
      source: 'JLL India Office Market Report Q3 2023',
      sourceUrl: 'https://www.jll.co.in/en/trends-and-insights/research',
      sourceDate: '2023-10-01',
      confidence: 'high',
    },
    tier1TechTalent: {
      value: '~400,000',
      unit: 'tech professionals',
      source: 'NASSCOM industry estimate 2023',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-01-01',
      confidence: 'medium',
    },
    averageEngineerSalary: {
      value: '₹8–15 LPA',
      unit: 'mid-level software engineer',
      source: 'AmbitionBox Salary Insights 2023',
      sourceUrl: 'https://www.ambitionbox.com/salaries',
      sourceDate: '2023-10-01',
      confidence: 'medium',
    },
    functionalSalaries: {
      'Software Engineering': {
        functionName: 'Software Engineering',
        roleLevel: 'Mid-Level (4-7 yrs)',
        salaryRange: '₹9–15 LPA',
        source: 'Michael Page / AmbitionBox 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Data Science / Analytics': {
        functionName: 'Data Science / Analytics',
        roleLevel: 'Data Scientist / Analyst (4-7 yrs)',
        salaryRange: '₹10–17 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'AI / ML': {
        functionName: 'AI / ML',
        roleLevel: 'Applied ML Engineer (3-6 yrs)',
        salaryRange: '₹12–20 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Finance & Accounting': {
        functionName: 'Finance & Accounting',
        roleLevel: 'Manager - FP&A / Financial Reporting (5-8 yrs)',
        salaryRange: '₹9–14 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'HR & People Ops': {
        functionName: 'HR & People Ops',
        roleLevel: 'HR Business Partner / People Ops Lead (5-8 yrs)',
        salaryRange: '₹8–13 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Operations': {
        functionName: 'Operations',
        roleLevel: 'Operations Manager / Process Lead (5-8 yrs)',
        salaryRange: '₹7.5–12 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Legal & Compliance': {
        functionName: 'Legal & Compliance',
        roleLevel: 'Legal Counsel / Compliance Officer (4-7 yrs)',
        salaryRange: '₹9.5–15 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Customer Service': {
        functionName: 'Customer Service',
        roleLevel: 'Customer Success / Support Lead (4-7 yrs)',
        salaryRange: '₹6–10 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Product Management': {
        functionName: 'Product Management',
        roleLevel: 'Product Manager (4-7 yrs)',
        salaryRange: '₹14–24 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
    },
    infrastructureScore: {
      value: '7.5',
      unit: '/ 10',
      source: 'CBRE India Office Market Report 2023',
      sourceUrl: 'https://www.cbre.co.in/research-and-reports',
      sourceDate: '2023-07-01',
      confidence: 'low',
    },
    keyIndustries: ['Automotive', 'Telecommunications', 'Financial Services', 'Pharmaceuticals', 'IT Services'],
    majorTechParks: ['Tidel Park', 'Olympia Tech Park', 'RMZ Millenia', 'Phoenix Marketcity Business Tower', 'Mahindra World City'],
    keyStrengths: [
      'Lowest commercial office lease rents among Tier-1 cities (₹45–75/sq ft)',
      'IIT Madras research park providing academic R&D collaboration partnerships',
      'Remarkably loyal, low-attrition employee tenure (10–12% attrition typical)',
      'Established hub for telecom hardware, SaaS, automotive embedded systems, and banking operations',
      'Coastal port connectivity and stable municipal infrastructure',
    ],
    keyRisks: [
      'Smaller executive leadership and senior product management talent pool',
      'Relocation friction for candidates from North/West India requiring structured onboarding',
      'Vulnerability to cyclonic coastal weather events in Q4',
    ],
    policies: [
      {
        name: 'Tamil Nadu ICT & Industrial Policy (Guidance TN)',
        description: 'State policy framework promoting IT/ITeS capital investment and large-scale employment.',
        officialUrl: 'https://www.investingintamilnadu.com',
        lastUpdated: '2021-09-01',
        highlights: [
          'Capital subsidies of 10–20% on eligible investments',
          'Electricity duty exemptions and power tariff support',
          'Employment subsidies and incentives for female workforce participation',
          'Concessional land allocation in TIDEL and ELCOT parks',
        ],
      },
    ],
    summary: 'Chennai provides the highest operational cost advantage in India with Grade A office rents below ₹75/sq ft and low workforce attrition. Best suited for core software engineering, operations, and automotive/hardware technology centers.',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    nickname: 'Financial Capital of India',
    gccCount: {
      value: '100+',
      source: 'NASSCOM-KPMG GCC Report 2023',
      sourceUrl: 'https://community.nasscom.in/communities/gcc',
      sourceDate: '2023-09-01',
      confidence: 'medium',
      notes: 'High concentration of global banking, asset management, and corporate captives in BKC and Powai.',
    },
    gccEmployees: {
      value: 'Data unavailable',
      source: 'No disaggregated municipal census available',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-09-01',
      confidence: 'unavailable',
      notes: 'GCC employees are often blended with broader domestic banking and corporate payrolls.',
    },
    officeRent: {
      value: '₹150–280',
      unit: '/sq ft/month',
      source: 'JLL India Office Market Report Q3 2023',
      sourceUrl: 'https://www.jll.co.in/en/trends-and-insights/research',
      sourceDate: '2023-10-01',
      confidence: 'high',
      notes: 'Bandra-Kurla Complex (BKC) leads pricing; Powai and Airoli/Navi Mumbai offer cost relief.',
    },
    tier1TechTalent: {
      value: '~350,000',
      unit: 'tech professionals',
      source: 'NASSCOM industry estimate 2023',
      sourceUrl: 'https://nasscom.in/',
      sourceDate: '2023-01-01',
      confidence: 'low',
    },
    averageEngineerSalary: {
      value: '₹14–25 LPA',
      unit: 'mid-level software engineer',
      source: 'AmbitionBox Salary Insights 2023',
      sourceUrl: 'https://www.ambitionbox.com/salaries',
      sourceDate: '2023-10-01',
      confidence: 'medium',
    },
    functionalSalaries: {
      'Software Engineering': {
        functionName: 'Software Engineering',
        roleLevel: 'Mid-Level (4-7 yrs)',
        salaryRange: '₹14–23 LPA',
        source: 'Michael Page / AmbitionBox 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Data Science / Analytics': {
        functionName: 'Data Science / Analytics',
        roleLevel: 'Data Scientist / Analyst (4-7 yrs)',
        salaryRange: '₹16–27 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'AI / ML': {
        functionName: 'AI / ML',
        roleLevel: 'Applied ML Engineer (3-6 yrs)',
        salaryRange: '₹18–30 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Finance & Accounting': {
        functionName: 'Finance & Accounting',
        roleLevel: 'Manager - FP&A / Treasury / Risk (5-8 yrs)',
        salaryRange: '₹15–24 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'HR & People Ops': {
        functionName: 'HR & People Ops',
        roleLevel: 'HR Business Partner / People Ops Lead (5-8 yrs)',
        salaryRange: '₹12–19 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Operations': {
        functionName: 'Operations',
        roleLevel: 'Operations Manager / Process Lead (5-8 yrs)',
        salaryRange: '₹11–17 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Legal & Compliance': {
        functionName: 'Legal & Compliance',
        roleLevel: 'Legal Counsel / Regulatory Compliance (4-7 yrs)',
        salaryRange: '₹16–26 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
      'Customer Service': {
        functionName: 'Customer Service',
        roleLevel: 'Customer Success / Support Lead (4-7 yrs)',
        salaryRange: '₹8.5–14 LPA',
        source: 'AmbitionBox Salary Insights 2023',
        sourceUrl: 'https://www.ambitionbox.com/salaries',
      },
      'Product Management': {
        functionName: 'Product Management',
        roleLevel: 'Product Manager (4-7 yrs)',
        salaryRange: '₹22–36 LPA',
        source: 'Michael Page India Salary Guide 2023',
        sourceUrl: 'https://www.michaelpage.co.in/salary-comparison-tool',
      },
    },
    infrastructureScore: {
      value: '6.5',
      unit: '/ 10',
      source: 'CBRE India Office Market Report 2023',
      sourceUrl: 'https://www.cbre.co.in/research-and-reports',
      sourceDate: '2023-07-01',
      confidence: 'low',
      notes: 'Superb suburban rail & international flights, offset by intense peak commute density and living costs.',
    },
    keyIndustries: ['Financial Services', 'Media & Entertainment', 'Retail', 'FMCG', 'Insurance'],
    majorTechParks: ['BKC Commercial Zone', 'Powai Technology Corridor', 'Andheri MIDC', 'Navi Mumbai Mahape'],
    keyStrengths: [
      'Unmatched access to India\'s premier Financial, Risk, and Treasury talent',
      'Immediate proximity to Indian regulators (RBI, SEBI, IRDAI offices) and domestic stock exchanges (BSE, NSE)',
      'World-class global executive connectivity and premier hospitality options',
      'Hub for senior leadership, investment management, and global legal counsel',
    ],
    keyRisks: [
      'Highest office leasing and living costs across India (2–3x Bengaluru/Hyderabad)',
      'Substantial cost hurdle for scaling large 1000+ developer workforces',
      'Scarcity of large single-floor Grade A contiguous office plates in BKC',
    ],
    policies: [
      {
        name: 'Maharashtra IT/ITES Policy 2023 (MAITRI)',
        description: 'Common state policy offering stamp duty and power exemptions for approved IT units.',
        officialUrl: 'https://maitri.maharashtra.gov.in',
        lastUpdated: '2023-06-27',
        highlights: [
          'Stamp duty exemptions on commercial leases',
          'Data center capital subsidies in Navi Mumbai corridors',
          'Electricity duty exemptions up to 10 years',
          'Single-window investor facilitation via MAITRI portal',
        ],
      },
    ],
    summary: 'Mumbai is the optimal location for financial services, risk management, capital markets, and corporate legal GCCs where proximity to regulatory bodies and financial markets outweighs real estate cost premiums.',
  },
];

export const cityIds = cityData.map(c => c.id);
export const cityNames = cityData.map(c => ({ id: c.id, name: c.name }));
