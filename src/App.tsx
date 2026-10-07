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
import { Truck, X, User, CheckCircle2, Lock } from 'lucide-react';

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [transporterOpen, setTransporterOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
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
    <div className="min-h-screen bg-[#ECEEF3] text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenTracker={() => setTrackerOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Cinematic Hero with Exact Medallion and Typography */}
        <Hero
          onOpenQuote={handleOpenQuote}
          onOpenTransporter={() => setTransporterOpen(true)}
          onOpenTracker={() => setTrackerOpen(true)}
        />

        {/* 4 Specialized Leaders & Executive Command Hub */}
        <CompaniesSection
          onSelectServiceForQuote={handleOpenQuoteWithService}
        />

        {/* Strategic Cross-Border Corridors */}
        <CorridorRoutes
          onQuoteCorridor={handleOpenQuoteWithService}
        />

        {/* Single-Window Unified Process Section */}
        <section id="governance" className="py-16 bg-[#ECEEF3] border-b border-slate-300/80">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] block font-mono">
                END-TO-END EXECUTION BLUEPRINT
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-luxury text-slate-900 mt-1">
                How the Single-Window Consortium Operates
              </h2>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm">
                Eliminating intermediate freight intermediaries. Your commercial consignments move seamlessly from vessel hatch to destination border under single-entity governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-white border border-slate-300 relative shadow-xs hover:shadow-md transition">
                <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 font-mono font-bold text-xs mb-3">
                  01
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-serif-luxury">
                  Port Discharge & Stevedoring
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Docks (Pvt) Ltd</strong> maneuvers vessel cranes and shore equipment at KPT & Port Qasim to discharge containers directly onto bonded marshaling chassis.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-white border border-slate-300 relative shadow-xs hover:shadow-md transition">
                <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-900 font-mono font-bold text-xs mb-3">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-serif-luxury">
                  NVOCC & Maritime Feeder
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Vantage Shipping Line</strong> coordinates feeder vessel slots from UAE (Jebel Ali / Hamriya), managing SOC container leasing, demurrage mitigation, and ocean transshipment.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl bg-white border border-slate-300 relative shadow-xs hover:shadow-md transition">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-900 font-mono font-bold text-xs mb-3">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-serif-luxury">
                  Bonded Telematics Haulage
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Truckit</strong> mobilizes GPS-geofenced prime movers and multi-axle trailers with real-time telematics from maritime docks across Pakistan's national motorways.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-xl bg-white border border-slate-300 relative shadow-xs hover:shadow-md transition">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-900 font-mono font-bold text-xs mb-3">
                  04
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 font-serif-luxury">
                  Afghan & TIR Customs Exit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Muhib International</strong> executes express customs clearance at Torkham & Chaman border gates, escorting convoys to Kabul or into Central Asia under TIR carnets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transporter Network Callout */}
        <section id="fleet" className="py-16 bg-[#ECEEF3] border-b border-slate-300/80">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white border border-slate-300 p-8 sm:p-12 shadow-sm">
              <div className="max-w-3xl space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-mono block">
                  TRUCKIT & MUHIB FLEET SYNDICATE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
                  Join Pakistan's Largest Bonded Commercial Haulage Fleet
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Fleet operators managing 40ft flatbeds, heavy low-bed movers, or refrigerated units are invited to enroll their equipment into the official MAK - GROUP bonded transport manifest for guaranteed cargo allocations and priority gate passes.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setTransporterOpen(true)}
                    className="px-5 py-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-slate-300" />
                    <span>Register Fleet Vehicles</span>
                  </button>

                  <button
                    onClick={() => setTrackerOpen(true)}
                    className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs tracking-wider transition cursor-pointer"
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

      {/* Simple Sign In Modal */}
      {signInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-300 rounded-2xl shadow-2xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[#B8860B] text-white">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="font-bold font-serif-luxury text-slate-900 text-base">
                  Consortium Portal Sign In
                </h3>
              </div>
              <button
                onClick={() => setSignInOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Access commercial rate inquiries, bonded consignment documentation, and transporter fleet manifests.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  defaultValue="docks.live.app@gmail.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs focus:border-amber-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Access PIN / Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSignInOpen(false);
                  setAdminOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Enter Executive Portal
              </button>
            </div>
          </div>
        </div>
      )}

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
