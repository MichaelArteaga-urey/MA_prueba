import React from 'react';

import {
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';

export default function ShopfigureBackground({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpeg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={4}
    >
      {/* Oscurece la imagen, pero NO la tapa */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});