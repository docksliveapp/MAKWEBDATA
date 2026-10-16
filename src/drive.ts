import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './firebase';

export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.meet.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts',
];

const provider = new GoogleAuthProvider();
// Add Drive scopes to the Google Auth Provider
DRIVE_SCOPES.forEach(scope => provider.addScope(scope));

// In-memory token cache (never stored in localStorage or sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token not cached yet or user was restored without fresh credential
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleDrive = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google sign-in credentials.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('[Google Drive Auth] Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getDriveAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const driveLogout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } finally {
    cachedAccessToken = null;
  }
};

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  parents?: string[];
  owners?: { displayName?: string; emailAddress?: string; photoLink?: string }[];
  shared?: boolean;
}

export interface DriveFileListResponse {
  files: DriveFileItem[];
  nextPageToken?: string;
}

// 1. List Files
export async function listDriveFiles(options: {
  folderId?: string;
  searchQuery?: string;
  pageSize?: number;
  pageToken?: string;
} = {}): Promise<DriveFileListResponse> {
  const token = getDriveAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive. Please sign in.');

  const { folderId, searchQuery, pageSize = 30, pageToken } = options;

  const qParts: string[] = ['trashed = false'];
  if (folderId && folderId.trim()) {
    const safeFolderId = folderId.trim().replace(/\\/g, '').replace(/'/g, '');
    qParts.push(`'${safeFolderId}' in parents`);
  }
  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    qParts.push(`name contains '${escaped}'`);
  }

  const params = new URLSearchParams({
    pageSize: String(pageSize),
    fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, iconLink, thumbnailLink, parents, owners, shared)',
    orderBy: 'folder,modifiedTime desc',
    q: qParts.join(' and '),
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to fetch Drive files (${res.status})`);
  }

  return await res.json();
}

// 2. Create Logistics Folder (e.g., for shipping documents, quotes, manifests)
export async function createDriveFolder(folderName: string, parentFolderId?: string): Promise<DriveFileItem> {
  const token = getDriveAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive.');

  const metadata: { name: string; mimeType: string; parents?: string[] } = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };
  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to create folder');
  }

  return await res.json();
}

// 3. Upload File to Drive (with optional parent folder)
export async function uploadDriveFile(
  file: File,
  parentFolderId?: string,
  onProgress?: (percent: number) => void
): Promise<DriveFileItem> {
  const token = getDriveAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive.');

  const metadata: { name: string; parents?: string[] } = {
    name: file.name,
  };
  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,modifiedTime,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to upload document to Google Drive');
  }

  if (onProgress) onProgress(100);
  return await res.json();
}

// 4. Delete File (DESTRUCTIVE OPERATION: Must always be called after user confirmation dialog)
export async function deleteDriveFile(fileId: string): Promise<void> {
  const token = getDriveAccessToken();
  if (!token) throw new Error('Not authenticated with Google Drive.');

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to delete file from Google Drive');
  }
}
