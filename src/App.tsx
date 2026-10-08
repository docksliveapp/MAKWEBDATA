import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesSection } from './components/CompaniesSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { CorridorRoutes } from './components/CorridorRoutes';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { TransporterModal } from './components/TransporterModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';
import type { ComprehensiveService } from './data/consortium';

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [transporterOpen, setTransporterOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ComprehensiveService | null>(null);

  const handleOpenQuoteWithService = (service: string) => {
    setPreselectedService(service);
    setQuoteOpen(true);
  };

  const handleOpenQuote = () => {
    setPreselectedService(undefined);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F9] via-[#EAEFF6] to-[#F5F7FB] text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cinematic Hero Section */}
        <Hero
          onOpenQuote={handleOpenQuote}
          onOpenTransporter={() => setTransporterOpen(true)}
        />

        {/* 4 Operating Companies Structure */}
        <CompaniesSection
          onSelectServiceForQuote={handleOpenQuoteWithService}
        />

        {/* Comprehensive Services Section (Bonded Carrier, Customs Clearance, Maritime, TIR, Afghan, Fleet) */}
        <ServicesSection
          onSelectServiceDetail={(svc) => setSelectedServiceDetail(svc)}
          onRequestQuote={handleOpenQuoteWithService}
        />

        {/* About Us (45+ Years Legacy, Leadership, 15 Stations, Corporate Clients, Gallery) */}
        <AboutSection />

        {/* Transcontinental Trade Corridors */}
        <CorridorRoutes
          onQuoteCorridor={handleOpenQuoteWithService}
        />
      </main>

      {/* Floating WhatsApp Contact Button (Targets 03218496006, discreet label) */}
      <WhatsAppFloating />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        isOpen={Boolean(selectedServiceDetail)}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={handleOpenQuoteWithService}
      />

      {/* Commercial Logistics Quotation Modal (Dispatches to info@mak-group.com.pk) */}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Transporter Fleet Registration Modal (Dispatches to info@mak-group.com.pk) */}
      <TransporterModal
        isOpen={transporterOpen}
        onClose={() => setTransporterOpen(false)}
      />

      {/* Status Verification Tracker */}
      <TrackInquiryModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />

      {/* Administration Registry Modal */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      {/* Footer with strictly info@mak-group.com.pk and discreet admin button */}
      <Footer
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

    </div>
  );
}

export default App;
