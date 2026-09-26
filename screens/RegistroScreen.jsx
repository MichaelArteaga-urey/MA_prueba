import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { registrarUsuario } from '../services/authService';

export default function RegistroScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [usuario, setUsuario] = useState('');
  const [celular, setCelular] = useState('');

  const [cargando, setCargando] = useState(false);


  const registrar = async () => {

    if (
      !correo.trim() ||
      !contraseña.trim() ||
      !usuario.trim() ||
      !celular.trim()
    ) {

      Alert.alert(
        'Campos incompletos',
        'Por favor complete todos los campos.'
      );

      return;
    }

    try {

      setCargando(true);

      await registrarUsuario(
        correo.trim(),
        contraseña,
        usuario.trim(),
        celular.trim()
      );

      Alert.alert(
        'Registro exitoso',
        'Usuario registrado correctamente.',
        [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      let mensaje =
        'No se pudo completar el registro.';

      if (error.code === 'auth/email-already-in-use') {
        mensaje = 'El correo ya está registrado.';
      }

      if (error.code === 'auth/invalid-email') {
        mensaje = 'El correo electrónico no es válido.';
      }

      if (error.code === 'auth/weak-password') {
        mensaje =
          'La contraseña debe tener al menos 6 caracteres.';
      }

      Alert.alert(
        'Error de registro',
        mensaje
      );

    } finally {

      setCargando(false);

    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.logo}>
          SHOPFIGURE
        </Text>

        <Text style={styles.title}>
          Crear cuenta
        </Text>

        <Text style={styles.subtitle}>
          Regístrate para administrar tu tienda
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

        <TextInput
          style={styles.input}
          placeholder="Ingrese usuario"
          placeholderTextColor="#777"
          autoCapitalize="none"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={styles.input}
          placeholder="Número de celular"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          value={celular}
          onChangeText={setCelular}
        />


        <TouchableOpacity
          style={styles.button}
          onPress={registrar}
          disabled={cargando}
        >

          <Text style={styles.buttonText}>
            {cargando
              ? 'REGISTRANDO...'
              : 'REGISTRAR'}
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >

          <Text style={styles.loginText}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  logo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 30,
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
    fontSize: 14,
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

  loginText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 13,
  },

});