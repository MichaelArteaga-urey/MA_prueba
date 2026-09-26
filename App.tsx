import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './services/firebase';
import AppNavigator from './navigation/AppNavigator';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';


export default function App() {

  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

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

  if (cargando) {
    return null;
  }

  return (
    <NavigationContainer>

      {usuario ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
