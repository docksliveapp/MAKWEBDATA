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
  Clock,
  HardDrive,
  Shield,
  Download,
  Truck
} from 'lucide-react';
import {
  initDriveAuth,
  signInWithGoogleDrive,
  driveLogout,
  listDriveFiles,
  createDriveFolder,
  uploadDriveFile,
  deleteDriveFile,
  getDriveAccessToken,
  type DriveFileItem
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

  // Files & folders
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: 'My Drive' }
  ]);

  // Modals & confirmation dialogs
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Destructive action confirmation dialog (MANDATORY REQUIREMENT)
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Quick Logistics Templates
  const [quickCreateLoading, setQuickCreateLoading] = useState(false);

  // Initialize Auth listener
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

  // Fetch files when token or folder changes
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
      console.error('Failed to load drive files:', err);
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
    setBreadcrumbs(prev => [...prev, { id: folderId, name: folderName }]);
    setSearchQuery('');
  };

  const navigateToBreadcrumb = (index: number) => {
    const target = breadcrumbs[index];
    setCurrentFolderId(target.id);
    setBreadcrumbs(prev => prev.slice(0, index + 1));
    setSearchQuery('');
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setCreatingFolder(true);
    try {
      await createDriveFolder(newFolderName.trim(), currentFolderId || undefined);
      setNewFolderModalOpen(false);
      setNewFolderName('');
      loadFiles();
    } catch (err: any) {
      alert(`Error creating folder: ${err?.message}`);
    } finally {
      setCreatingFolder(false);
    }
  };

  const handleCreateLogisticsWorkspaces = async () => {
    setQuickCreateLoading(true);
    try {
      const folders = [
        'MAK Logistics - Bill of Lading & CMR',
        'MAK Logistics - Customs GDs & FBR Invoices',
        'MAK Logistics - Fleet Inspection & GPS Telematics',
        'MAK Logistics - Transit Waybills (TIR & Afghan)'
      ];
      for (const name of folders) {
        await createDriveFolder(name, currentFolderId || undefined);
      }
      loadFiles();
    } catch (err: any) {
      alert(`Error creating logistics workspace folders: ${err?.message}`);
    } finally {
      setQuickCreateLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccessMsg(null);
    try {
      const uploaded = await uploadDriveFile(file, currentFolderId || undefined);
      setUploadSuccessMsg(`Successfully uploaded "${uploaded.name}" to Google Drive!`);
      setTimeout(() => setUploadSuccessMsg(null), 5000);
      loadFiles();
    } catch (err: any) {
      alert(`Upload failed: ${err?.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // MANDATORY USER CONFIRMATION DIALOG: Executes destructive operation only upon explicit confirm
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
      hour: '2-digit',
      minute: '2-digit',
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
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden border border-slate-700">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <HardDrive className="w-3.5 h-3.5" />
                Google Drive Logistics Vault
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold tracking-tight text-white">
                Logistics & Trade Documents Drive
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Seamlessly store, access, and archive trade corridor documents, Goods Declarations (GDs), Bills of Lading, TIR carnets, and transport manifests directly in your secure Google Drive.
              </p>
            </div>

            {/* User status or Sign In */}
            <div className="shrink-0 flex items-center gap-3">
              {currentUser && token ? (
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-amber-400/50 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[150px]">
                      {currentUser.displayName || 'Connected User'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="ml-2 p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-700/60 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Not Logged In State: Official Google Sign In Button */}
        {!token && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center max-w-2xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-5 border border-amber-200 shadow-sm">
              <HardDrive className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-serif-luxury font-bold text-slate-900 mb-2">
              Connect Your Google Drive
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              With permission from your Google account, you can explore your folders, upload shipping manifests and invoices, organize consignment records, and download trade documents directly inside the MAK Group logistics platform.
            </p>

            {authError && (
              <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 justify-center text-left">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            {/* Official GSI Button Component per Guidelines */}
            <div className="flex justify-center">
              <button
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="font-semibold text-slate-800">
                  {isAuthenticating ? 'Connecting to Google...' : 'Sign in with Google'}
                </span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> End-to-End Google OAuth
              </span>
              <span>•</span>
              <span>Token Cached In-Memory Only</span>
              <span>•</span>
              <span>Explicit Destructive Approvals</span>
            </div>
          </div>
        )}

        {/* Authenticated Drive Dashboard */}
        {token && (
          <div className="space-y-6">
            
            {/* Action Bar & Toolbar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 flex-wrap text-sm font-semibold text-slate-700">
                <button
                  onClick={() => navigateToBreadcrumb(0)}
                  className="flex items-center gap-1 hover:text-amber-800 transition cursor-pointer p-1 rounded hover:bg-slate-100"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>My Drive</span>
                </button>
                {breadcrumbs.slice(1).map((b, idx) => (
                  <React.Fragment key={b.id || idx}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <button
                      onClick={() => navigateToBreadcrumb(idx + 1)}
                      className={`hover:text-amber-800 transition cursor-pointer p-1 rounded hover:bg-slate-100 truncate max-w-[160px] ${
                        idx === breadcrumbs.length - 2 ? 'text-amber-900 font-bold' : ''
                      }`}
                    >
                      {b.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents..."
                    className="w-48 sm:w-60 pl-8 pr-7 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </form>

                {/* Refresh */}
                <button
                  onClick={() => loadFiles()}
                  disabled={loading}
                  title="Reload files"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-700' : ''}`} />
                </button>

                {/* New Folder Button */}
                <button
                  onClick={() => setNewFolderModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4 text-amber-600" />
                  <span>New Folder</span>
                </button>

                {/* Quick Logistics Setup Button */}
                <button
                  onClick={handleCreateLogisticsWorkspaces}
                  disabled={quickCreateLoading}
                  className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  title="Automatically create standardized folders for Bill of Lading, GDs, and Fleet inspection"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-700" />
                  <span>{quickCreateLoading ? 'Creating Folders...' : 'Standard Folders'}</span>
                </button>

                {/* Upload File Button */}
                <label className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm">
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

            {/* Upload Success Alert */}
            {uploadSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* File List Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {loading ? (
                <div className="py-20 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
                  <p className="text-xs font-mono text-slate-500">Connecting and loading Drive directory...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center space-y-3 px-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Folder className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No documents found in this directory</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Use the "Upload File" button above or click "Standard Folders" to initialize your trade document structure.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                      <tr>
                        <th className="py-3 px-4 font-bold">Document Name</th>
                        <th className="py-3 px-4 font-bold hidden sm:table-cell">Type</th>
                        <th className="py-3 px-4 font-bold hidden md:table-cell">Last Modified</th>
                        <th className="py-3 px-4 font-bold hidden sm:table-cell">File Size</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {files.map((file) => {
                        const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                        return (
                          <tr
                            key={file.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                                {isFolder ? (
                                  <button
                                    onClick={() => navigateToFolder(file.id, file.name)}
                                    className="font-bold text-slate-900 hover:text-amber-800 transition text-left cursor-pointer truncate max-w-xs sm:max-w-md block"
                                  >
                                    {file.name}
                                  </button>
                                ) : (
                                  <a
                                    href={file.webViewLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-slate-900 hover:text-amber-800 hover:underline transition truncate max-w-xs sm:max-w-md block"
                                  >
                                    {file.name}
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-500 hidden sm:table-cell truncate max-w-[120px]">
                              {isFolder ? 'Folder' : file.mimeType.split('/').pop()?.toUpperCase() || 'File'}
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-500 hidden md:table-cell">
                              {formatDate(file.modifiedTime)}
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-500 hidden sm:table-cell">
                              {isFolder ? '--' : formatFileSize(file.size)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {file.webViewLink && (
                                  <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open in Google Drive"
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-amber-800 hover:bg-slate-200 transition"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}

                                {/* Destructive Action Button: Opens MANDATORY explicit confirmation modal */}
                                <button
                                  onClick={() => setFileToDelete(file)}
                                  title="Delete Document"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Informational Legend for Trade Operations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Customs Clearance Docs</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    FBR Weboc Goods Declarations, Pakistan single-window manifests, and assessment orders.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Bonded Transit Waybills</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Customs tracker bond receipts, seal numbers, and container interchange inspection forms.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Secure Cloud Synchronization</h4>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Files are uploaded to your authorized Google Drive with OAuth tokens cached strictly in memory.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: Create New Folder */}
      {newFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-amber-600" />
              Create Logistics Folder
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter a name for the new folder in {breadcrumbs[breadcrumbs.length - 1]?.name || 'Drive'}.
            </p>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Shipment-2026-B/L-Docs"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
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
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer disabled:opacity-50"
                >
                  {creatingFolder ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANDATORY Explicit User Confirmation for Destructive Operations */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center mb-1">
              Confirm Permanent Deletion
            </h3>
            
            <p className="text-xs text-slate-600 text-center mb-4 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 break-all">"{fileToDelete.name}"</strong> from your Google Drive?
              <br />
              <span className="text-red-600 font-semibold mt-1 block">
                This action will permanently remove the item from your Google Drive account.
              </span>
            </p>

            {deleteError && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs text-center">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFileToDelete(null);
                  setDeleteError(null);
                }}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? 'Deleting...' : 'Confirm & Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
