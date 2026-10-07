import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle, AlertCircle, FileText, Truck, Calendar } from 'lucide-react';
import { lookupInquiry } from '../firebase';

interface TrackInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackInquiryModal: React.FC<TrackInquiryModalProps> = ({ isOpen, onClose }) => {
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await lookupInquiry(refId.trim());
      if (res.notFound || !res.data) {
        setError('No record found matching this Reference ID. Please verify your reference format (e.g. MAK-QT-... or MAK-TR-...).');
      } else {
        setResult(res);
      }
    } catch (err: any) {
      setError(err?.message || 'Error occurred while looking up record.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 border border-amber-300 text-xs font-semibold uppercase">Pending Operations Review</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 border border-blue-300 text-xs font-semibold uppercase">Under Active Calculation</span>;
      case 'quoted':
        return <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold uppercase">Commercial Quote Issued</span>;
      case 'verified':
      case 'approved':
        return <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold uppercase">Fleet Approved</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded bg-red-100 text-red-800 border border-red-300 text-xs font-semibold uppercase">Rejected</span>;
      case 'archived':
        return <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 text-xs font-semibold uppercase">Archived</span>;
      default:
        return <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold uppercase">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-2xl shadow-2xl text-slate-900 my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#ECEEF3] border-b border-slate-300 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A0522D] font-bold tracking-widest block">
              STATUS VERIFICATION PORTAL
            </span>
            <h3 className="text-xl font-bold font-serif-luxury text-slate-900">
              Track Consortium Inquiries & Registrations
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="text-xs text-slate-700 font-medium block mb-1">
                Enter Consortium Reference ID (e.g. MAK-QT-... or MAK-TR-...)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={refId}
                  onChange={e => setRefId(e.target.value)}
                  placeholder="MAK-QT-..."
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm font-mono text-slate-900 focus:border-amber-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Searching...' : 'Lookup'}</span>
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results display */}
          {result && (
            <div className="mt-6 p-5 rounded-xl bg-[#F8FAFC] border border-slate-300 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  {result.type === 'quote' ? (
                    <FileText className="w-5 h-5 text-amber-700" />
                  ) : (
                    <Truck className="w-5 h-5 text-blue-700" />
                  )}
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {result.data.id}
                  </span>
                </div>
                <div>{getStatusBadge(result.data.status)}</div>
              </div>

              {result.type === 'quote' ? (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Client / Firm:</span>
                      <span className="font-bold text-slate-900">{result.data.clientName} ({result.data.companyTitle})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Cargo Domain:</span>
                      <span className="font-medium text-amber-800">{result.data.cargoType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Routing:</span>
                      <span className="text-slate-900">{result.data.origin || 'Karachi'} → {result.data.destination || 'Destination'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Services:</span>
                      <span className="text-slate-900">{(result.data.services || []).join(', ')}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Lodged at: {new Date(result.data.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Transporter Firm:</span>
                      <span className="font-bold text-slate-900">{result.data.companyName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Representative:</span>
                      <span className="text-slate-900">{result.data.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Cargo Domain:</span>
                      <span className="font-medium text-emerald-800">{result.data.primaryCargoType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Registered Vehicles:</span>
                      <span className="font-bold text-slate-900">{result.data.vehicles?.length || 0} commercial units</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Enrolled at: {new Date(result.data.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
