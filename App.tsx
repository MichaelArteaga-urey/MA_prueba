import React, {
  useEffect,
  useState,
} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  onAuthStateChanged,
  getAuth,
  User,
} from 'firebase/auth';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import './services/firebase';

import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';

export default function App() {

  const [usuario, setUsuario] = useState<User | null>(null);

  const [cargando, setCargando] = useState(true);

  // ==========================================
  // FIREBASE AUTH
  // ==========================================

  const auth = getAuth();

  // ==========================================
  // VERIFICAR SESIÓN
  // ==========================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        setUsuario(user);

        setCargando(false);

      }
    );

    return unsubscribe;

  }, []);

  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {
    return null;
  }

  // ==========================================
  // APP
  // ==========================================

  return (
    <SafeAreaProvider>

      <NavigationContainer>

        {usuario ? (
          <AppNavigator />
        ) : (
          <AuthNavigator />
        )}

      </NavigationContainer>

    </SafeAreaProvider>
  );
}