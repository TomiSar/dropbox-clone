import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC16MbhIrJFju9AO4t_0X-V5oJ4IHC-pxw',
  authDomain: 'dropbox-clone-4ee4a.firebaseapp.com',
  projectId: 'dropbox-clone-4ee4a',
  storageBucket: 'dropbox-clone-4ee4a.appspot.com',
  messagingSenderId: '672313455862',
  appId: '1:672313455862:web:847fffcca051462eb868d7',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
