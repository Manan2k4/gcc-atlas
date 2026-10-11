import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar, Topbar } from './components/Layout';
import Overview from './pages/Overview';
import Explorer from './pages/Explorer';
import CityComparison from './pages/CityComparison';
import SetupAssistant from './pages/SetupAssistant';
import Providers from './pages/Providers';
import Methodology from './pages/Methodology';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8f9fc]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="lg:ml-56 flex flex-col min-h-screen">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/compare" element={<CityComparison />} />
              <Route path="/assistant" element={<SetupAssistant />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/methodology" element={<Methodology />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
