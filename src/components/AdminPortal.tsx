import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, RefreshCw, Search, FileText, Truck } from 'lucide-react';
import { fetchAllQuotes, fetchAllVehicleRegistrations, updateQuoteStatus, updateVehicleStatus } from '../firebase';
import type { QuoteRequest, VehicleRegistration, QuoteStatus, RegistrationStatus } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'transporters'>('quotes');
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

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
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-300 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls & Search Filter */}
        <div className="p-4 bg-[#F8FAFC] border-b border-slate-300 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
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
          </div>

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
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'quotes' ? (
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
          ) : (
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
        </div>
      </div>
    </div>
  );
};
