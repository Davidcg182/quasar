import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar getDownloadURL

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

export { db, storage, ref, uploadBytes, getDownloadURL, auth, onAuthStateChanged }; // Exportar getDownloadURL

