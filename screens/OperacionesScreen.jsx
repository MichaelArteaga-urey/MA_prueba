import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { auth } from '../services/firebase';
import { guardarOperacion } from '../services/operacionesService';

const categorias = [
  'One Piece',
  'Dragon Ball',
  'Bleach',
  'Naruto',
  'Marvel',
];

export default function OperacionesScreen() {
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // ==========================================
  // GUARDAR PRODUCTO
  // ==========================================
  const guardarProducto = async () => {
    try {
      if (!auth.currentUser) {
        Alert.alert(
          'Sesión requerida',
          'No hay un usuario iniciado en sesión.'
        );
        return;
      }

      setGuardando(true);

      await guardarOperacion({
        precio: Number(precio),
        cantidad: Number(cantidad),
        categoria,
        descripcion: descripcion.trim(),
        uid: auth.currentUser.uid,
      });

      Alert.alert(
        'Registro exitoso',
        'El producto se registró correctamente.'
      );

      // Limpiar formulario
      setPrecio('');
      setCantidad('');
      setCategoria('');
      setDescripcion('');

    } catch (error) {
      console.error('Error al registrar producto:', error);

      Alert.alert(
        'Error',
        'No se pudo registrar el producto. Intente nuevamente.'
      );
    } finally {
      setGuardando(false);
    }
  };

  // ==========================================
  // VALIDAR Y REGISTRAR
  // ==========================================
  const registrarProducto = () => {
    if (!precio.trim() || !cantidad.trim() || !categoria || !descripcion.trim()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor complete todos los campos.'
      );
      return;
    }

    const precioNumero = Number(precio);
    const cantidadNumero = Number(cantidad);

    if (isNaN(precioNumero) || isNaN(cantidadNumero)) {
      Alert.alert(
        'Datos inválidos',
        'Precio y cantidad deben ser valores numéricos.'
      );
      return;
    }

    // No permitir precio negativo
    if (precioNumero < 0) {
      Alert.alert(
        'Monto inválido',
        'El precio no puede ser negativo.'
      );
      return;
    }

    // Cantidad debe ser mayor que 0
    if (cantidadNumero <= 0) {
      Alert.alert(
        'Cantidad inválida',
        'La cantidad debe ser mayor a 0.'
      );
      return;
    }

    // Validación solicitada en el examen
    if (precioNumero < 1 || precioNumero > 20) {
      Alert.alert(
        'Confirmar registro',
        'El precio está fuera del rango de $1 a $20. ¿Desea continuar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            onPress: guardarProducto,
          },
        ]
      );

      return;
    }

    guardarProducto();
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ================= HEADER ================= */}

          <View style={styles.header}>

            <Text style={styles.marca}>
              SHOPFIGURE
            </Text>

            <Text style={styles.titulo}>
              Registrar producto
            </Text>

            <Text style={styles.subtitulo}>
              Agrega un nuevo producto al registro
            </Text>

          </View>

          {/* ================= FORMULARIO ================= */}

          <View style={styles.formulario}>

            {/* PRECIO */}

            <View style={styles.grupo}>

              <Text style={styles.label}>
                Precio
              </Text>

              <View style={styles.inputContainer}>

                <Text style={styles.simbolo}>
                  $
                </Text>

                <TextInput
                  style={styles.input}
                  value={precio}
                  onChangeText={setPrecio}
                  placeholder="0.00"
                  placeholderTextColor="#666"
                  keyboardType="decimal-pad"
                />

              </View>

            </View>

            {/* CANTIDAD */}

            <View style={styles.grupo}>

              <Text style={styles.label}>
                Cantidad
              </Text>

              <View style={styles.inputContainer}>

                <TextInput
                  style={styles.input}
                  value={cantidad}
                  onChangeText={setCantidad}
                  placeholder="Ingrese la cantidad"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />

              </View>

            </View>

            {/* CATEGORÍA */}

            <View style={styles.grupo}>

              <Text style={styles.label}>
                Categoría
              </Text>

              <TouchableOpacity
                style={styles.selector}
                onPress={() => setMostrarCategorias(true)}
                activeOpacity={0.8}
              >

                <Text
                  style={
                    categoria
                      ? styles.selectorTexto
                      : styles.selectorPlaceholder
                  }
                >
                  {categoria || 'Seleccionar categoría'}
                </Text>

                <Text style={styles.flecha}>
                  ▼
                </Text>

              </TouchableOpacity>

            </View>

            {/* DESCRIPCIÓN */}

            <View style={styles.grupo}>

              <Text style={styles.label}>
                Descripción
              </Text>

              <View style={styles.descripcionContainer}>

                <TextInput
                  style={styles.descripcionInput}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  placeholder="Describe el producto"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={150}
                />

              </View>

              <Text style={styles.contador}>
                {descripcion.length}/150
              </Text>

            </View>

            {/* BOTÓN */}

            <TouchableOpacity
              style={[
                styles.boton,
                guardando && styles.botonDesactivado,
              ]}
              onPress={registrarProducto}
              disabled={guardando}
              activeOpacity={0.8}
            >

              {guardando ? (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                />
              ) : (
                <Text style={styles.botonTexto}>
                  REGISTRAR PRODUCTO
                </Text>
              )}

            </TouchableOpacity>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* ================= MODAL CATEGORÍAS ================= */}

      <Modal
        visible={mostrarCategorias}
        transparent
        animationType="fade"
        onRequestClose={() => setMostrarCategorias(false)}
      >

        <View style={styles.modalFondo}>

          <View style={styles.modal}>

            <Text style={styles.modalTitulo}>
              Seleccionar categoría
            </Text>

            {categorias.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.categoriaOpcion}
                onPress={() => {
                  setCategoria(item);
                  setMostrarCategorias(false);
                }}
                activeOpacity={0.7}
              >

                <Text style={styles.categoriaTexto}>
                  {item}
                </Text>

              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelar}
              onPress={() => setMostrarCategorias(false)}
            >

              <Text style={styles.cancelarTexto}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

// ======================================================
// ESTILOS SHOPFIGURE
// ======================================================

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

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
    marginBottom: 30,
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
    marginBottom: 7,
  },

  subtitulo: {
    color: '#888888',
    fontSize: 14,
  },

  // ================= FORMULARIO =================

  formulario: {
    width: '100%',
  },

  grupo: {
    marginBottom: 20,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  // ================= INPUT =================

  inputContainer: {
    height: 54,
    backgroundColor: '#171717',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#292929',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  simbolo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
  },

  // ================= SELECTOR =================

  selector: {
    height: 54,
    backgroundColor: '#171717',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#292929',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectorTexto: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  selectorPlaceholder: {
    color: '#666666',
    fontSize: 16,
  },

  flecha: {
    color: '#AAAAAA',
    fontSize: 12,
  },

  // ================= DESCRIPCIÓN =================

  descripcionContainer: {
    backgroundColor: '#171717',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#292929',
    minHeight: 115,
  },

  descripcionInput: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 14,
    minHeight: 115,
  },

  contador: {
    color: '#555555',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 5,
  },

  // ================= BOTÓN =================

  boton: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  botonDesactivado: {
    opacity: 0.6,
  },

  botonTexto: {
    color: '#0B0B0B',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  // ================= MODAL =================

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  modal: {
    backgroundColor: '#171717',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#303030',
  },

  modalTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
  },

  categoriaOpcion: {
    backgroundColor: '#222222',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 8,
  },

  categoriaTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  cancelar: {
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,
  },

  cancelarTexto: {
    color: '#999999',
    fontSize: 14,
    fontWeight: '600',
  },

});