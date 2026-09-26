import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { escucharHistorial } from '../services/historialService';

export default function Historial() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  useEffect(() => {
    const cancelarEscucha = escucharHistorial((datos) => {
      setRegistros(datos);
      setCargando(false);
    });

    return () => {
      cancelarEscucha();
    };
  }, []);

  // ==========================================
  // TARJETA DEL HISTORIAL
  // ==========================================

  const renderRegistro = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => setRegistroSeleccionado(item)}
      >

        <View style={styles.numeroContainer}>
          <Text style={styles.numero}>
            #{index + 1}
          </Text>
        </View>

        <View style={styles.info}>

          <Text style={styles.itemTitulo}>
            {item.descripcion}
          </Text>

          <Text style={styles.categoria}>
            {item.categoria}
          </Text>

          <View style={styles.resumen}>

            <Text style={styles.resumenTexto}>
              Cantidad: {item.cantidad}
            </Text>

            <Text style={styles.resumenPrecio}>
              ${Number(item.precio).toFixed(2)}
            </Text>

          </View>

        </View>

        <Text style={styles.flecha}>
          ›
        </Text>

      </TouchableOpacity>
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
            Cargando historial...
          </Text>

        </View>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <Text style={styles.marca}>
          SHOPFIGURE
        </Text>

        <Text style={styles.titulo}>
          Historial
        </Text>

        <Text style={styles.subtitulo}>
          Registros de productos
        </Text>

      </View>

      {/* ================= LISTA ================= */}

      {registros.length === 0 ? (

        <View style={styles.vacio}>

          <Text style={styles.icono}>
            🧾
          </Text>

          <Text style={styles.tituloVacio}>
            No hay registros
          </Text>

          <Text style={styles.textoVacio}>
            Los productos registrados desde Operaciones aparecerán aquí.
          </Text>

        </View>

      ) : (

        <FlatList
          data={registros}
          keyExtractor={(item) => item.id}
          renderItem={renderRegistro}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />

      )}

      {/* ================= MODAL ================= */}

      <Modal
        visible={registroSeleccionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setRegistroSeleccionado(null)}
      >

        <View style={styles.modalFondo}>

          <View style={styles.modal}>

            {/* ENCABEZADO */}

            <View style={styles.modalHeader}>

              <Text style={styles.modalMarca}>
                SHOPFIGURE
              </Text>

              <TouchableOpacity
                onPress={() => setRegistroSeleccionado(null)}
              >

                <Text style={styles.cerrar}>
                  ✕
                </Text>

              </TouchableOpacity>

            </View>

            <Text style={styles.modalTitulo}>
              Detalle del registro
            </Text>

            {/* ================= ITEM ================= */}

            <View style={styles.dato}>

              <Text style={styles.datoEtiqueta}>
                ITEM
              </Text>

              <Text style={styles.datoValor}>
                {registroSeleccionado?.descripcion}
              </Text>

            </View>

            {/* ================= CATEGORÍA ================= */}

            <View style={styles.dato}>

              <Text style={styles.datoEtiqueta}>
                CATEGORÍA
              </Text>

              <Text style={styles.datoValor}>
                {registroSeleccionado?.categoria}
              </Text>

            </View>

            {/* ================= CANTIDAD ================= */}

            <View style={styles.dato}>

              <Text style={styles.datoEtiqueta}>
                CANTIDAD
              </Text>

              <Text style={styles.datoValorGrande}>
                {registroSeleccionado?.cantidad}
              </Text>

            </View>

            {/* ================= PRECIO ================= */}

            <View style={styles.dato}>

              <Text style={styles.datoEtiqueta}>
                PRECIO
              </Text>

              <Text style={styles.precioModal}>
                $
                {Number(
                  registroSeleccionado?.precio || 0
                ).toFixed(2)}
              </Text>

            </View>

            {/* ================= BOTÓN ================= */}

            <TouchableOpacity
              style={styles.botonCerrar}
              onPress={() => setRegistroSeleccionado(null)}
              activeOpacity={0.8}
            >

              <Text style={styles.botonCerrarTexto}>
                CERRAR
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

  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  // ================= HEADER =================

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
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

  // ================= LISTA =================

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#171717',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#292929',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  numeroContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  numero: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  info: {
    flex: 1,
  },

  itemTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  categoria: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 9,
  },

  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  resumenTexto: {
    color: '#AAAAAA',
    fontSize: 12,
    marginRight: 15,
  },

  resumenPrecio: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  flecha: {
    color: '#777777',
    fontSize: 28,
    marginLeft: 8,
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

  // ================= VACÍO =================

  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  icono: {
    fontSize: 50,
    marginBottom: 15,
  },

  tituloVacio: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },

  textoVacio: {
    color: '#777777',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  // ================= MODAL =================

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.80)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modal: {
    backgroundColor: '#171717',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#303030',
    padding: 22,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalMarca: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },

  cerrar: {
    color: '#888888',
    fontSize: 20,
  },

  modalTitulo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 15,
    marginBottom: 20,
  },

  // ================= DATOS =================

  dato: {
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  datoEtiqueta: {
    color: '#777777',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 5,
  },

  datoValor: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  datoValorGrande: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  precioModal: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  // ================= BOTÓN =================

  botonCerrar: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  botonCerrarTexto: {
    color: '#0B0B0B',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

});