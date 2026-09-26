import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

import { db } from './firebase';

export const escucharHistorial = (callback) => {
  const consulta = query(
    collection(db, 'operaciones'),
    orderBy('fecha', 'desc')
  );

  return onSnapshot(
    consulta,
    (snapshot) => {
      const registros = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(registros);
    },
    (error) => {
      console.error('Error al cargar historial:', error);
    }
  );
};