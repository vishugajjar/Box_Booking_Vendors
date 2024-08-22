import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

export const firebaseConfig = {
  apiKey:'AIzaSyAH6e5hTZ8RZ4BfOCgkM3A7fjllpeuv-xE',
  authDomain: 'box-booking-75d9b.firebaseapp.com',
  projectId: 'box-booking-75d9b',
  storageBucket: 'box-booking-75d9b.appspot.com',
  messagingSenderId: '803071343674',
  appId: '1:803071343674:android:8e7d02607a16a0b2638903',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const currentAuth = getAuth();

export { currentAuth, auth, db };