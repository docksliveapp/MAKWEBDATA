import React, { useState } from 'react';
import { X, Send, CheckCircle, Copy, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { submitQuoteRequest } from '../firebase';
import { SERVICE_OPTIONS, CARGO_TYPES } from '../data/consortium';
import type { QuoteRequest } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    companyTitle: '',
    designation: '',
    email: '',
    phone: '',
    whatsapp: '',
    cargoType: CARGO_TYPES[0],
    cargoDescription: '',
    services: preselectedService ? [preselectedService] : [SERVICE_OPTIONS[0]],
    origin: 'Karachi Port (KPT/QICT)',
    destination: 'Kabul / Jalalabad (Afghan Transit)',
    weightPerUnit: 24,
    totalUnits: 1,
    metricType: 'Container (TEU)',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      if (exists) {
        if (prev.services.length === 1) return prev; // keep at least one
        return { ...prev, services: prev.services.filter(s => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.clientName || !formData.companyTitle || !formData.email || !formData.phone) {
      setError('Please fill out all required corporate contact fields.');
      return;
    }

    setLoading(true);

    try {
      const payload: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'> = {
        clientName: formData.clientName.trim(),
        companyTitle: formData.companyTitle.trim(),
        designation: formData.designation ? formData.designation.trim() : undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp ? formData.whatsapp.trim() : undefined,
        cargoType: formData.cargoType,
        cargoDescription: formData.cargoDescription ? formData.cargoDescription.trim() : undefined,
        services: formData.services,
        origin: formData.origin ? formData.origin.trim() : undefined,
        destination: formData.destination ? formData.destination.trim() : undefined,
        weightPerUnit: Number(formData.weightPerUnit) || 0,
        totalUnits: Number(formData.totalUnits) || 1,
        metricType: formData.metricType,
        documentNames: ['commercial-bill-manifest.pdf'],
      };

      const result = await submitQuoteRequest(payload);
      if (result.success) {
        setSubmittedId(result.id);
      } else {
        setError(result.error || 'Failed to submit quote request. Please retry.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest block">
              MAK - GROUP LOGISTICS SINGLE WINDOW
            </span>
            <h3 className="text-xl font-bold font-serif-luxury text-white">
              Commercial Rate Quotation Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedId ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white font-serif-luxury">
                  Quotation Request Lodged
                </h4>
                <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                  Your commercial logistics manifest has been dispatched to the MAK - GROUP single-window desk (Docks, Truckit, Muhib, and Vantage).
                </p>
              </div>

              {/* Reference ID card */}
              <div className="p-4 bg-slate-950 border border-amber-500/40 rounded-xl max-w-md mx-auto">
                <span className="text-xs font-mono text-slate-400 block uppercase">
                  Consortium Reference ID:
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-xl font-mono font-bold text-amber-400 tracking-wider">
                    {submittedId}
                  </span>
                  <button
                    onClick={() => copyToClipboard(submittedId)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Copy Reference ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <span className="text-[11px] text-emerald-400 block mt-1">Copied to clipboard!</span>}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition"
                >
                  Close & Return to Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Section 1: Corporate Representative */}
              <div>
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-3">
                  1. Commercial Client Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Representative Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyTitle}
                      onChange={e => setFormData({ ...formData, companyTitle: e.target.value })}
                      placeholder="e.g. Apex Industrial Trade Ltd"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Corporate Role / Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={e => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Supply Chain Director"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexcorp.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Mobile / Direct Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      WhatsApp Line (Rates Negotiation)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Multimodal Services Selection */}
              <div>
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-2">
                  2. Select Multimodal Services Required *
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isChecked = formData.services.includes(srv);
                    return (
                      <div
                        key={srv}
                        onClick={() => handleServiceToggle(srv)}
                        className={`p-2.5 rounded-lg border cursor-pointer text-xs flex items-center justify-between transition ${
                          isChecked
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300 font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{srv}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Cargo & Routing Specifications */}
              <div>
                <h4 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-3">
                  3. Cargo & Routing Manifest
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Cargo Classification *
                    </label>
                    <select
                      value={formData.cargoType}
                      onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    >
                      {CARGO_TYPES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Unit Metric Type
                    </label>
                    <select
                      value={formData.metricType}
                      onChange={e => setFormData({ ...formData, metricType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Container (TEU / 20ft)">Container (TEU / 20ft)</option>
                      <option value="Container (FEU / 40ft)">Container (FEU / 40ft)</option>
                      <option value="Breakbulk Metric Tons">Breakbulk Metric Tons</option>
                      <option value="Trailer Load (TL / FTL)">Trailer Load (TL / FTL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Port / Origin Location
                    </label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={e => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="e.g. Karachi Port Trust (KPT)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Destination Gateway / Dry Port
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Kabul Customs / Tashkent TIR"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Total Units / Containers
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.totalUnits}
                      onChange={e => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">
                      Est. Weight Per Unit (MT)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      value={formData.weightPerUnit}
                      onChange={e => setFormData({ ...formData, weightPerUnit: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs text-slate-300 font-medium block mb-1">
                    Cargo Specifications, HS Codes & Handling Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={formData.cargoDescription}
                    onChange={e => setFormData({ ...formData, cargoDescription: e.target.value })}
                    placeholder="Provide any specific requirements: reefer temperature (-18C), IMO class, crane offloading, or bonded transit timeline..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <span>LODGING REQUEST...</span>
                  ) : (
                    <>
                      <span>SUBMIT FOR QUOTATION</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
