import React, { useState } from 'react';
import { Navbar, type AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompaniesSection } from './components/CompaniesSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { AboutSection } from './components/AboutSection';
import { CorridorRoutes } from './components/CorridorRoutes';
import { ContactSection } from './components/ContactSection';
import { QuoteModal } from './components/QuoteModal';
import { TransporterModal } from './components/TransporterModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { InquiryPortalModal } from './components/InquiryPortalModal';
import { AdminPortal } from './components/AdminPortal';
import { DrivePortalSection } from './components/DrivePortalSection';
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
    if (page !== 'services') {
      setSelectedServiceDetail(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceDetail = (svc: ComprehensiveService) => {
    setSelectedServiceDetail(svc);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      
      {/* Navigation Header with Page Tabs & Services Dropdown */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenInquiry={() => setInquiryOpen(true)}
        onSelectServiceDetail={handleOpenServiceDetail}
      />

      {/* Distinct Separate Pages (No single endless scrolling page, No popups for service pages) */}
      <main className="flex-1">
        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Hero />
            <CompaniesSection onSelectServiceForQuote={handleOpenQuoteWithService} />
          </div>
        )}

        {/* 2. SERVICES PAGE / SERVICE DETAIL FULL PAGE */}
        {currentPage === 'services' && (
          <div className="animate-in fade-in duration-300">
            {selectedServiceDetail ? (
              <ServiceDetailPage
                service={selectedServiceDetail}
                onBack={() => {
                  setSelectedServiceDetail(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBookService={handleOpenQuoteWithService}
              />
            ) : (
              <ServicesSection
                onSelectServiceDetail={handleOpenServiceDetail}
                onRequestQuote={handleOpenQuoteWithService}
              />
            )}
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

        {/* 6. GOOGLE DRIVE LOGISTICS VAULT PAGE */}
        {currentPage === 'drive' && (
          <div className="animate-in fade-in duration-300">
            <DrivePortalSection />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Contact Button (Direct WhatsApp chat target wa.me/923218496006) */}
      <WhatsAppFloating />

      {/* Footer with Page Navigation */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* Action Modals */}
      <InquiryPortalModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        onOpenQuote={handleOpenQuote}
        onOpenTransporter={() => setTransporterOpen(true)}
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
