import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  limit, 
  getDocFromServer 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  type User 
} from 'firebase/auth';
import type { QuoteRequest, VehicleRegistration } from './types';

import firebaseAppletConfig from '../firebase-applet-config.json';

// Configuration loaded dynamically from firebase-applet-config.json
const firebaseConfig = {
  projectId: firebaseAppletConfig.projectId,
  appId: firebaseAppletConfig.appId,
  apiKey: firebaseAppletConfig.apiKey,
  authDomain: firebaseAppletConfig.authDomain,
  firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId,
  storageBucket: firebaseAppletConfig.storageBucket,
  messagingSenderId: firebaseAppletConfig.messagingSenderId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Firebase Authentication Methods
export async function loginWithGoogle(): Promise<{ user: User | null; error?: string }> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return { user: result.user };
  } catch (err: any) {
    console.error('[Firebase Auth] Google Sign-In error:', err);
    return { user: null, error: err?.message || 'Failed to sign in with Google' };
  }
}

export async function loginAnonymously(): Promise<{ user: User | null; error?: string }> {
  try {
    const result = await signInAnonymously(auth);
    return { user: result.user };
  } catch (err: any) {
    console.warn('[Firebase Auth] Anonymous sign-in error:', err);
    return { user: null, error: err?.message };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('[Firebase Auth] Sign out error:', err);
  }
}

export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Strip undefined fields so Firestore setDoc never fails on optional empty strings
function stripUndefined<T extends Record<string, any>>(obj: T): T {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = value;
    }
  }
  return clean as T;
}

const KNOWN_QUOTE_IDS_KEY = 'mak_known_quote_ids';
const KNOWN_VEHICLE_IDS_KEY = 'mak_known_vehicle_ids';
const SYSTEM_INIT_QUOTE_ID = 'MAK-QT-SYSTEM-INIT';
const SYSTEM_INIT_VEHICLE_ID = 'MAK-TR-SYSTEM-INIT';

function recordKnownId(storageKey: string, id: string) {
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!existing.includes(id)) {
      localStorage.setItem(storageKey, JSON.stringify([id, ...existing].slice(0, 50)));
    }
  } catch {
    // ignore storage errors
  }
}

function getKnownIds(storageKey: string, defaultId: string): string[] {
  try {
    const existing: string[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.from(new Set([defaultId, ...existing]));
  } catch {
    return [defaultId];
  }
}

// Ensure initial collections & reference records exist in Firestore so Firebase Console immediately displays collections
export async function ensureInitialFirestoreCollections(): Promise<{ quoteReady: boolean; vehicleReady: boolean }> {
  let quoteReady = false;
  let vehicleReady = false;

  try {
    const quoteRef = doc(db, 'quoteRequests', SYSTEM_INIT_QUOTE_ID);
    const quoteSnap = await getDoc(quoteRef);
    if (!quoteSnap.exists()) {
      const sampleQuote = stripUndefined({
        clientName: 'MAK Group Operations Desk',
        companyTitle: 'MAK Group of Companies (Consortium HQ)',
        designation: 'Director Corridor Operations',
        email: 'info@mak-group.com.pk',
        phone: '+92-21-32415678',
        whatsapp: '+92-300-8200000',
        cargoType: 'Containerized Commercial Freight (FCL/LCL)',
        cargoDescription: 'System verification baseline dispatch record — Karachi Port (KPT/QICT) to Upcountry Dry Port & TIR Transit Corridor.',
        services: ['Customs House Clearing Agency (CHCA)', 'Bonded Carrier & Nationwide Fleet'],
        origin: 'Karachi Port (KPT / QICT / SAPT)',
        destination: 'Lahore / Islamabad Dry Port & Torkham Transit',
        weightPerUnit: 24,
        totalUnits: 2,
        metricType: 'Container (TEU)',
        documentNames: ['consortium-system-verification.pdf'],
        status: 'submitted' as const,
        createdAt: new Date().toISOString(),
      });
      await setDoc(quoteRef, sampleQuote);
    }
    recordKnownId(KNOWN_QUOTE_IDS_KEY, SYSTEM_INIT_QUOTE_ID);
    quoteReady = true;
  } catch (err) {
    console.warn('[Firebase] Initial quote collection check:', err);
  }

  try {
    const vehRef = doc(db, 'vehicleRegistrations', SYSTEM_INIT_VEHICLE_ID);
    const vehSnap = await getDoc(vehRef);
    if (!vehSnap.exists()) {
      const sampleVehicle = stripUndefined({
        fullName: 'MAK Fleet Command Center',
        companyName: 'MAK Logistics & Bonded Carrier Division',
        designation: 'Fleet Superintendent',
        email: 'info@mak-group.com.pk',
        phone: '+92-21-32415678',
        whatsapp: '+92-300-8200000',
        primaryCargoType: 'Bonded Containerized & Heavy Project Cargo',
        maxPayloadTons: 60,
        vehicles: [
          {
            plateNumber: 'TLB-901-KHI',
            vehicleType: '40ft High-Cube Skeletal Trailer (Prime Mover)',
            payloadCapacityTons: 45,
            province: 'Sindh (Karachi Port Registry)',
            year: '2025',
          },
        ],
        status: 'submitted' as const,
        createdAt: new Date().toISOString(),
      });
      await setDoc(vehRef, sampleVehicle);
    }
    recordKnownId(KNOWN_VEHICLE_IDS_KEY, SYSTEM_INIT_VEHICLE_ID);
    vehicleReady = true;
  } catch (err) {
    console.warn('[Firebase] Initial vehicle collection check:', err);
  }

  return { quoteReady, vehicleReady };
}

// Connection test on boot per Firestore integration guidelines
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore client is offline or connecting...');
    }
    return false;
  }
}
testConnection();

