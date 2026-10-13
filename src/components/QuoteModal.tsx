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
  const [mailtoUrl, setMailtoUrl] = useState<string>('');
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
      const refId = result.id;

      // Direct Email Dispatch to Info@mak-group.com.pk
      const emailSubject = `Logistics Quotation Request [${refId}] - ${formData.companyTitle.trim()}`;
      const emailBody = [
        `MAK - GROUP OF COMPANIES | Commercial Quotation Request`,
        `Reference ID: ${refId}`,
        `--------------------------------------------------`,
        `Client Name: ${formData.clientName.trim()}`,
        `Company: ${formData.companyTitle.trim()}`,
        `Designation: ${formData.designation || 'N/A'}`,
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `WhatsApp: ${formData.whatsapp || 'N/A'}`,
        `--------------------------------------------------`,
        `Required Services: ${formData.services.join(', ')}`,
        `Cargo Type: ${formData.cargoType}`,
        `Origin: ${formData.origin}`,
        `Destination: ${formData.destination}`,
        `Quantity: ${formData.totalUnits} x ${formData.metricType}`,
        `Weight Per Unit: ${formData.weightPerUnit} MT`,
        `Specifications / Remarks: ${formData.cargoDescription || 'Standard handling'}`,
      ].join('\n');

      const generatedMailto = `mailto:Info@mak-group.com.pk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      setMailtoUrl(generatedMailto);

      // Background AJAX email dispatch to Info@mak-group.com.pk
      try {
        await fetch('https://formsubmit.co/ajax/Info@mak-group.com.pk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: emailSubject,
            referenceId: refId,
            clientName: formData.clientName.trim(),
            company: formData.companyTitle.trim(),
            designation: formData.designation || 'N/A',
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            whatsapp: formData.whatsapp || 'N/A',
            services: formData.services.join(', '),
            cargoType: formData.cargoType,
            origin: formData.origin,
            destination: formData.destination,
            quantity: `${formData.totalUnits} x ${formData.metricType}`,
            weightPerUnitMT: formData.weightPerUnit,
            remarks: formData.cargoDescription || 'None',
          }),
        });
      } catch {
        // Fallback mailto link is also triggered below
      }

      // Trigger direct email link to Info@mak-group.com.pk
      window.location.href = generatedMailto;
      setSubmittedId(refId);
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
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-h-[92vh] sm:max-w-2xl my-auto bg-[#FAF9F6] rounded-2xl border border-slate-300 shadow-2xl text-slate-900 flex flex-col overflow-hidden">
        
        {/* Compact Sticky Modal Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block truncate">
              MAK - GROUP LOGISTICS SINGLE WINDOW
            </span>
            <h3 className="text-base sm:text-xl font-bold font-serif-luxury text-slate-900 truncate">
              Commercial Logistics Quotation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Email Dispatch Notice */}
        <div className="px-4 py-2.5 sm:px-6 bg-amber-50/90 border-b border-amber-200/80 flex items-center gap-2 text-xs text-amber-950 font-medium shrink-0">
          <Mail className="w-4 h-4 text-[#9A6B16] shrink-0" />
          <span>
            Sent directly to official email: <strong className="font-mono text-[#9A6B16]">Info@mak-group.com.pk</strong>
          </span>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {submittedId ? (
            <div className="py-6 sm:py-8 text-center space-y-5 max-w-md mx-auto">
              <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  Quotation Sent to Email
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your commercial quotation request has been routed directly to{' '}
                  <strong className="font-mono text-slate-900">Info@mak-group.com.pk</strong>.
                </p>
              </div>

              {/* Reference ID card */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <span className="text-xs font-mono text-slate-500 block uppercase">
                  Reference ID:
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-lg sm:text-xl font-mono font-bold text-[#9A6B16] tracking-wider">
                    {submittedId}
                  </span>
                  <button
                    onClick={() => copyToClipboard(submittedId)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                    title="Copy Reference ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <span className="text-xs text-emerald-600 block mt-1 font-semibold">Copied!</span>}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                {mailtoUrl && (
                  <a
                    href={mailtoUrl}
                    className="btn-gold-luxury min-h-[44px] px-5 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email App</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSubmittedId(null);
                    onClose();
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-sm cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Section 1 */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3.5">
                <h4 className="text-xs font-mono uppercase text-[#9A6B16] font-bold tracking-wider">
                  1. Commercial Client Credentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Representative Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Tariq Mansoor"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyTitle}
                      onChange={e => setFormData({ ...formData, companyTitle: e.target.value })}
                      placeholder="e.g. Apex Industrial Trade Ltd"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={e => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Supply Chain Manager"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tariq@apexcorp.com"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Mobile / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      WhatsApp Line
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#9A6B16] font-bold tracking-wider">
                  2. Required Consortium Services *
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isChecked = formData.services.includes(srv);
                    return (
                      <div
                        key={srv}
                        onClick={() => handleServiceToggle(srv)}
                        className={`p-3 rounded-xl border cursor-pointer text-xs sm:text-sm flex items-center justify-between gap-2 transition ${
                          isChecked
                            ? 'bg-amber-50/90 border-[#B8860B] text-slate-900 font-semibold'
                            : 'bg-[#FAF9F6] border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{srv}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-[#9A6B16] focus:ring-0 shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3.5">
                <h4 className="text-xs font-mono uppercase text-[#9A6B16] font-bold tracking-wider">
                  3. Cargo & Routing Manifest
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Cargo Classification *
                    </label>
                    <select
                      value={formData.cargoType}
                      onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    >
                      {CARGO_TYPES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Unit Metric
                    </label>
                    <select
                      value={formData.metricType}
                      onChange={e => setFormData({ ...formData, metricType: e.target.value })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    >
                      <option value="Container (TEU / 20ft)">Container (TEU / 20ft)</option>
                      <option value="Container (FEU / 40ft)">Container (FEU / 40ft)</option>
                      <option value="Breakbulk Metric Tons">Breakbulk Metric Tons</option>
                      <option value="Trailer Load (TL / FTL)">Trailer Load (TL / FTL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Port / Origin
                    </label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={e => setFormData({ ...formData, origin: e.target.value })}
                      placeholder="e.g. Karachi Port Trust (KPT)"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Destination Gateway
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Kabul Customs / Tashkent TIR"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Units / Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.totalUnits}
                      onChange={e => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Weight Per Unit (MT)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      value={formData.weightPerUnit}
                      onChange={e => setFormData({ ...formData, weightPerUnit: Number(e.target.value) })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-semibold block mb-1">
                    Cargo Specifications & Handling Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={formData.cargoDescription}
                    onChange={e => setFormData({ ...formData, cargoDescription: e.target.value })}
                    placeholder="Provide temperature, IMO hazardous class, or special transit requests..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold-luxury min-h-[44px] px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending to Info@mak-group.com.pk...</span>
                  ) : (
                    <>
                      <span>Send Quote to Info@mak-group.com.pk</span>
                      <Send className="w-4 h-4" />
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
