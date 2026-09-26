import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

import { db } from './firebase';

export const escucharProductos = (callback) => {
  const consulta = query(
    collection(db, 'operaciones'),
    orderBy('fecha', 'desc')
  );

  return onSnapshot(
    consulta,
    (snapshot) => {
      const productos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(productos);
    },
    (error) => {
      console.error('Error escuchando productos:', error);
    }
  );
};