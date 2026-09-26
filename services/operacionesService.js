import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebase';


// ======================================================
// GUARDAR OPERACIÓN
// ======================================================

export const guardarOperacion = async ({
  precio,
  cantidad,
  categoria,
  descripcion,
  uid,
}) => {

  try {

    // -----------------------------------------------
    // Crear el documento en Firestore
    // -----------------------------------------------

    const referencia = await addDoc(
      collection(db, 'operaciones'),
      {
        precio: precio,

        cantidad: cantidad,

        categoria: categoria,

        descripcion: descripcion,

        uid: uid,

        fecha: serverTimestamp(),
      }
    );


    // -----------------------------------------------
    // El ID generado automáticamente por Firestore
    // será nuestro ID de operación
    // -----------------------------------------------

    const idOperacion = referencia.id;


    // -----------------------------------------------
    // Guardamos también el ID dentro del documento
    // -----------------------------------------------

    // IMPORTANTE:
    // Para no hacer otra escritura innecesaria,
    // simplemente devolvemos el ID.
    //
    // El documento ya existe y su ID es único.


    return {
      id: referencia.id,
      idOperacion: idOperacion,
    };


  } catch (error) {

    console.error(
      'Error en guardarOperacion:',
      error
    );

    throw error;
  }
};