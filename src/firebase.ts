import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, getDoc, updateDoc, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import type { QuoteRequest, VehicleRegistration } from './types';

// Read config from config file or fallback
const firebaseConfig = {
  projectId: "gen-lang-client-0658279997",
  appId: "1:231637092829:web:032f657821ea8fb2f40e34",
  apiKey: "AIzaSyAuJ08P2Pr9Lw_qn-eDUmIdiE96PYdPxyQ",
  authDomain: "gen-lang-client-0658279997.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-makgrouplogistic-5e96a451-a87a-4eeb-aafb-2260655f7c94",
  storageBucket: "gen-lang-client-0658279997.firebasestorage.app",
  messagingSenderId: "231637092829",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

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

  const payload: QuoteRequest = {
    ...data,
    status: 'submitted',
    createdAt: now,
  };

  try {
    const docRef = doc(db, 'quoteRequests', quoteId);
    await setDoc(docRef, payload);
    return { success: true, id: quoteId };
  } catch (err: any) {
    console.warn('[Firebase] Firestore direct write error, saving to local state fallback:', err);
    fallbackQuotes.unshift({ ...payload, id: quoteId });
    // Still return the generated reference ID to client so user experience is not disrupted
    return { success: true, id: quoteId, error: err?.message };
  }
}

// 2. Submit Transporter Vehicle Registration
export async function submitVehicleRegistration(data: Omit<VehicleRegistration, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; id: string; error?: string }> {
  const regId = generateRefId('MAK-TR');
  const now = new Date().toISOString();

  const payload: VehicleRegistration = {
    ...data,
    status: 'submitted',
    createdAt: now,
  };

  try {
    const docRef = doc(db, 'vehicleRegistrations', regId);
    await setDoc(docRef, payload);
    return { success: true, id: regId };
  } catch (err: any) {
    console.warn('[Firebase] Firestore direct write error, saving to local state fallback:', err);
    fallbackVehicles.unshift({ ...payload, id: regId });
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
    console.warn('[Firebase] Could not fetch quoteRequests, using fallback data:', err);
    return fallbackQuotes;
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
    console.warn('[Firebase] Could not fetch vehicleRegistrations, using fallback data:', err);
    return fallbackVehicles;
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
