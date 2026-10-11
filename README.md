# GCC Atlas — India's GCC Intelligence & Setup Platform

A comprehensive enterprise-grade intelligence platform for multinational corporations evaluating, planning, and setting up Global Capability Centres (GCCs) in India.

---

## 🌟 Modules & Features

### 1. Overview Dashboard (`/`)
- **Key Industry Indicators:** Total GCC count, national GCC employee base (1.66M+), revenue estimates (₹4.46 Lakh Cr / NASSCOM-KPMG 2023).
- **Interactive Visualizations:**
  - Distribution of GCCs across major Indian tech hubs (Bengaluru, Hyderabad, Pune, Chennai, Mumbai).
  - Breakdown by industry sectors (Technology, BFSI, Healthcare, Automotive, etc.).
  - Country of origin analytics (US, UK, Germany, etc.).
- **Developments & Freshness:** Verified news, regulatory updates (DPDPA 2023), and state incentive milestones with direct source references.

### 2. GCC Explorer (`/explorer`)
- **Search & Multi-Dimensional Filtering:** Query by company name, parent company, headquarters country, Indian city, sector, and functional domains (Software Engineering, AI/ML, Risk Analytics, R&D).
- **Verification Labels:** Distinct statuses (`Verified`, `Reported`, `Demo`) ensuring transparency of factual claims.
- **Detailed Company Drawer:** Full parent breakdown, operational footprints, headcount estimates, notes, and direct external citations.

### 3. City Comparison (`/compare`)
- **Multi-City Benchmarking:** Select 2 or 3 cities to compare side-by-side.
- **Evidence-Backed Metrics:** Office rents (₹/sq ft/month), tech talent pool depth, mid-level software engineering salary benchmarks, infrastructure maturity, and GCC density.
- **Confidence Ratings:** Clear labeling of data quality (`High`, `Medium`, `Estimate / Low`, and transparent `Data unavailable` states).
- **Policy & Tech Park Profiles:** Direct official links to state policies (Karnataka IT/ITES 2020–25, Telangana ICT Policy 2021–26, Maharashtra IT Policy 2023, Tamil Nadu IT Policy 2021).

### 4. GCC Setup Assistant (`/assistant`)
- **Guided Strategic Workflow:** Input business domain, target Indian cities, expected team size, target functional areas, budget, and strategic priority (Talent Depth, Cost Optimization, State Subsidies, or Ecosystem Maturity).
- **Structured Research Brief:**
  - City comparative fit score (1–10) with algorithmic justification based on empirical data.
  - Granular trade-off evaluation and risk analysis.
  - Transparent data gap checklist: highlights missing information that requires ground verification before board sign-off.
  - Actionable phased roadmap for setup.
  - Print / Export friendly formatted layout.

### 5. Service Provider Directory (`/providers`)
- **Ecosystem Partners:** Curated listings across 6 key categories:
  - **Legal:** AZB & Partners, Trilegal, Cyril Amarchand Mangaldas.
  - **Accounting & Audit:** Big Four (Deloitte, KPMG) & Grant Thornton Bharat.
  - **Recruitment & Staffing:** TeamLease, Michael Page, Xpheno.
  - **Payroll & EOR:** Deel, Papaya Global, Safeguard Global.
  - **Commercial Real Estate:** JLL India, CBRE India, Knight Frank.
  - **GCC Management Consulting:** Zinnov, Everest Group, Deloitte GCC Advisory.
- **Publicly Documented Credentials:** Strict adherence to publicly verifiable mandates without fabricated reviews or ratings.

### 6. Data Sources & Methodology (`/methodology`)
- **Transparent Provenance:** Full documentation of primary sources (NASSCOM, JLL, CBRE, Ministry of Electronics & IT, State IT departments).
- **Methodology FAQ:** Clarifies definitions, verification tiers, calculation methods, and data limitations.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Custom enterprise navy & teal theme
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (responsive SVG charts with interactive tooltips)
- **Routing:** React Router DOM (v7)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation & Local Run
```bash
# 1. Navigate to the project directory
cd gcc-atlas

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment Guide (Publishing Live)

### Option 1: Vercel (Recommended - Fastest & Free)
1. **Using GitHub (Automatic):**
   - Push your code to a GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of GCC Atlas"
     git branch -M main
     git remote add origin <your-github-repo-url>
     git push -u origin main
     ```
   - Go to [vercel.com](https://vercel.com), click **"Add New Project"**, and import your repository.
   - Framework preset is automatically recognized as **Vite**.
   - Click **Deploy**. Vercel will provide an instant HTTPS URL (e.g. `gcc-atlas.vercel.app`).
   *(SPA routing is pre-configured via `vercel.json` so direct routes like `/assistant` or `/explorer` work seamlessly on refresh).*

2. **Using Vercel CLI (Direct from terminal):**
   ```bash
   cd gcc-atlas
   npx vercel
   ```
   Follow the login prompt in the browser, accept default project settings, and your site is published immediately.

### Option 2: Netlify (Drag & Drop or Git)
1. **Drag & Drop:**
   - Run `npm run build` inside `gcc-atlas`.
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop the `gcc-atlas/dist` folder.
2. **Via Git:**
   - Connect your GitHub repo on Netlify.
   - Build command: `npm run build`
   - Publish directory: `dist`
   *(SPA routing is pre-configured via `public/_redirects`).*

### Option 3: GitHub Pages
- Host directly from a GitHub repository using GitHub Actions (`actions/deploy-pages`).

## 🔒 Architecture & Deterministic Ground-Truth Engine

GCC Atlas runs a completely self-contained, deterministic multi-criteria scoring and synthesis engine. 
- **Zero API keys required:** Runs offline without reliance on third-party cloud LLM quotas or model outages.
- **Strictly Grounded:** All evaluations, rental ranges, and policy recommendations pull from verified public reports (NASSCOM-KPMG, JLL, CBRE, and Official State IT Department Gazettes).
- **Zero Hallucination:** Computations are 100% reproducible and grounded in empirical data.

---

## ⚖️ Disclaimer
*All figures are compiled from publicly accessible government publications, commercial real estate quarterly reports, and industry filings. GCC Atlas is designed for research structuring and preliminary strategic planning; corporate operators should independently verify all statutory, tax, and lease commitments.*
