import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistorialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HISTORIAL</Text>
      <Text style={styles.subtitle}>
        Transacciones SHOPFIGURE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },

  subtitle: {
    color: '#888888',
    marginTop: 10,
  },
});