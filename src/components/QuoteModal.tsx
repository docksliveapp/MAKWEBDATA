import React, { useState } from 'react';
import { X, Send, CheckCircle, Copy, AlertCircle, Mail } from 'lucide-react';
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
    origin: 'Karachi Port (KPT / QICT / SAPT)',
    destination: 'Upcountry Dry Port / Border Station',
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
        if (prev.services.length === 1) return prev;
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
        documentNames: ['commercial-freight-manifest.pdf'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 rounded-2xl shadow-2xl text-slate-900 my-8 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#F8FAFC] via-[#ECEEF3] to-[#F1F5F9] border-b border-slate-300 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A0522D] font-bold tracking-widest block">
              MAK - GROUP LOGISTICS SINGLE WINDOW
            </span>
            <h3 className="text-xl font-bold font-serif-luxury text-slate-900">
              Commercial Logistics Quotation Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dispatch Target Notification */}
        <div className="px-6 py-2.5 bg-amber-50/80 border-b border-amber-200/80 flex items-center gap-2 text-xs text-amber-950 font-medium">
          <Mail className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            This commercial quotation request will be submitted directly to <strong>info@mak-group.com.pk</strong>.
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submittedId ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 font-serif-luxury">
                  Quotation Request Dispatched
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Your commercial logistics manifest has been dispatched to <strong>info@mak-group.com.pk</strong> and logged into the MAK - GROUP operational queue.
                </p>
              </div>

              {/* Reference ID card */}
              <div className="p-4 bg-[#F8FAFC] border border-amber-300 rounded-xl max-w-md mx-auto">
                <span className="text-xs font-mono text-slate-500 block uppercase">
                  Consortium Reference ID:
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-xl font-mono font-bold text-amber-800 tracking-wider">
                    {submittedId}
                  </span>
                  <button
                    onClick={() => copyToClipboard(submittedId)}
                    className="p-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                    title="Copy Reference ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <span className="text-[11px] text-emerald-600 block mt-1 font-semibold">Copied to clipboard!</span>}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    onClose();
                  }}
                  className="btn-gold-luxury px-6 py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Section 1 */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#A0522D] font-bold tracking-wider mb-3">
                  1. Commercial Client Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Representative Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyTitle}
                      onChange={e => setFormData({ ...formData, companyTitle: e.target.value })}
                      placeholder="e.g. Apex Industrial Trade Ltd"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={e => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Supply Chain Manager"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexcorp.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Mobile / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      WhatsApp Line
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#A0522D] font-bold tracking-wider mb-2">
                  2. Required Consortium Services *
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
                            ? 'bg-amber-50 border-amber-500 text-amber-900 font-semibold'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span>{srv}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-amber-600 focus:ring-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#A0522D] font-bold tracking-wider mb-3">
                  3. Cargo & Routing Manifest
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Cargo Classification *
                    </label>
                    <select
                      value={formData.cargoType}
                      onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    >
                      {CARGO_TYPES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Unit Metric
                    </label>
                    <select
                      value={formData.metricType}
                      onChange={e => setFormData({ ...formData, metricType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    >
                      <option value="Container (TEU / 20ft)">Container (TEU / 20ft)</option>
                      <option value="Container (FEU / 40ft)">Container (FEU / 40ft)</option>
                      <option value="Breakbulk Metric Tons">Breakbulk Metric Tons</option>
                      <option value="Trailer Load (TL / FTL)">Trailer Load (TL / FTL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Port / Origin
                    </label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={e => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="e.g. Karachi Port Trust (KPT)"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Destination Gateway
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Kabul Customs / Tashkent TIR"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Units / Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.totalUnits}
                      onChange={e => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Weight Per Unit (MT)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      value={formData.weightPerUnit}
                      onChange={e => setFormData({ ...formData, weightPerUnit: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs text-slate-700 font-medium block mb-1">
                    Cargo Specifications & Handling Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={formData.cargoDescription}
                    onChange={e => setFormData({ ...formData, cargoDescription: e.target.value })}
                    placeholder="Provide temperature, IMO hazardous class, or special transit requests..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold-luxury px-6 py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>DISPATCHING TO info@mak-group.com.pk...</span>
                  ) : (
                    <>
                      <span>SUBMIT TO info@mak-group.com.pk</span>
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
