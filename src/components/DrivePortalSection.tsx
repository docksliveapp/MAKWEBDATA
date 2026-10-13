import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  FileText,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
  LogOut,
  FolderPlus,
  AlertTriangle,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FileCheck,
  ChevronRight,
  Home,
  CheckCircle2,
  HardDrive,
  Shield,
} from 'lucide-react';
import {
  initDriveAuth,
  signInWithGoogleDrive,
  driveLogout,
  listDriveFiles,
  createDriveFolder,
  uploadDriveFile,
  deleteDriveFile,
  type DriveFileItem,
} from '../drive';
import type { User } from 'firebase/auth';

interface BreadcrumbItem {
  id: string | null;
  name: string;
}

export const DrivePortalSection: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: 'My Drive' },
  ]);

  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Destructive action confirmation dialog
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [quickCreateLoading, setQuickCreateLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = initDriveAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      loadFiles();
    }
  }, [token, currentFolderId]);

  const loadFiles = async (customQuery?: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const q = customQuery !== undefined ? customQuery : searchQuery;
      const res = await listDriveFiles({
        folderId: currentFolderId || undefined,
        searchQuery: q || undefined,
      });
      setFiles(res.files || []);
    } catch (err: any) {
      if (err?.message?.includes('Not authenticated') || err?.message?.includes('401')) {
        setToken(null);
      }
      setAuthError(err?.message || 'Failed to communicate with Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await signInWithGoogleDrive();
      if (result) {
        setCurrentUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Google sign-in was cancelled or encountered an error.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await driveLogout();
    setCurrentUser(null);
    setToken(null);
    setFiles([]);
    setCurrentFolderId(null);
    setBreadcrumbs([{ id: null, name: 'My Drive' }]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    loadFiles('');
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setBreadcrumbs((prev) => [...prev, { id: folderId, name: folderName }]);
    setSearchQuery('');
  };

  const navigateToBreadcrumb = (index: number) => {
    const target = breadcrumbs[index];
    setCurrentFolderId(target.id);
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
    setSearchQuery('');
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setCreatingFolder(true);
    setAuthError(null);
    try {
      await createDriveFolder(newFolderName.trim(), currentFolderId || undefined);
      setNewFolderModalOpen(false);
      setNewFolderName('');
      loadFiles();
    } catch (err: any) {
      setAuthError(`Error creating folder: ${err?.message}`);
    } finally {
      setCreatingFolder(false);
    }
  };

  const handleCreateLogisticsWorkspaces = async () => {
    setQuickCreateLoading(true);
    setAuthError(null);
    try {
      const folders = [
        'MAK Logistics - Bill of Lading & CMR',
        'MAK Logistics - Customs GDs & FBR Invoices',
        'MAK Logistics - Fleet Inspection & GPS Telematics',
        'MAK Logistics - Transit Waybills (TIR & Afghan)',
      ];
      for (const name of folders) {
        await createDriveFolder(name, currentFolderId || undefined);
      }
      loadFiles();
    } catch (err: any) {
      setAuthError(`Error creating workspace folders: ${err?.message}`);
    } finally {
      setQuickCreateLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccessMsg(null);
    setAuthError(null);
    try {
      const uploaded = await uploadDriveFile(file, currentFolderId || undefined);
      setUploadSuccessMsg(`Uploaded "${uploaded.name}" to Google Drive!`);
      setTimeout(() => setUploadSuccessMsg(null), 4500);
      loadFiles();
    } catch (err: any) {
      setAuthError(`Upload failed: ${err?.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteDriveFile(fileToDelete.id);
      setFileToDelete(null);
      loadFiles();
    } catch (err: any) {
      setDeleteError(err?.message || 'Failed to delete file.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '--';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '--';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '--';
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-amber-500 fill-amber-100" />;
    }
    if (mimeType.includes('pdf')) {
      return <FileText className="w-5 h-5 text-red-600" />;
    }
    if (mimeType.includes('sheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    }
    if (mimeType.includes('image')) {
      return <FileImage className="w-5 h-5 text-purple-600" />;
    }
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) {
      return <FileArchive className="w-5 h-5 text-amber-700" />;
    }
    return <FileCheck className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="space-y-4">
      
      {/* Top Executive Vault Header Card */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2B1E0B] text-white rounded-2xl p-5 shadow-md border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-400 font-bold block">
            ADMINISTRATION CLOUD STORAGE
          </span>
          <h4 className="text-lg sm:text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Google Drive Logistics Vault</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Manage corporate Goods Declarations (GDs), Bills of Lading, TIR carnets, and shipping manifests directly inside your Google Drive.
          </p>
        </div>

        {currentUser && token && (
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-2.5 flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'Admin'}
                className="w-8 h-8 rounded-full border border-amber-400/50 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                {currentUser.displayName ? currentUser.displayName[0] : 'A'}
              </div>
            )}
            <div className="text-left min-w-0">
              <p className="text-xs font-bold text-white truncate max-w-[130px]">
                {currentUser.displayName || 'Connected'}
              </p>
              <p className="text-[10px] text-amber-300 font-mono truncate max-w-[130px]">
                {currentUser.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              title="Disconnect Google Drive"
              className="p-1.5 rounded-lg text-slate-300 hover:text-rose-300 hover:bg-white/10 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {authError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{authError}</span>
        </div>
      )}

      {/* Not Connected State */}
      {!token ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-slate-200/90 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 text-[#9A6B16] mx-auto flex items-center justify-center">
            <HardDrive className="w-7 h-7" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h5 className="text-lg font-serif-luxury font-bold text-slate-900">
              Connect Administrator Google Drive
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Authorize your Google account to upload shipping manifests, create standard logistics folders, and manage trade documents inside this admin vault.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="min-h-[46px] inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-2xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>
                {isAuthenticating ? 'Connecting to Google Drive...' : 'Connect Google Drive Vault'}
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Secure Google OAuth
            </span>
            <span>·</span>
            <span>In-Memory Session Token</span>
          </div>
        </div>
      ) : (
        /* Connected Drive Workspace */
        <div className="space-y-4">
          
          {/* Toolbar */}
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/90 space-y-3">
            
            {/* Breadcrumbs + Refresh */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1 flex-wrap text-xs sm:text-sm font-semibold text-slate-700">
                <button
                  onClick={() => navigateToBreadcrumb(0)}
                  className="flex items-center gap-1 hover:text-[#9A6B16] transition cursor-pointer px-1.5 py-1 rounded-lg hover:bg-slate-100"
                >
                  <Home className="w-3.5 h-3.5 text-[#9A6B16]" />
                  <span>My Drive</span>
                </button>
                {breadcrumbs.slice(1).map((b, idx) => (
                  <React.Fragment key={b.id || idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <button
                      onClick={() => navigateToBreadcrumb(idx + 1)}
                      className={`hover:text-[#9A6B16] transition cursor-pointer px-1.5 py-1 rounded-lg hover:bg-slate-100 truncate max-w-[140px] ${
                        idx === breadcrumbs.length - 2 ? 'text-[#9A6B16] font-bold' : ''
                      }`}
                    >
                      {b.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={() => loadFiles()}
                disabled={loading}
                title="Refresh files"
                className="p-2 bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-700 rounded-xl transition cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#9A6B16]' : ''}`} />
              </button>
            </div>

            {/* Search & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vault documents..."
                  className="w-full min-h-[40px] pl-8 pr-7 py-2 bg-[#FAF9F6] border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#B8860B]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </form>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setNewFolderModalOpen(true)}
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-[#F4F6F9] hover:bg-slate-200/70 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4 text-[#9A6B16]" />
                  <span>New Folder</span>
                </button>

                <button
                  onClick={handleCreateLogisticsWorkspaces}
                  disabled={quickCreateLoading}
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#9A6B16]" />
                  <span>{quickCreateLoading ? 'Creating...' : 'MAK Folders'}</span>
                </button>

                <label className="btn-gold-luxury min-h-[40px] px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {uploadSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          {/* Files List */}
          <div className="bg-white rounded-2xl shadow-2xs border border-slate-200/90 overflow-hidden">
            {loading ? (
              <div className="py-14 text-center space-y-2.5">
                <RefreshCw className="w-7 h-7 text-[#9A6B16] animate-spin mx-auto" />
                <p className="text-xs font-mono text-slate-500">Loading Google Drive documents...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="py-12 text-center space-y-2.5 px-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Folder className="w-5 h-5" />
                </div>
                <h5 className="text-sm font-bold text-slate-800">No documents in this folder</h5>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click "Upload File" or "MAK Folders" above to organize your logistics records.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {files.map((file) => {
                  const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                  return (
                    <div
                      key={file.id}
                      className="p-3 sm:px-4 hover:bg-slate-50/90 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                        <div className="min-w-0 flex-1">
                          {isFolder ? (
                            <button
                              onClick={() => navigateToFolder(file.id, file.name)}
                              className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#9A6B16] transition text-left cursor-pointer truncate block w-full"
                            >
                              {file.name}
                            </button>
                          ) : (
                            <a
                              href={file.webViewLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#9A6B16] hover:underline transition truncate block"
                            >
                              {file.name}
                            </a>
                          )}
                          <span className="text-[11px] font-mono text-slate-400 block">
                            {isFolder ? 'Folder' : formatFileSize(file.size)} · {formatDate(file.modifiedTime)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open in Google Drive"
                            className="p-2 rounded-lg text-slate-500 hover:text-[#9A6B16] hover:bg-slate-100 transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setFileToDelete(file)}
                          title="Delete Document"
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {newFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#9A6B16]" />
              <span>Create New Folder</span>
            </h4>
            <form onSubmit={handleCreateFolder} className="space-y-3.5">
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. Shipment-2026-Docs"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF9F6] border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#B8860B]"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewFolderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingFolder || !newFolderName.trim()}
                  className="btn-gold-luxury px-4 py-2 rounded-xl text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
                >
                  {creatingFolder ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Explicit Confirmation Modal for File Deletion */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-rose-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">Confirm Deletion</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Permanently delete <strong className="text-slate-900 break-all">"{fileToDelete.name}"</strong> from Google Drive?
              </p>
            </div>
            {deleteError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                {deleteError}
              </div>
            )}
            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setFileToDelete(null);
                  setDeleteError(null);
                }}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
