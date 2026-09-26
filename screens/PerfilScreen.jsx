import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import { cerrarSesion } from '../services/authService';

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // ==========================================
  // CARGAR INFORMACIÓN DEL USUARIO
  // ==========================================

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      const usuarioActual = auth.currentUser;

      if (!usuarioActual) {
        setCargando(false);
        return;
      }

      const referencia = doc(
        db,
        'usuarios',
        usuarioActual.uid
      );

      const documento = await getDoc(referencia);

      if (documento.exists()) {
        setUsuario(documento.data());
      } else {
        // Si por alguna razón no existe el documento,
        // usamos los datos disponibles de Firebase Auth.
        setUsuario({
          correo: usuarioActual.email || '',
          usuario: 'Usuario',
          celular: '',
        });
      }

    } catch (error) {
      console.error(
        'Error cargando perfil:',
        error
      );

      Alert.alert(
        'Error',
        'No se pudo cargar la información del perfil.'
      );

    } finally {
      setCargando(false);
    }
  };

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  const manejarCerrarSesion = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Está seguro de que desea cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await cerrarSesion();
            } catch (error) {
              console.error(
                'Error cerrando sesión:',
                error
              );

              Alert.alert(
                'Error',
                'No se pudo cerrar la sesión.'
              );
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // CARGANDO
  // ==========================================

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.cargando}>

          <ActivityIndicator
            size="large"
            color="#FFFFFF"
          />

          <Text style={styles.textoCargando}>
            Cargando perfil...
          </Text>

        </View>

      </SafeAreaView>
    );
  }

  // ==========================================
  // PERFIL
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <Text style={styles.marca}>
            SHOPFIGURE
          </Text>

          <Text style={styles.titulo}>
            Mi perfil
          </Text>

          <Text style={styles.subtitulo}>
            Información de tu cuenta
          </Text>

        </View>

        {/* ================= USUARIO ================= */}

        <View style={styles.usuarioCard}>

          <View style={styles.avatar}>

            <Text style={styles.avatarTexto}>
              {usuario?.usuario
                ? usuario.usuario
                    .charAt(0)
                    .toUpperCase()
                : 'U'}
            </Text>

          </View>

          <View style={styles.usuarioInfo}>

            <Text style={styles.nombre}>
              {usuario?.usuario || 'Usuario'}
            </Text>

            <Text style={styles.correo}>
              {usuario?.correo ||
                auth.currentUser?.email ||
                ''}
            </Text>

          </View>

        </View>

        {/* ================= INFORMACIÓN PERSONAL ================= */}

        <View style={styles.seccion}>

          <Text style={styles.seccionTitulo}>
            INFORMACIÓN PERSONAL
          </Text>

          <View style={styles.item}>

            <View style={styles.itemTexto}>

              <Text style={styles.itemEtiqueta}>
                Usuario
              </Text>

              <Text style={styles.itemValor}>
                {usuario?.usuario || 'No registrado'}
              </Text>

            </View>

          </View>

          <View style={styles.item}>

            <View style={styles.itemTexto}>

              <Text style={styles.itemEtiqueta}>
                Correo electrónico
              </Text>

              <Text style={styles.itemValor}>
                {usuario?.correo ||
                  auth.currentUser?.email ||
                  'No registrado'}
              </Text>

            </View>

          </View>

          <View style={styles.item}>

            <View style={styles.itemTexto}>

              <Text style={styles.itemEtiqueta}>
                Celular
              </Text>

              <Text style={styles.itemValor}>
                {usuario?.celular || 'No registrado'}
              </Text>

            </View>

          </View>

        </View>

        {/* ================= CUENTA ================= */}

        <View style={styles.seccion}>

          <Text style={styles.seccionTitulo}>
            CUENTA
          </Text>

          <View style={styles.item}>

            <View style={styles.itemTexto}>

              <Text style={styles.itemEtiqueta}>
                Estado
              </Text>

              <Text style={styles.estado}>
                Cuenta activa
              </Text>

            </View>

          </View>

          <View style={styles.item}>

            <View style={styles.itemTexto}>

              <Text style={styles.itemEtiqueta}>
                Acceso
              </Text>

              <Text style={styles.itemValor}>
                Usuario registrado
              </Text>

            </View>

          </View>

        </View>

        {/* ================= CERRAR SESIÓN ================= */}

        <TouchableOpacity
          style={styles.botonCerrar}
          onPress={manejarCerrarSesion}
          activeOpacity={0.8}
        >

          <Text style={styles.botonCerrarTexto}>
            CERRAR SESIÓN
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

// ======================================================
// ESTILOS SHOPFIGURE
// ======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },

  // ================= HEADER =================

  header: {
    marginBottom: 25,
  },

  marca: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 12,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  subtitulo: {
    color: '#888888',
    fontSize: 14,
    marginTop: 6,
  },

  // ================= USUARIO =================

  usuarioCard: {
    backgroundColor: '#171717',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#292929',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarTexto: {
    color: '#0B0B0B',
    fontSize: 24,
    fontWeight: '900',
  },

  usuarioInfo: {
    flex: 1,
  },

  nombre: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 5,
  },

  correo: {
    color: '#888888',
    fontSize: 13,
  },

  // ================= SECCIONES =================

  seccion: {
    marginBottom: 25,
  },

  seccionTitulo: {
    color: '#777777',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  item: {
    backgroundColor: '#171717',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#292929',
    padding: 15,
    marginBottom: 8,
  },

  itemTexto: {
    flex: 1,
  },

  itemEtiqueta: {
    color: '#777777',
    fontSize: 12,
    marginBottom: 5,
  },

  itemValor: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  estado: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  // ================= BOTÓN =================

  botonCerrar: {
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  botonCerrarTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // ================= CARGANDO =================

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCargando: {
    color: '#888888',
    marginTop: 12,
  },

});