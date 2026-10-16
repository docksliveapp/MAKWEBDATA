import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Image,
  Key,
  Check,
  Upload,
  Trash2,
  Database,
  Lock,
  LogOut,
  RefreshCw,
  HardDrive,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  loginWithGoogle,
  logoutUser,
  subscribeToAuth,
  testConnection,
  ensureInitialFirestoreCollections,
} from '../firebase';
import firebaseAppletConfig from '../../firebase-applet-config.json';
import { DrivePortalSection } from './DrivePortalSection';
import type { User } from 'firebase/auth';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PATHS = [
  '/mak_pearl_grey_edge.svg',
  '/MAK-Group-Of-Companies.svg',
  '/mak_transparent.svg',
  '/erasebg-transformed.svg',
  '/mak_official_logo.svg',
];

function isUploadedLogo(url: string | null | undefined): url is string {
  if (!url || !url.trim()) return false;
  const trimmed = url.trim();
  if (PRESET_PATHS.includes(trimmed)) return false;
  return (
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:')
  );
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showLoginPasscode, setShowLoginPasscode] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [syncingFirebase, setSyncingFirebase] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(false);

  const [activeTab, setActiveTab] = useState<'branding' | 'drive' | 'firebase' | 'security'>('branding');

  const [headerLogoData, setHeaderLogoData] = useState<string>('');
  const [pageLogoData, setPageLogoData] = useState<string>('');
  const [savedHeaderSuccess, setSavedHeaderSuccess] = useState(false);
  const [savedPageSuccess, setSavedPageSuccess] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);
  const [uploadErrorMsg, setUploadErrorMsg] = useState<string>('');

  const getStoredPassword = () => {
    return localStorage.getItem('mak_admin_password') || 'Behzadmk@123';
  };

  useEffect(() => {
    const unsub = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const savedHeader =
        localStorage.getItem('mak_header_logo') ||
        localStorage.getItem('mak_custom_logo') ||
        '';
      setHeaderLogoData(isUploadedLogo(savedHeader) ? savedHeader : '');

      const savedPage = localStorage.getItem('mak_page_logo') || '';
      setPageLogoData(isUploadedLogo(savedPage) ? savedPage : '');

      testConnection().then((ok) => setDbConnected(ok));
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

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (lockoutUntil > now) {
      const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
      setAuthError(true);
      setAuthErrorMsg(`Too many failed attempts. Please wait ${remainingSec} seconds.`);
      return;
    }

    if (passwordInput === getStoredPassword()) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      setLockoutUntil(0);
      setAuthError(false);
      setAuthErrorMsg('');
      setPasswordInput('');
    } else {
      const nextFailures = failedAttempts + 1;
      setFailedAttempts(nextFailures);
      if (nextFailures >= 5) {
        setLockoutUntil(now + 30000);
        setAuthError(true);
        setAuthErrorMsg('Too many failed attempts. Login locked for 30 seconds.');
      } else {
        setAuthError(true);
        setAuthErrorMsg('Incorrect administrator passcode. Please try again.');
      }
    }
  };

  const handleGoogleLoginInsidePortal = async () => {
    setAuthError(false);
    setAuthErrorMsg('');
    const { user, error } = await loginWithGoogle();
    if (error) {
      setAuthError(true);
      setAuthErrorMsg(error);
    } else if (user) {
      setCurrentUser(user);
    }
  };

  const handlePortalLock = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleSyncFirebaseNow = async () => {
    setSyncingFirebase(true);
    setSyncSuccessMsg(false);
    try {
      const ok = await testConnection();
      await ensureInitialFirestoreCollections();
      setDbConnected(ok);
      setSyncSuccessMsg(true);
      setTimeout(() => setSyncSuccessMsg(false), 3000);
    } finally {
      setSyncingFirebase(false);
    }
  };

  const handleHeaderFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErrorMsg('');
    if (!file.type.startsWith('image/')) {
      setUploadErrorMsg('Please select a valid image file (PNG, SVG, JPG, WebP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadErrorMsg('Logo file size must be under 4 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && dataUrl.startsWith('data:image/')) {
        try {
          localStorage.setItem('mak_header_logo', dataUrl);
          localStorage.setItem('mak_custom_logo', dataUrl);
          setHeaderLogoData(dataUrl);
          window.dispatchEvent(
            new CustomEvent('mak-logo-updated', { detail: { logoUrl: dataUrl, headerLogo: dataUrl } })
          );
          setSavedHeaderSuccess(true);
          setTimeout(() => setSavedHeaderSuccess(false), 2500);
        } catch {
          setUploadErrorMsg('Image is too large for browser storage. Please choose a smaller logo.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHeaderLogo = () => {
    localStorage.removeItem('mak_header_logo');
    localStorage.removeItem('mak_custom_logo');
    setHeaderLogoData('');
    window.dispatchEvent(new CustomEvent('mak-logo-updated', { detail: { reset: true } }));
    setSavedHeaderSuccess(true);
    setTimeout(() => setSavedHeaderSuccess(false), 2500);
  };

  const handlePageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErrorMsg('');
    if (!file.type.startsWith('image/')) {
      setUploadErrorMsg('Please select a valid image file (PNG, SVG, JPG, WebP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadErrorMsg('Logo file size must be under 4 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && dataUrl.startsWith('data:image/')) {
        try {
          localStorage.setItem('mak_page_logo', dataUrl);
          setPageLogoData(dataUrl);
          window.dispatchEvent(
            new CustomEvent('mak-page-logo-updated', { detail: { pageLogo: dataUrl } })
          );
          setSavedPageSuccess(true);
          setTimeout(() => setSavedPageSuccess(false), 2500);
        } catch {
          setUploadErrorMsg('Image is too large for browser storage. Please choose a smaller logo.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePageLogo = () => {
    localStorage.removeItem('mak_page_logo');
    setPageLogoData('');
    window.dispatchEvent(
      new CustomEvent('mak-page-logo-updated', { detail: { resetPageLogo: true } })
    );
    setSavedPageSuccess(true);
    setTimeout(() => setSavedPageSuccess(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!newPassword || newPassword.length < 4) {
      setPasswordError('Passcode must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passcodes do not match.');
      return;
    }
    localStorage.setItem('mak_admin_password', newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm p-2.5 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-h-[92vh] sm:max-w-3xl my-auto bg-[#FAF9F6] rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-2xl text-slate-900 flex flex-col overflow-hidden">
        
        {/* Luxury Obsidian & Champagne Gold Executive Header */}
        <div className="px-4 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2B1E0B] text-white border-b border-amber-500/25 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#8B5E14] text-white flex items-center justify-center shrink-0 shadow-md border border-amber-300/30">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-amber-400 tracking-[0.2em] block font-bold truncate">
                MAK - GROUP EXECUTIVE COMMAND
              </span>
              <h3 className="text-base sm:text-xl font-bold font-serif-luxury text-white truncate">
                Luxury Administration Suite
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated && (
              <button
                onClick={handlePortalLock}
                className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-200 hover:text-rose-200 border border-white/15 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Lock Admin Suite"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lock</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. LUXURY LOGIN GATE */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-12 overflow-y-auto">
            <div className="w-full max-w-md bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-xl text-center space-y-6 my-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/80 border border-amber-300/70 text-[#9A6B16] flex items-center justify-center mx-auto shadow-2xs">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#9A6B16] block">
                  AUTHORIZED ACCESS ONLY
                </span>
                <h4 className="text-2xl font-bold font-serif-luxury text-slate-900">
                  Executive Portal Login
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Enter your administrator passcode to manage brand logos, Google Drive Vault, and Firebase cloud settings.
                </p>
              </div>

              <form onSubmit={handlePasscodeLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showLoginPasscode ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Administrator Passcode"
                    autoComplete="current-password"
                    className="w-full min-h-[48px] pl-4 pr-11 py-3 rounded-xl bg-[#FAF9F6] border border-slate-300 text-slate-900 text-center text-sm focus:outline-none focus:border-[#B8860B] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPasscode(!showLoginPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Toggle passcode visibility"
                  >
                    {showLoginPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-semibold">{authErrorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-gold-luxury w-full min-h-[48px] py-3 rounded-xl text-white font-semibold text-sm tracking-wide cursor-pointer shadow-md"
                >
                  Unlock Executive Suite
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* 2. UNLOCKED LUXURY ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* 2x2 (Mobile) / 4-Column (Desktop) Navigation Selector */}
            <div className="p-3 sm:px-6 sm:py-3.5 bg-white border-b border-slate-200/90 shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer border ${
                    activeTab === 'branding'
                      ? 'bg-gradient-to-r from-[#8B5E14] to-[#B8860B] text-white border-[#8B5E14] shadow-sm'
                      : 'bg-[#FAF9F6] text-slate-700 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <Image className="w-4 h-4 shrink-0" />
                  <span className="truncate">Logos & Brand</span>
                </button>

                <button
                  onClick={() => setActiveTab('drive')}
                  className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer border ${
                    activeTab === 'drive'
                      ? 'bg-gradient-to-r from-[#8B5E14] to-[#B8860B] text-white border-[#8B5E14] shadow-sm'
                      : 'bg-[#FAF9F6] text-slate-700 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <HardDrive className="w-4 h-4 shrink-0" />
                  <span className="truncate">Google Drive Vault</span>
                </button>

                <button
                  onClick={() => setActiveTab('firebase')}
                  className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer border ${
                    activeTab === 'firebase'
                      ? 'bg-gradient-to-r from-[#8B5E14] to-[#B8860B] text-white border-[#8B5E14] shadow-sm'
                      : 'bg-[#FAF9F6] text-slate-700 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <Database className="w-4 h-4 shrink-0" />
                  <span className="truncate">Firebase & Auth</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer border ${
                    activeTab === 'security'
                      ? 'bg-gradient-to-r from-[#8B5E14] to-[#B8860B] text-white border-[#8B5E14] shadow-sm'
                      : 'bg-[#FAF9F6] text-slate-700 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <Key className="w-4 h-4 shrink-0" />
                  <span className="truncate">Passcode</span>
                </button>
              </div>
            </div>

            {/* Scrollable Luxury Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

              {/* TAB 1: LOGOS & BRANDING (Upload Only - No Presets) */}
              {activeTab === 'branding' && (
                <div className="space-y-4">
                  {uploadErrorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-semibold text-center">
                      {uploadErrorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* 1. Home Page Hero Logo Upload Card */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block">
                              1. HOME PAGE HERO
                            </span>
                            <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-slate-900">
                              Home Page Logo
                            </h4>
                          </div>
                          <span className={`text-xs font-mono font-semibold ${pageLogoData ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {pageLogoData ? 'Active' : 'Empty'}
                          </span>
                        </div>

                        {pageLogoData ? (
                          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-amber-200/80 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                            <img
                              src={pageLogoData}
                              alt="Uploaded Home Page Logo"
                              className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                            />
                            <span className="text-xs font-semibold text-emerald-700">
                              Custom Home Page Logo Live
                            </span>
                          </div>
                        ) : (
                          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-dashed border-slate-300 flex flex-col items-center justify-center text-center min-h-[160px] space-y-1.5">
                            <Image className="w-7 h-7 text-slate-400" />
                            <p className="text-xs font-medium text-slate-500">
                              No Home Page logo uploaded. Only your uploaded image will appear on the Home Page.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <label className="btn-gold-luxury flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
                            <Upload className="w-4 h-4 shrink-0" />
                            <span>Upload Home Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePageFileUpload}
                              className="hidden"
                            />
                          </label>

                          {pageLogoData && (
                            <button
                              type="button"
                              onClick={handleRemovePageLogo}
                              className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        {savedPageSuccess && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold">
                            Home Page logo updated!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 2. Header Bar Logo Upload Card */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block">
                              2. TOP NAVIGATION BAR
                            </span>
                            <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-slate-900">
                              Header Bar Logo
                            </h4>
                          </div>
                          <span className={`text-xs font-mono font-semibold ${headerLogoData ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {headerLogoData ? 'Active' : 'Empty'}
                          </span>
                        </div>

                        {headerLogoData ? (
                          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-amber-200/80 flex flex-col items-center justify-center gap-2 min-h-[160px]">
                            <img
                              src={headerLogoData}
                              alt="Uploaded Header Logo"
                              className="h-20 sm:h-24 w-auto object-contain"
                            />
                            <span className="text-xs font-semibold text-emerald-700">
                              Custom Header Logo Live
                            </span>
                          </div>
                        ) : (
                          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-dashed border-slate-300 flex flex-col items-center justify-center text-center min-h-[160px] space-y-1.5">
                            <Image className="w-7 h-7 text-slate-400" />
                            <p className="text-xs font-medium text-slate-500">
                              No Header logo uploaded. Only your uploaded image will appear in the top navigation bar.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <label className="btn-dark-luxury flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
                            <Upload className="w-4 h-4 shrink-0" />
                            <span>Upload Header Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleHeaderFileUpload}
                              className="hidden"
                            />
                          </label>

                          {headerLogoData && (
                            <button
                              type="button"
                              onClick={handleRemoveHeaderLogo}
                              className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        {savedHeaderSuccess && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold">
                            Header logo updated!
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: GOOGLE DRIVE LOGISTICS VAULT (Inside Admin Panel) */}
              {activeTab === 'drive' && (
                <DrivePortalSection />
              )}

              {/* TAB 3: FIREBASE & GOOGLE SIGN-IN SUITE */}
              {activeTab === 'firebase' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* 1. Firebase Google Authentication Inside Admin Portal */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block">
                            FIREBASE AUTHENTICATION
                          </span>
                          <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-slate-900">
                            Google Admin Sign-In
                          </h4>
                        </div>
                        <span className={`text-xs font-mono font-bold ${currentUser ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {currentUser ? 'Connected' : 'Not Signed In'}
                        </span>
                      </div>

                      {currentUser ? (
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {currentUser.photoURL ? (
                              <img src={currentUser.photoURL} alt="Admin" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                                {currentUser.email?.[0]?.toUpperCase() || 'A'}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">
                                {currentUser.displayName || 'Authorized Admin'}
                              </p>
                              <p className="text-xs font-mono text-emerald-800 truncate">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => logoutUser()}
                            className="min-h-[38px] px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Link your Google administrator account with Firebase Authentication and Cloud Services.
                        </p>
                      )}
                    </div>

                    {!currentUser && (
                      <div className="space-y-2 pt-2">
                        <button
                          type="button"
                          onClick={handleGoogleLoginInsidePortal}
                          className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-slate-100 text-slate-900 border border-slate-300 font-semibold text-sm transition shadow-2xs flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>Sign In with Google (Firebase)</span>
                        </button>
                        {authError && (
                          <p className="text-xs text-rose-600 font-medium text-center">{authErrorMsg}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2. Cloud Firestore & Hosting Status */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block">
                            CLOUD DATABASE & HOSTING
                          </span>
                          <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-slate-900">
                            Firebase Cloud Status
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          {dbConnected ? 'Active' : 'Standby'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200">
                          <span className="text-slate-400 uppercase block font-bold text-[10px]">Project ID</span>
                          <span className="text-slate-800 font-semibold truncate block">
                            {firebaseAppletConfig.projectId || 'Connected'}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200">
                          <span className="text-slate-400 uppercase block font-bold text-[10px]">Security Rules</span>
                          <span className="text-slate-800 font-semibold truncate block">Zero-Trust Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={handleSyncFirebaseNow}
                        disabled={syncingFirebase}
                        className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-800 border border-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                      >
                        <RefreshCw className={`w-4 h-4 ${syncingFirebase ? 'animate-spin text-[#9A6B16]' : ''}`} />
                        <span>{syncingFirebase ? 'Verifying Cloud...' : 'Verify & Sync Firebase Connection'}</span>
                      </button>

                      {syncSuccessMsg && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold">
                          Firebase Cloud connection verified!
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: PASSCODE SECURITY */}
              {activeTab === 'security' && (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 max-w-lg mx-auto space-y-5 shadow-2xs">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-mono uppercase text-[#9A6B16] font-bold tracking-wider block">
                      EXECUTIVE ACCESS CONTROL
                    </span>
                    <h4 className="text-lg font-serif-luxury font-bold text-slate-900">
                      Update Administrator Passcode
                    </h4>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        New Passcode
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPasscode ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new passcode"
                          className="w-full min-h-[46px] pl-4 pr-11 py-2.5 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm font-mono focus:outline-none focus:border-[#B8860B]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPasscode(!showNewPasscode)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          aria-label="Toggle passcode visibility"
                        >
                          {showNewPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Confirm New Passcode
                      </label>
                      <input
                        type={showNewPasscode ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new passcode"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm font-mono focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>

                    {passwordError && (
                      <p className="text-xs text-rose-600 font-semibold">{passwordError}</p>
                    )}

                    <button
                      type="submit"
                      className="btn-gold-luxury w-full min-h-[46px] py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save New Passcode</span>
                    </button>

                    {passwordSaved && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-semibold">
                        Administrator passcode updated!
                      </div>
                    )}
                  </form>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
