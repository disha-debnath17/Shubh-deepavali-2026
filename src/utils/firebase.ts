/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocFromServer,
  arrayUnion,
  increment,
  Unsubscribe,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User, Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const db: Firestore = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Ensure anonymous authentication for every visitor to enable secure Firestore rules
let currentUser: User | null = null;
let authInitPromise: Promise<User> | null = null;

export async function ensureAuth(): Promise<User> {
  if (currentUser) return currentUser;
  if (auth.currentUser) {
    currentUser = auth.currentUser;
    return currentUser;
  }
  if (!authInitPromise) {
    authInitPromise = new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          currentUser = user;
          unsubscribe();
          resolve(user);
        } else {
          try {
            const cred = await signInAnonymously(auth);
            currentUser = cred.user;
            unsubscribe();
            resolve(cred.user);
          } catch (err) {
            console.warn('Anonymous sign-in error:', err);
            unsubscribe();
            reject(err);
          }
        }
      });
    });
  }
  return authInitPromise;
}

// Immediately initiate background anonymous authentication
if (typeof window !== 'undefined') {
  ensureAuth().catch((err) => console.warn('Background auth initialization note:', err));
}

// Connection test as required by Firebase skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline note:', error.message);
      return false;
    }
    return true;
  }
}

export interface FirestoreWish {
  id: string;
  name?: string;
  recipientName?: string;
  state?: string;
  wish: string;
  timestamp: number;
  userId: string;
  moderationStatus: 'pending' | 'approved' | 'flagged';
  reports: number;
  reportedBy?: string[];
  isSample?: boolean;
  isVerified?: boolean;
}

/**
 * Real-time listener for public wishes across India.
 * Automatically sorts by newest first and limits to 30 wishes.
 */
export function subscribeToSharedWishes(
  onUpdate: (wishes: FirestoreWish[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const wishesRef = collection(db, 'wishes');
  const q = query(wishesRef, orderBy('timestamp', 'desc'), limit(30));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: FirestoreWish[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as FirestoreWish;
        // Client-side filter out flagged items if any
        if (data.moderationStatus !== 'flagged' && (data.reports || 0) < 3) {
          items.push({
            ...data,
            id: docSnap.id,
          });
        }
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Real-time wish subscription error, falling back:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Submit a new Diwali community wish to Firestore
 */
export async function submitFirestoreWish(params: {
  name?: string;
  recipientName?: string;
  state?: string;
  wish: string;
}): Promise<FirestoreWish> {
  const user = await ensureAuth();

  const wishId = `wish_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const cleanWish = params.wish.trim().slice(0, 160);
  const cleanName = params.name?.trim().slice(0, 40) || undefined;
  const cleanRecipient = params.recipientName?.trim().slice(0, 40) || undefined;
  const cleanState = params.state?.trim().slice(0, 60) || undefined;

  const newDoc: FirestoreWish = {
    id: wishId,
    name: cleanName,
    recipientName: cleanRecipient,
    state: cleanState,
    wish: cleanWish,
    timestamp: Date.now(),
    userId: user.uid,
    moderationStatus: 'pending',
    reports: 0,
    reportedBy: [],
    isSample: false,
    isVerified: false,
  };

  const wishDocRef = doc(db, 'wishes', wishId);
  await setDoc(wishDocRef, newDoc);

  return newDoc;
}

/**
 * Report a wish for inappropriate content.
 * Prevents duplicate reports from the same user via reportedBy array check.
 */
export async function reportFirestoreWish(wishId: string): Promise<{ success: boolean; alreadyReported?: boolean }> {
  const user = await ensureAuth();
  const wishDocRef = doc(db, 'wishes', wishId);

  try {
    await updateDoc(wishDocRef, {
      reports: increment(1),
      reportedBy: arrayUnion(user.uid),
    });
    return { success: true };
  } catch (err: any) {
    // If rules rejected because user already reported or permission
    console.warn('Could not report wish:', err);
    return { success: false, alreadyReported: true };
  }
}

/**
 * Delete a wish created by the current user
 */
export async function deleteFirestoreWish(wishId: string): Promise<boolean> {
  const user = await ensureAuth();
  const wishDocRef = doc(db, 'wishes', wishId);

  try {
    await deleteDoc(wishDocRef);
    return true;
  } catch (err) {
    console.warn('Could not delete wish:', err);
    return false;
  }
}
