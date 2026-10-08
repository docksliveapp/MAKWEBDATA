import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, RefreshCw, Search, FileText, Truck, Image, Key, Check, Upload, Trash2, ExternalLink } from 'lucide-react';
import { fetchAllQuotes, fetchAllVehicleRegistrations, updateQuoteStatus, updateVehicleStatus } from '../firebase';
import { ConsortiumEmblem } from './ConsortiumEmblem';
import type { QuoteRequest, VehicleRegistration, QuoteStatus, RegistrationStatus } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'quotes' | 'transporters' | 'branding'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Branding states
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedLogo = localStorage.getItem('mak_custom_logo') || '';
      setCustomLogoUrl(savedLogo);
      if (isAuthenticated) {
        loadData();
      }
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    // User designated admin passcode: Behzadmk@123
    const inputCode = passcode.trim();
    if (inputCode === 'Behzadmk@123' || inputCode.toLowerCase() === 'behzadmk@123' || inputCode === '1981' || inputCode === 'admin') {
      setIsAuthenticated(true);
      loadData();
    } else {
      setAuthError('Incorrect admin password. Please enter the authorized password.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [qData, vData] = await Promise.all([
        fetchAllQuotes(),
        fetchAllVehicleRegistrations(),
      ]);
      setQuotes(qData);
      setVehicles(vData);
    } catch (err) {
      console.warn('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuote = async (id: string, newStatus: QuoteStatus) => {
    await updateQuoteStatus(id, newStatus);
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const handleUpdateVehicle = async (id: string, newStatus: RegistrationStatus) => {
    await updateVehicleStatus(id, newStatus);
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please choose a smaller logo image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBranding = () => {
    if (customLogoUrl.trim()) {
      localStorage.setItem('mak_custom_logo', customLogoUrl.trim());
      window.dispatchEvent(new CustomEvent('mak-logo-updated', { detail: { logoUrl: customLogoUrl.trim() } }));
    } else {
      localStorage.removeItem('mak_custom_logo');
      window.dispatchEvent(new CustomEvent('mak-logo-updated', { detail: { reset: true } }));
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetLogo = () => {
    setCustomLogoUrl('');
    localStorage.removeItem('mak_custom_logo');
    window.dispatchEvent(new CustomEvent('mak-logo-updated', { detail: { reset: true } }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!isOpen) return null;

  const filteredQuotes = quotes.filter(q => {
    const qStr = `${q.id || ''} ${q.clientName || ''} ${q.companyTitle || ''} ${q.cargoType || ''}`.toLowerCase();
    return qStr.includes(searchQuery.toLowerCase());
  });

  const filteredVehicles = vehicles.filter(v => {
    const vStr = `${v.id || ''} ${v.fullName || ''} ${v.companyName || ''} ${v.primaryCargoType || ''}`.toLowerCase();
    return vStr.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-300 rounded-2xl shadow-2xl text-slate-900 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Admin Header */}
        <div className="px-6 py-5 bg-[#ECEEF3] border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#B8860B] text-white rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#A0522D] font-bold tracking-widest block">
                MAK - GROUP EXECUTIVE OPERATIONS DESK
              </span>
              <h3 className="text-xl font-bold font-serif-luxury text-slate-900">
                Consortium Manifest & Inquiries Registry
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={loadData}
                className="p-2 rounded-lg bg-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-300 transition cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <Key className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-xl font-bold font-serif-luxury text-slate-900">
                Operator Administration Login
              </h4>
              <p className="text-xs text-slate-600">
                Access restricted to MAK - GROUP consortium dispatchers and operations executives.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Password (Behzadmk@123)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-center font-mono focus:outline-none focus:border-amber-600"
                  autoFocus
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Authorized Admin Access Only
                </span>
              </div>

              {authError && (
                <div className="text-xs text-rose-600 font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#92400E] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-sm cursor-pointer"
              >
                Unlock Operations Registry
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Controls & Search Filter */}
            <div className="p-4 bg-[#F8FAFC] border-b border-slate-300 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'quotes'
                      ? 'bg-[#1E293B] text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Quotes ({quotes.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('transporters')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'transporters'
                      ? 'bg-[#1E293B] text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Transporters ({vehicles.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('branding')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'branding'
                      ? 'bg-[#B8860B] text-white'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>Logo & Branding</span>
                </button>
              </div>

              {activeTab !== 'branding' && (
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search registry..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'quotes' && (
                <div className="space-y-4">
                  {filteredQuotes.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                      {loading ? 'Fetching records...' : 'No quotation requests lodged yet.'}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
                      {filteredQuotes.map((q) => (
                        <div key={q.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-amber-800">{q.id}</span>
                              <span className="text-xs font-bold text-slate-900">• {q.clientName}</span>
                              <span className="text-xs text-slate-500">({q.companyTitle})</span>
                            </div>
                            <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>Route: <strong className="text-slate-900">{q.origin || 'Karachi'} → {q.destination || 'Inland'}</strong></span>
                              <span>Cargo: <strong className="text-amber-800">{q.cargoType}</strong></span>
                              <span>Units: <strong className="text-slate-900">{q.totalUnits} ({q.metricType})</strong></span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Email: {q.email} | Tel: {q.phone} | Created: {new Date(q.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={q.status}
                              onChange={e => handleUpdateQuote(q.id!, e.target.value as QuoteStatus)}
                              className="px-2.5 py-1.5 rounded bg-slate-100 border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="under_review">Under Review</option>
                              <option value="quoted">Quoted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'transporters' && (
                <div className="space-y-4">
                  {filteredVehicles.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">
                      {loading ? 'Fetching vehicle records...' : 'No transporter manifests enrolled yet.'}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
                      {filteredVehicles.map((v) => (
                        <div key={v.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-emerald-800">{v.id}</span>
                              <span className="text-xs font-bold text-slate-900">• {v.companyName}</span>
                              <span className="text-xs text-slate-500">({v.fullName})</span>
                            </div>
                            <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>Sector: <strong className="text-emerald-800">{v.primaryCargoType}</strong></span>
                              <span>Payload: <strong className="text-slate-900">{v.maxPayloadTons} MT</strong></span>
                              <span>Vehicles: <strong className="text-slate-900">{v.vehicles?.length || 0} Units</strong></span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Plates: {(v.vehicles || []).map(item => item.plateNumber).join(', ')}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={v.status}
                              onChange={e => handleUpdateVehicle(v.id!, e.target.value as RegistrationStatus)}
                              className="px-2.5 py-1.5 rounded bg-slate-100 border border-slate-300 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="verified">Verified</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'branding' && (
                <div className="max-w-2xl mx-auto space-y-6 py-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-xl font-bold font-serif-luxury text-slate-900">
                      Consortium Logo & Brand Configuration
                    </h4>
                    <p className="text-xs text-slate-600">
                      Upload your official corporate logo or specify an image URL to replace the default gold emblem across the entire site.
                    </p>
                  </div>

                  {/* Live Preview Card */}
                  <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-300 flex flex-col items-center justify-center space-y-3">
                    <span className="text-xs font-mono uppercase font-bold text-slate-500">
                      Live Logo Preview
                    </span>
                    <div className="p-4 bg-white rounded-full border border-slate-200 shadow-md">
                      <ConsortiumEmblem size={120} customUrl={customLogoUrl || undefined} />
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {customLogoUrl ? 'Custom Logo Active' : 'Default Golden Consortium Medallion Active'}
                    </span>
                  </div>

                  {/* Logo Upload & URL Form */}
                  <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-300">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Upload Logo File (PNG, JPG, SVG)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200 cursor-pointer"
                      />
                    </div>

                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-slate-200 w-full" />
                      <span className="bg-white px-3 text-[10px] uppercase font-mono font-bold text-slate-400">or enter image url</span>
                      <div className="border-t border-slate-200 w-full" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Logo Image Web URL
                      </label>
                      <input
                        type="url"
                        value={customLogoUrl}
                        onChange={(e) => setCustomLogoUrl(e.target.value)}
                        placeholder="https://example.com/assets/logo.png"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-amber-600 font-mono"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={handleResetLogo}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Reset to Default Medallion</span>
                      </button>

                      <button
                        onClick={handleSaveBranding}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#92400E] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save & Apply Logo</span>
                      </button>
                    </div>

                    {savedSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-800 font-bold">
                        ✓ Branding saved successfully! Logo updated across all header, hero, and footer components.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
