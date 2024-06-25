// src/stores/documents.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useDocumentStore = defineStore('documents', () => {
  const files = ref([]);

  const getDocuments = async () => {
    const q = query(
      collection(db, "documents"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    files.value = [];
    querySnapshot.forEach((doc) => {
      files.value.push({ id: doc.id, ...doc.data() });
    });
  };

  const addDocument = async (document, file) => {
    if (file) {
      const storage = getStorage();
      const fileRef = storageRef(
        storage,
        `documents/${auth.currentUser.uid}/${file.name}`
      );
      try {
        await uploadBytes(fileRef, file);
        const fileURL = await getDownloadURL(fileRef);

        await addDoc(collection(db, "documents"), {
          ...document,
          userId: auth.currentUser.uid,
          fileURL,
        });

        await getDocuments();
      } catch (error) {
        console.error("Error during document upload:", error);
        throw new Error("No se pudo guardar el documento");
      }
    } else {
      throw new Error("Debes seleccionar un documento");
    }
  };

  return { files, getDocuments, addDocument };
});
