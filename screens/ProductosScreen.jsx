import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { escucharProductos } from '../services/productosService';

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarEscucha = escucharProductos((datos) => {
      setProductos(datos);
      setCargando(false);
    });

    return () => {
      cancelarEscucha();
    };
  }, []);

  const renderProducto = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.encabezado}>
          <Text style={styles.categoria}>
            {item.categoria}
          </Text>
        </View>

        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>

        <View style={styles.informacion}>
          <View>
            <Text style={styles.etiqueta}>Precio</Text>
            <Text style={styles.precio}>
              ${Number(item.precio).toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={styles.etiqueta}>Cantidad</Text>
            <Text style={styles.cantidad}>
              {item.cantidad}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cargando}>
          <ActivityIndicator size="large" />
          <Text style={styles.textoCargando}>
            Cargando productos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titulo}>
          Productos
        </Text>

        <Text style={styles.subtitulo}>
          Productos registrados
        </Text>
      </View>

      {productos.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.iconoVacio}>
            📦
          </Text>

          <Text style={styles.tituloVacio}>
            No hay productos registrados
          </Text>

          <Text style={styles.textoVacio}>
            Los productos que registres desde Operaciones aparecerán aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={renderProducto}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#999999',
    fontSize: 14,
    marginTop: 4,
  },

  lista: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  card: {
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#292929',
  },

  encabezado: {
    marginBottom: 10,
  },

  categoria: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  descripcion: {
    color: '#eeeeee',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 18,
  },

  informacion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#292929',
    paddingTop: 14,
  },

  etiqueta: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 3,
  },

  precio: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cantidad: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCargando: {
    color: '#aaaaaa',
    marginTop: 10,
  },

  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  iconoVacio: {
    fontSize: 50,
    marginBottom: 15,
  },

  tituloVacio: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textoVacio: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});