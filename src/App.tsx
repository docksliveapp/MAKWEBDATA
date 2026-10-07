import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesSection } from './components/CompaniesSection';
import { CorridorRoutes } from './components/CorridorRoutes';
import { QuoteModal } from './components/QuoteModal';
import { TransporterModal } from './components/TransporterModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileCheck2, 
  Truck, 
  Anchor, 
  Globe2, 
  Cpu, 
  Lock, 
  CheckCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [transporterOpen, setTransporterOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenQuoteWithService = (service: string) => {
    setPreselectedService(service);
    setQuoteOpen(true);
  };

  const handleOpenQuote = () => {
    setPreselectedService(undefined);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenTracker={() => setTrackerOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Cinematic Hero with Strategic Positioning */}
        <Hero
          onOpenQuote={handleOpenQuote}
          onOpenTransporter={() => setTransporterOpen(true)}
          onOpenTracker={() => setTrackerOpen(true)}
        />

        {/* 4 Pillars Consortium Deep-Dive */}
        <CompaniesSection
          onSelectServiceForQuote={handleOpenQuoteWithService}
        />

        {/* Strategic Cross-Border Corridors */}
        <CorridorRoutes
          onQuoteCorridor={handleOpenQuoteWithService}
        />

        {/* Single-Window Unified Process Section */}
        <section id="compliance" className="py-20 bg-slate-900/60 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold block mb-2">
                END-TO-END EXECUTION BLUEPRINT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white">
                How the Single-Window Consortium Operates
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base">
                Eliminating intermediate freight brokers. Your cargo moves seamlessly from ship berth to border gate under one bonded bill of lading.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-amber-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 font-mono font-bold mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">
                  Port Discharge & Stevedoring
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Docks (Pvt) Ltd</strong> maneuvers vessel cranes and shore equipment at KPT & Port Qasim to discharge containers directly onto bonded marshaling chassis.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-amber-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-mono font-bold mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">
                  NVOCC & Maritime Feeder
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Vantage Shipping Line</strong> coordinates feeder vessel slots from UAE (Jebel Ali / Hamriya), managing SOC container leasing, demurrage mitigation, and ocean transshipment.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-amber-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-mono font-bold mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">
                  Bonded Telematics Haulage
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Truckit</strong> mobilizes GPS-geofenced prime movers and multi-axle trailers with real-time telematics from maritime docks across Pakistan's national motorways.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative group hover:border-amber-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-mono font-bold mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-serif-luxury">
                  Afghan & TIR Customs Exit
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Muhib International</strong> executes express customs clearance at Torkham & Chaman border gates, escorting convoys to Kabul or into Central Asia under TIR carnets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transporter Network Callout */}
        <section id="fleet" className="py-20 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              <div className="max-w-2xl space-y-4">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest block">
                  TRUCKIT & MUHIB FLEET SYNDICATE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-luxury text-white">
                  Join Pakistan's Largest Bonded Heavy Haulage Fleet
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Are you a fleet operator with 40ft flatbeds, low-bed heavy movers, or reefer units? Enroll your trucks into our guaranteed cargo manifest system with fast automated turnarounds and priority terminal passes.
                </p>
                <div className="pt-3 flex flex-wrap gap-4">
                  <button
                    onClick={() => setTransporterOpen(true)}
                    className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Register Fleet Vehicles</span>
                  </button>

                  <button
                    onClick={() => setTrackerOpen(true)}
                    className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs tracking-wider transition"
                  >
                    Check Registration Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Modals */}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        preselectedService={preselectedService}
      />

      <TransporterModal
        isOpen={transporterOpen}
        onClose={() => setTransporterOpen(false)}
      />

      <TrackInquiryModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />

      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />
    </div>
  );
}

export default App;
