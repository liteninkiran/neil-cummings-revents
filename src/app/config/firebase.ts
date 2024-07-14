import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'revents-2024-9e1e6.firebaseapp.com',
    projectId: 'revents-2024-9e1e6',
    storageBucket: 'revents-2024-9e1e6.appspot.com',
    messagingSenderId: '994537308966',
    appId: '1:994537308966:web:caa3f2a69780eab98277e7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
