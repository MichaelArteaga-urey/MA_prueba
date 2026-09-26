import React, { useState } from 'react';

import {View, Text, TextInput,TouchableOpacity, StyleSheet, Alert,} from 'react-native';

import { iniciarSesion } from '../services/authService';
import ShopfigureBackground from '../components/ShopfigureBackground';

export default function LoginScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);


  const login = async () => {

    if (
      !correo.trim() ||
      !contraseña.trim()
    ) {

      Alert.alert(
        'Campos incompletos',
        'Ingrese correo y contraseña.'
      );

      return;
    }

    try {

      setCargando(true);

      await iniciarSesion(
        correo.trim(),
        contraseña
      );



    } catch (error) {

      console.log(error);

      let mensaje =
        'No se pudo iniciar sesión.';

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-login-credentials'
      ) {

        mensaje =
          'Correo o contraseña incorrectos.';
      }

      if (error.code === 'auth/user-not-found') {
        mensaje =
          'No existe un usuario con este correo.';
      }

      if (error.code === 'auth/wrong-password') {
        mensaje =
          'La contraseña es incorrecta.';
      }

      if (error.code === 'auth/invalid-email') {
        mensaje =
          'El correo electrónico no es válido.';
      }

      Alert.alert(
        'Error de inicio de sesión',
        mensaje
      );

    } finally {

      setCargando(false);

    }
  };


  return (
    <ShopfigureBackground>
    <View style={styles.container}>

      <Text style={styles.logo}>
        SHOPFIGURE
      </Text>

      <Text style={styles.title}>
        Iniciar sesión
      </Text>

      <Text style={styles.subtitle}>
        Accede a tu cuenta
      </Text>


      <TextInput
        style={styles.input}
        placeholder="Ingrese correo"
        placeholderTextColor="#777"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />


      <TextInput
        style={styles.input}
        placeholder="Ingrese contraseña"
        placeholderTextColor="#777"
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={login}
        disabled={cargando}
      >

        <Text style={styles.buttonText}>
          {cargando
            ? 'INGRESANDO...'
            : 'LOGIN'}
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => navigation.navigate('Registro')}
      >

        <Text style={styles.registerText}>
          ¿No tienes una cuenta? Regístrate
        </Text>

      </TouchableOpacity>


    </View>
    </ShopfigureBackground>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 45,
  },

  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },

  subtitle: {
    color: '#888888',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#1c1c1c',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 14,
  },

  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#111111',
    fontWeight: '800',
    fontSize: 15,
  },

  registerText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 25,
  },

});