import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  setDoc,
} from 'firebase/firestore';

import { auth, db } from './firebase';


// REGISTRAR USUARIO
export const registrarUsuario = async (
  correo,
  contraseña,
  usuario,
  celular
) => {

  const resultado = await createUserWithEmailAndPassword(
    auth,
    correo,
    contraseña
);

const user = resultado.user;

await setDoc(doc(db, 'usuarios', user.uid), {
    uid: user.uid,
    correo: correo,
    usuario: usuario,
    celular: celular,
    fechaRegistro: new Date(),
});

  // Cerramos sesión para que después
  // el usuario vaya al Login
await signOut(auth);

return user;
};


// INICIAR SESIÓN
export const iniciarSesion = async (
correo,
contraseña
) => {

const resultado = await signInWithEmailAndPassword(
    auth,
    correo,
    contraseña
);

return resultado.user;
};


// CERRAR SESIÓN
export const cerrarSesion = async () => {
await signOut(auth);
};