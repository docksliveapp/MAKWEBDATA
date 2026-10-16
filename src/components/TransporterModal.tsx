import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Send, CheckCircle, Copy, AlertCircle, Mail } from 'lucide-react';
import { submitVehicleRegistration } from '../firebase';
import type { VehicleRegistration, VehicleItem } from '../types';

interface TransporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSubmittedId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddVehicle = () => {
    if (vehicles.length >= 50) return;
    setVehicles((prev) => [
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
    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVehicleChange = (index: number, field: keyof VehicleItem, value: any) => {
    setVehicles((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullName = formData.fullName.trim();
    const companyName = formData.companyName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!fullName || !companyName || !email || !phone) {
      setError('Please provide all required transport firm details.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    for (let i = 0; i < vehicles.length; i++) {
      if (!vehicles[i].plateNumber.trim()) {
        setError(`Vehicle #${i + 1} is missing a registration plate number.`);
        return;
      }
    }

    const safeMaxPayload = Math.min(Math.max(Number(formData.maxPayloadTons) || 50, 1), 10000);

    setLoading(true);

    try {
      const payload: Omit<VehicleRegistration, 'id' | 'status' | 'createdAt'> = {
        fullName: fullName.slice(0, 150),
        companyName: companyName.slice(0, 150),
        designation: formData.designation ? formData.designation.trim().slice(0, 100) : undefined,
        email: email.slice(0, 150),
        phone: phone.slice(0, 50),
        whatsapp: formData.whatsapp ? formData.whatsapp.trim().slice(0, 50) : undefined,
        primaryCargoType: formData.primaryCargoType.slice(0, 150),
        maxPayloadTons: safeMaxPayload,
        vehicles: vehicles.slice(0, 50).map((v) => ({
          plateNumber: v.plateNumber.trim().slice(0, 40),
          vehicleType: v.vehicleType,
          payloadCapacityTons: Math.min(Math.max(Number(v.payloadCapacityTons) || 30, 1), 500),
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

      const emailSubject = `Vehicle Registration Request [${refId}] - ${companyName}`;
      const emailBody = [
        `MAK - GROUP OF COMPANIES | Transporter Vehicle Registration`,
        `Reference ID: ${refId}`,
        `--------------------------------------------------`,
        `Operator / Owner Name: ${fullName}`,
        `Transport Company: ${companyName}`,
        `Designation: ${formData.designation || 'N/A'}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `WhatsApp: ${formData.whatsapp || 'N/A'}`,
        `--------------------------------------------------`,
        `Primary Operating Sector: ${formData.primaryCargoType}`,
        `Max Fleet Payload Capacity: ${safeMaxPayload} MT`,
        `Registered Vehicles (${vehicles.length} Units):`,
        vehicleSummary,
      ].join('\n');

      const generatedMailto = `mailto:Info@mak-group.com.pk?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      setMailtoUrl(generatedMailto);

      try {
        await fetch('https://formsubmit.co/ajax/Info@mak-group.com.pk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: emailSubject,
            referenceId: refId,
            operatorName: fullName,
            companyName,
            designation: formData.designation || 'N/A',
            email,
            phone,
            whatsapp: formData.whatsapp || 'N/A',
            primarySector: formData.primaryCargoType,
            maxPayloadTons: safeMaxPayload,
            vehiclesManifest: vehicleSummary,
          }),
        });
      } catch {
        // Fallback mailto button is provided on confirmation screen
      }

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
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2.5 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
    >
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
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
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
                  Registration Request Submitted
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your fleet and vehicle registration details have been recorded for verification.
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
                    <span>Open in Email App</span>
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
                      maxLength={150}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      maxLength={150}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
                      maxLength={100}
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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
                      maxLength={150}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="operations@khyberbolan.com"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={50}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 321 9876543"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm focus:border-[#B8860B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-semibold block mb-1">
                      WhatsApp Dispatch Line
                    </label>
                    <input
                      type="tel"
                      maxLength={50}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, primaryCargoType: e.target.value })}
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
                      min={1}
                      max={10000}
                      value={formData.maxPayloadTons}
                      onChange={(e) => setFormData({ ...formData, maxPayloadTons: Number(e.target.value) })}
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
                            aria-label={`Remove Unit #${index + 1}`}
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
                            maxLength={40}
                            placeholder="TL-1234-KHI"
                            value={v.plateNumber}
                            onChange={(e) => handleVehicleChange(index, 'plateNumber', e.target.value)}
                            className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Configuration</label>
                          <select
                            value={v.vehicleType}
                            onChange={(e) => handleVehicleChange(index, 'vehicleType', e.target.value)}
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
                            min={1}
                            max={500}
                            value={v.payloadCapacityTons}
                            onChange={(e) => handleVehicleChange(index, 'payloadCapacityTons', Number(e.target.value))}
                            className="w-full min-h-[40px] px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#B8860B] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 font-medium block mb-1">Province</label>
                          <select
                            value={v.province}
                            onChange={(e) => handleVehicleChange(index, 'province', e.target.value)}
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
                    <span>Submitting Registration...</span>
                  ) : (
                    <>
                      <span>Submit Vehicle Registration</span>
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
