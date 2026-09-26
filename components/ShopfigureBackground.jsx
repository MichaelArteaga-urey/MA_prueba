import React from 'react';

import {
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';

export default function ShopfigureBackground({ children }) {
  return (
    <ImageBackground
      source={require('../app/assets/shopfigure-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >

      {/* Capa oscura para mejorar la lectura */}
      <View style={styles.overlay} />

      {/* Contenido */}
      <View style={styles.content}>
        {children}
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
  },

  content: {
    flex: 1,
  },
});