// In-memory fallback storage if offline or during local simulation
const fallbackQuotes: QuoteRequest[] = [];
const fallbackVehicles: VehicleRegistration[] = [];

// Helper to generate compliant alphanumeric IDs for Firestore rules (isValidId: ^[a-zA-Z0-9_\-]+$)
export function generateRefId(prefix: 'MAK-QT' | 'MAK-TR'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}

// 1. Submit Quote Request
export async function submitQuoteRequest(data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; id: string; error?: string }> {
  const quoteId = generateRefId('MAK-QT');
  const now = new Date().toISOString();

  const payload = stripUndefined({
    ...data,
    status: 'submitted' as const,
    createdAt: now,
    ...(auth.currentUser?.uid ? { userId: auth.currentUser.uid } : {}),
  });

  try {
    const docRef = doc(db, 'quoteRequests', quoteId);
    await setDoc(docRef, payload);
    recordKnownId(KNOWN_QUOTE_IDS_KEY, quoteId);
    return { success: true, id: quoteId };
  } catch (err: any) {
    console.warn('[Firebase] Firestore direct write error, saving to local state fallback:', err);
    fallbackQuotes.unshift({ ...payload, id: quoteId });
    recordKnownId(KNOWN_QUOTE_IDS_KEY, quoteId);
    return { success: true, id: quoteId, error: err?.message };
  }
}

// 2. Submit Transporter Vehicle Registration
export async function submitVehicleRegistration(data: Omit<VehicleRegistration, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; id: string; error?: string }> {
  const regId = generateRefId('MAK-TR');
  const now = new Date().toISOString();

  const payload = stripUndefined({
    ...data,
    status: 'submitted' as const,
    createdAt: now,
    ...(auth.currentUser?.uid ? { userId: auth.currentUser.uid } : {}),
  });

  try {
    const docRef = doc(db, 'vehicleRegistrations', regId);
    await setDoc(docRef, payload);
    recordKnownId(KNOWN_VEHICLE_IDS_KEY, regId);
    return { success: true, id: regId };
  } catch (err: any) {
    console.warn('[Firebase] Firestore direct write error, saving to local state fallback:', err);
    fallbackVehicles.unshift({ ...payload, id: regId });
    recordKnownId(KNOWN_VEHICLE_IDS_KEY, regId);
    return { success: true, id: regId, error: err?.message };
  }
}

