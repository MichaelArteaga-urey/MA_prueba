import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OperacionesScreen from '../screens/OperacionesScreen';
import HistorialScreen from '../screens/Historial.jsx';
import PerfilScreen from '../screens/PerfilScreen';
import ProductosScreen from '../screens/ProductosScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      
      <Tab.Screen
        name="Productos"
        component={ProductosScreen}
      />
      <Tab.Screen
        name="Operaciones"
        component={OperacionesScreen}
      />
      <Tab.Screen
        name="Historial"
        component={HistorialScreen}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
      />
    
    </Tab.Navigator>
  );
}