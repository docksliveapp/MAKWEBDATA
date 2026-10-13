import React, { useState } from 'react';
import { X, Plus, Trash2, Send, CheckCircle, Copy, AlertCircle, Mail } from 'lucide-react';
import { submitVehicleRegistration } from '../firebase';
import type { VehicleRegistration, VehicleItem } from '../types';

interface TransporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransporterModal: React.FC<TransporterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    designation: 'Fleet Manager',
    email: '',
    phone: '',
    whatsapp: '',
    primaryCargoType: 'Afghan Transit Trade (ATT)',
    maxPayloadTons: 50,
  });

  const [vehicles, setVehicles] = useState<VehicleItem[]>([
    {
      plateNumber: '',
      vehicleType: '40ft Multi-Axle Flatbed',
      payloadCapacityTons: 35,
      province: 'Sindh',
      year: '2022',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddVehicle = () => {
    setVehicles(prev => [
      ...prev,
      {
        plateNumber: '',
        vehicleType: '40ft Multi-Axle Flatbed',
        payloadCapacityTons: 35,
        province: 'Sindh',
        year: '2022',
      },
    ]);
  };

  const handleRemoveVehicle = (index: number) => {
    if (vehicles.length === 1) return;
    setVehicles(prev => prev.filter((_, i) => i !== index));
  };

  const handleVehicleChange = (index: number, field: keyof VehicleItem, value: any) => {
    setVehicles(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone) {
      setError('Please provide all required transport firm details.');
      return;
    }

    for (let i = 0; i < vehicles.length; i++) {
      if (!vehicles[i].plateNumber.trim()) {
        setError(`Vehicle #${i + 1} is missing a registration plate number.`);
        return;
      }
    }

    setLoading(true);

    try {
      const payload: Omit<VehicleRegistration, 'id' | 'status' | 'createdAt'> = {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        designation: formData.designation ? formData.designation.trim() : undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp ? formData.whatsapp.trim() : undefined,
        primaryCargoType: formData.primaryCargoType,
        maxPayloadTons: Number(formData.maxPayloadTons) || 50,
        vehicles: vehicles.map(v => ({
          plateNumber: v.plateNumber.trim(),
          vehicleType: v.vehicleType,
          payloadCapacityTons: Number(v.payloadCapacityTons) || 30,
          province: v.province,
          year: v.year,
        })),
      };

      const result = await submitVehicleRegistration(payload);
      const refId = result.id;

      const vehicleSummary = vehicles
        .map(
          (v, idx) =>
            `#${idx + 1}: Plate ${v.plateNumber.trim()} | ${v.vehicleType} | ${v.payloadCapacityTons} MT | ${v.province}`
        )
        .join('\n');

      // Direct Email Dispatch to Info@mak-group.com.pk
      const emailSubject = `Vehicle Registration Request [${refId}] - ${formData.companyName.trim()}`;
      const emailBody = [
        `MAK - GROUP OF COMPANIES | Transporter Vehicle Registration`,
        `Reference ID: ${refId}`,
        `--------------------------------------------------`,
        `Operator / Owner Name: ${formData.fullName.trim()}`,
        `Transport Company: ${formData.companyName.trim()}`,
        `Designation: ${formData.designation || 'N/A'}`,
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `WhatsApp: ${formData.whatsapp || 'N/A'}`,
        `--------------------------------------------------`,
        `Primary Operating Sector: ${formData.primaryCargoType}`,
        `Max Fleet Payload Capacity: ${formData.maxPayloadTons} MT`,
        `Registered Vehicles (${vehicles.length} Units):`,
        vehicleSummary,
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
            operatorName: formData.fullName.trim(),
            companyName: formData.companyName.trim(),
            designation: formData.designation || 'N/A',
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            whatsapp: formData.whatsapp || 'N/A',
            primarySector: formData.primaryCargoType,
            maxPayloadTons: formData.maxPayloadTons,
            vehiclesManifest: vehicleSummary,
          }),
        });
      } catch {
        // Fallback mailto link is also triggered below
      }

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
        
        {/* Compact Sticky Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block truncate">
              MAK - GROUP FLEET ENROLLMENT
            </span>
            <h3 className="text-base sm:text-xl font-bold font-serif-luxury text-slate-900 truncate">
              Vehicle Registration Request
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

        {/* Scrollable Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {submittedId ? (
            <div className="py-6 sm:py-8 text-center space-y-5 max-w-md mx-auto">
              <div className="w-14 h-14 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  Registration Sent to Email
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your vehicle registration request has been dispatched directly to{' '}
                  <strong className="font-mono text-slate-900">Info@mak-group.com.pk</strong>.
                </p>
              </div>

              {/* Reference ID */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <span className="text-xs font-mono text-slate-500 block uppercase">
                  Reference ID:
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-lg sm:text-xl font-mono font-bold text-emerald-800 tracking-wider">
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
                  1. Transport Firm / Syndicate Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Authorized Operator / Owner Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Haji Gulzar Khan"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Transport Syndicate / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Khyber Bolan Goods Transport Co."
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
                      placeholder="operations@khyberbolan.com"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 321 9876543"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      WhatsApp Dispatch Line
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+92 321 9876543"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3.5">
                <h4 className="text-xs font-mono uppercase text-[#9A6B16] font-bold tracking-wider">
                  2. Cargo Domain & Capacity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Primary Operating Sector *
                    </label>
                    <select
                      value={formData.primaryCargoType}
                      onChange={e => setFormData({ ...formData, primaryCargoType: e.target.value })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    >
                      <option value="Afghan Transit Trade (ATT)">Afghan Transit Trade (ATT)</option>
                      <option value="TIR Cross-Border Central Asia">TIR Cross-Border Central Asia</option>
                      <option value="Port Container Haulage (KPT/PQA)">Port Container Haulage (KPT/PQA)</option>
                      <option value="National Upcountry Linehaul">National Upcountry Linehaul</option>
                      <option value="Refrigerated Cold Chain Goods">Refrigerated Cold Chain Goods</option>
                      <option value="Heavy Machinery & Project Cargo">Heavy Machinery & Project Cargo</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Max Fleet Payload Capacity (Metric Tons)
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={formData.maxPayloadTons}
                      onChange={e => setFormData({ ...formData, maxPayloadTons: Number(e.target.value) })}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase text-[#9A6B16] font-bold tracking-wider">
                    3. Commercial Fleet Manifest ({vehicles.length} Units) *
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVehicle}
                    className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Unit</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {vehicles.map((v, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-[#FAF9F6] border border-slate-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-700">
                          Unit #{index + 1}
                        </span>
                        {vehicles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVehicle(index)}
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Plate Number *</label>
                          <input
                            type="text"
                            required
                            placeholder="TL-1234-KHI"
                            value={v.plateNumber}
                            onChange={e => handleVehicleChange(index, 'plateNumber', e.target.value)}
                            className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Configuration</label>
                          <select
                            value={v.vehicleType}
                            onChange={e => handleVehicleChange(index, 'vehicleType', e.target.value)}
                            className="w-full min-h-[40px] px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          >
                            <option value="40ft Multi-Axle Flatbed">40ft Flatbed</option>
                            <option value="20ft Container Trailer">20ft Container</option>
                            <option value="Low-Bed Multi-Axle">Low-Bed Heavy</option>
                            <option value="Reefer Thermo King">Reefer Truck</option>
                            <option value="Bowzer / Bulk Tanker">Tanker / Bowzer</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Capacity (MT)</label>
                          <input
                            type="number"
                            min={5}
                            value={v.payloadCapacityTons}
                            onChange={e => handleVehicleChange(index, 'payloadCapacityTons', Number(e.target.value))}
                            className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Province</label>
                          <select
                            value={v.province}
                            onChange={e => handleVehicleChange(index, 'province', e.target.value)}
                            className="w-full min-h-[40px] px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          >
                            <option value="Sindh">Sindh</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Khyber Pakhtunkhwa">KPK</option>
                            <option value="Balochistan">Balochistan</option>
                            <option value="Federal / ICT">Federal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  className="btn-dark-luxury min-h-[44px] px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Sending to Info@mak-group.com.pk...</span>
                  ) : (
                    <>
                      <span>Send Registration to Info@mak-group.com.pk</span>
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
