import { getApps, initializeApp } from 'firebase/app';

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

// ==========================================
// CONFIGURACIÓN FIREBASE
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyCzKA48STvF1gSQUgIqk0uQsfVST91tEpU",
  authDomain: "ma-prueba.firebaseapp.com",
  projectId: "ma-prueba",
  storageBucket: "ma-prueba.firebasestorage.app",
  messagingSenderId: "220940682619",
  appId: "1:220940682619:web:f1c52814a9fa6f809ee9de",
  measurementId: "G-MB7X9KB1G1"
};

// ==========================================
// INICIALIZAR FIREBASE
// ==========================================

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

// ==========================================
// AUTH
// ==========================================

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // Si Auth ya fue inicializado, reutilizamos la instancia.
  auth = getAuth(app);
}

// ==========================================
// FIRESTORE
// ==========================================

const db = getFirestore(app);

export { auth, db };