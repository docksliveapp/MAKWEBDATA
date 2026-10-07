import React, { useState } from 'react';
import { X, Truck, Plus, Trash2, Send, CheckCircle, Copy, AlertCircle } from 'lucide-react';
import { submitVehicleRegistration } from '../firebase';
import type { VehicleItem, VehicleRegistration } from '../types';

interface TransporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransporterModal: React.FC<TransporterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    designation: 'Fleet Owner / Operator',
    email: '',
    phone: '',
    whatsapp: '',
    primaryCargoType: 'Afghan Transit & TIR Transit',
    maxPayloadTons: 60,
  });

  const [vehicles, setVehicles] = useState<VehicleItem[]>([
    {
      plateNumber: 'TL-8942-KHI',
      vehicleType: '40ft Multi-Axle Flatbed',
      payloadCapacityTons: 50,
      province: 'Sindh',
      year: '2021',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddVehicle = () => {
    setVehicles(prev => [
      ...prev,
      {
        plateNumber: '',
        vehicleType: '40ft Multi-Axle Flatbed',
        payloadCapacityTons: 40,
        province: 'Sindh',
        year: '2020',
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
      if (result.success) {
        setSubmittedId(result.id);
      } else {
        setError(result.error || 'Failed to submit registration.');
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
        {/* Header */}
        <div className="px-6 py-5 bg-[#ECEEF3] border-b border-slate-300 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#A0522D] font-bold tracking-widest block">
              TRUCKIT & MUHIB FLEET ENROLLMENT
            </span>
            <h3 className="text-xl font-bold font-serif-luxury text-slate-900">
              Transporter Vehicle Registration Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedId ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 font-serif-luxury">
                  Fleet Registration Enrolled
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Your vehicles have been enrolled in the MAK - GROUP bonded transport network. Operations dispatch will inspect and verify your fleet credentials.
                </p>
              </div>

              {/* Reference ID */}
              <div className="p-4 bg-[#F8FAFC] border border-emerald-300 rounded-xl max-w-md mx-auto">
                <span className="text-xs font-mono text-slate-500 block uppercase">
                  Transporter Enrolment Reference ID:
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-xl font-mono font-bold text-emerald-800 tracking-wider">
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
                  className="px-6 py-2.5 rounded-lg bg-[#111827] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E293B] transition"
                >
                  Return to Network
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
                  1. Transport Firm / Syndicate Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Authorized Operator / Owner Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Haji Gulzar Khan"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Transport Syndicate / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Khyber Bolan Goods Transport Co."
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
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="operations@khyberbolan.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 321 9876543"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      WhatsApp Dispatch Line
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+92 321 9876543"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#A0522D] font-bold tracking-wider mb-3">
                  2. Cargo Domain & Capacity
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Primary Operating Sector *
                    </label>
                    <select
                      value={formData.primaryCargoType}
                      onChange={e => setFormData({ ...formData, primaryCargoType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
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
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Max Fleet Payload Capacity (Metric Tons)
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={formData.maxPayloadTons}
                      onChange={e => setFormData({ ...formData, maxPayloadTons: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase text-[#A0522D] font-bold tracking-wider">
                    3. Commercial Fleet Manifest ({vehicles.length} Units) *
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVehicle}
                    className="px-2.5 py-1 text-xs rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Unit</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {vehicles.map((v, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-50 border border-slate-300 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-600">
                          Unit #{index + 1}
                        </span>
                        {vehicles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVehicle(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">Plate Number *</label>
                          <input
                            type="text"
                            required
                            placeholder="TL-1234-KHI"
                            value={v.plateNumber}
                            onChange={e => handleVehicleChange(index, 'plateNumber', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:border-amber-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">Configuration</label>
                          <select
                            value={v.vehicleType}
                            onChange={e => handleVehicleChange(index, 'vehicleType', e.target.value)}
                            className="w-full px-2 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-900 focus:border-amber-600 focus:outline-none"
                          >
                            <option value="40ft Multi-Axle Flatbed">40ft Flatbed</option>
                            <option value="20ft Container Trailer">20ft Container</option>
                            <option value="Low-Bed Multi-Axle">Low-Bed Heavy</option>
                            <option value="Reefer Thermo King">Reefer Truck</option>
                            <option value="Bowzer / Bulk Tanker">Tanker / Bowzer</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">Capacity (MT)</label>
                          <input
                            type="number"
                            min={5}
                            value={v.payloadCapacityTons}
                            onChange={e => handleVehicleChange(index, 'payloadCapacityTons', Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-900 focus:border-amber-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">Province</label>
                          <select
                            value={v.province}
                            onChange={e => handleVehicleChange(index, 'province', e.target.value)}
                            className="w-full px-2 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-900 focus:border-amber-600 focus:outline-none"
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
                  className="px-6 py-2.5 rounded-lg bg-[#111827] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>ENROLLING...</span>
                  ) : (
                    <>
                      <span>ENROLL VEHICLES</span>
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