// 3. Lookup Inquiry by Reference ID
export async function lookupInquiry(refId: string): Promise<{ type: 'quote' | 'vehicle' | null; data: any; notFound?: boolean }> {
  const cleanId = refId.trim();
  if (!cleanId) return { type: null, data: null, notFound: true };

  // Check quotes
  try {
    const quoteDoc = await getDoc(doc(db, 'quoteRequests', cleanId));
    if (quoteDoc.exists()) {
      return { type: 'quote', data: { id: quoteDoc.id, ...quoteDoc.data() } };
    }
  } catch (e) {
    console.warn('[Firebase] Fetch quote error:', e);
  }

  // Check vehicles
  try {
    const vehicleDoc = await getDoc(doc(db, 'vehicleRegistrations', cleanId));
    if (vehicleDoc.exists()) {
      return { type: 'vehicle', data: { id: vehicleDoc.id, ...vehicleDoc.data() } };
    }
  } catch (e) {
    console.warn('[Firebase] Fetch vehicle error:', e);
  }

  // Check fallbacks
  const localQuote = fallbackQuotes.find(q => q.id === cleanId);
  if (localQuote) return { type: 'quote', data: localQuote };

  const localVeh = fallbackVehicles.find(v => v.id === cleanId);
  if (localVeh) return { type: 'vehicle', data: localVeh };

  return { type: null, data: null, notFound: true };
}

// 4. Fetch Quotes (for Admin / Review)
export async function fetchAllQuotes(): Promise<QuoteRequest[]> {
  try {
    const q = query(collection(db, 'quoteRequests'), limit(50));
    const snapshot = await getDocs(q);
    const remoteList: QuoteRequest[] = [];
    snapshot.forEach(docSnap => {
      remoteList.push({ id: docSnap.id, ...(docSnap.data() as Omit<QuoteRequest, 'id'>) });
    });
    return [...remoteList, ...fallbackQuotes];
  } catch (err) {
    // If Admin logged in via Passcode without Google Sign-In, list is restricted by security rules; fetch known IDs individually via getDoc
    const knownIds = getKnownIds(KNOWN_QUOTE_IDS_KEY, SYSTEM_INIT_QUOTE_ID);
    const fetchedById: QuoteRequest[] = [];
    for (const id of knownIds) {
      try {
        const snap = await getDoc(doc(db, 'quoteRequests', id));
        if (snap.exists()) {
          fetchedById.push({ id: snap.id, ...(snap.data() as Omit<QuoteRequest, 'id'>) });
        }
      } catch {
        // ignore individual doc errors
      }
    }
    const combined = [...fetchedById];
    for (const fb of fallbackQuotes) {
      if (!combined.some(item => item.id === fb.id)) {
        combined.push(fb);
      }
    }
    return combined;
  }
}

// 5. Fetch Transporter Registrations (for Admin)
export async function fetchAllVehicleRegistrations(): Promise<VehicleRegistration[]> {
  try {
    const q = query(collection(db, 'vehicleRegistrations'), limit(50));
    const snapshot = await getDocs(q);
    const remoteList: VehicleRegistration[] = [];
    snapshot.forEach(docSnap => {
      remoteList.push({ id: docSnap.id, ...(docSnap.data() as Omit<VehicleRegistration, 'id'>) });
    });
    return [...remoteList, ...fallbackVehicles];
  } catch (err) {
    const knownIds = getKnownIds(KNOWN_VEHICLE_IDS_KEY, SYSTEM_INIT_VEHICLE_ID);
    const fetchedById: VehicleRegistration[] = [];
    for (const id of knownIds) {
      try {
        const snap = await getDoc(doc(db, 'vehicleRegistrations', id));
        if (snap.exists()) {
          fetchedById.push({ id: snap.id, ...(snap.data() as Omit<VehicleRegistration, 'id'>) });
        }
      } catch {
        // ignore individual doc errors
      }
    }
    const combined = [...fetchedById];
    for (const fb of fallbackVehicles) {
      if (!combined.some(item => item.id === fb.id)) {
        combined.push(fb);
      }
    }
    return combined;
  }
}

// 6. Update Quote Status
export async function updateQuoteStatus(quoteId: string, status: QuoteRequest['status']): Promise<boolean> {
  try {
    const docRef = doc(db, 'quoteRequests', quoteId);
    await updateDoc(docRef, { status });
    return true;
  } catch (err) {
    console.warn('[Firebase] Update quote status failed in Firestore, updating local fallback:', err);
    const item = fallbackQuotes.find(q => q.id === quoteId);
    if (item) item.status = status;
    return true;
  }
}

// 7. Update Registration Status
export async function updateVehicleStatus(regId: string, status: VehicleRegistration['status']): Promise<boolean> {
  try {
    const docRef = doc(db, 'vehicleRegistrations', regId);
    await updateDoc(docRef, { status });
    return true;
  } catch (err) {
    console.warn('[Firebase] Update vehicle status failed in Firestore, updating local fallback:', err);
    const item = fallbackVehicles.find(v => v.id === regId);
    if (item) item.status = status;
    return true;
  }
}
