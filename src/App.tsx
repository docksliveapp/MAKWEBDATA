import React, { useState } from 'react';
import { Navbar, type AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesSection } from './components/CompaniesSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { CorridorRoutes } from './components/CorridorRoutes';
import { ContactSection } from './components/ContactSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { QuoteModal } from './components/QuoteModal';
import { TransporterModal } from './components/TransporterModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { InquiryPortalModal } from './components/InquiryPortalModal';
import { AdminPortal } from './components/AdminPortal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';
import type { ComprehensiveService } from './data/consortium';

export function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [transporterOpen, setTransporterOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
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

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F9] via-[#EAEFF6] to-[#F5F7FB] text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      
      {/* Navigation Header with Page Tabs & Services Dropdown */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenInquiry={() => setInquiryOpen(true)}
        onSelectServiceDetail={(svc) => {
          setSelectedServiceDetail(svc);
        }}
      />

      {/* Distinct Separate Pages (No single endless scrolling page) */}
      <main className="flex-1">
        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Hero />
            <CompaniesSection onSelectServiceForQuote={handleOpenQuoteWithService} />
          </div>
        )}

        {/* 2. SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="animate-in fade-in duration-300">
            <ServicesSection
              onSelectServiceDetail={(svc) => setSelectedServiceDetail(svc)}
              onRequestQuote={handleOpenQuoteWithService}
            />
          </div>
        )}

        {/* 3. ABOUT US PAGE */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <AboutSection onSelectServiceForQuote={handleOpenQuoteWithService} />
          </div>
        )}

        {/* 4. CORRIDORS PAGE */}
        {currentPage === 'corridors' && (
          <div className="animate-in fade-in duration-300">
            <CorridorRoutes onQuoteCorridor={handleOpenQuoteWithService} />
          </div>
        )}

        {/* 5. CONTACT US PAGE */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Contact Button (Direct WhatsApp chat target 03218496006) */}
      <WhatsAppFloating />

      {/* Footer with Page Navigation */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* Modals & Overlays */}
      <InquiryPortalModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
      />

      <ServiceDetailModal
        service={selectedServiceDetail}
        isOpen={Boolean(selectedServiceDetail)}
        onClose={() => setSelectedServiceDetail(null)}
        onBookService={handleOpenQuoteWithService}
      />

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
    </div>
  );
}

export default App;
