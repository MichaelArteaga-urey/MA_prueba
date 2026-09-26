import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ShopfigureBackground from '../components/ShopfigureBackground';

export default function WelcomeScreen({ navigation }) {
  return (
    <ShopfigureBackground>
      <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SHOP</Text>
        <Text style={styles.logoSecondary}>FIGURE</Text>
        <Text style={styles.subtitle}>
          Figuras y coleccionables
        </Text>
      </View>

      <View style={styles.content}>

        <Text style={styles.welcome}>
          ¡Bienvenido!
        </Text>

        <Text style={styles.description}>
          Administra tus operaciones de manera
          rápida y sencilla.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>
            INICIAR SESIÓN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.secondaryButtonText}>
            CREAR CUENTA
          </Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.footer}>
        SHOPFIGURE © 2026
      </Text>

    </View>
    </ShopfigureBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingVertical: 50,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  logo: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 3,
  },

  logoSecondary: {
    fontSize: 42,
    fontWeight: '900',
    color: '#e5e5e5',
    letterSpacing: 3,
  },

  subtitle: {
    marginTop: 8,
    color: '#999999',
    fontSize: 14,
  },

  content: {
    alignItems: 'center',
  },

  welcome: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },

  description: {
    color: '#aaaaaa',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 35,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  primaryButtonText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },

  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#666666',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  footer: {
    color: '#666666',
    textAlign: 'center',
    fontSize: 12,
  },
});