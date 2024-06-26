<template>
  <div>
    <h1 class="text-3xl font-bold text-center col-span-3 mb-8">Tus documentos</h1>
    <div class="grid grid-cols-6 gap-4">
      <div
        v-for="file in files"
        :key="file.id"
        class="bg-white p-4 shadow-lg rounded-lg hover:opacity-70 relative"
      >
        <h3 class="text-lg font-semibold mb-2">{{ file.file_name }}</h3>
        <a :href="file.fileURL" class="text-blue-500 hover:underline">Visualizar</a>

        <span v-if="file.pinned" class="absolute top-2 right-2 text-yellow-500">
          &#128204;
        </span>

        <button
          @click="togglePinned(file)"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ file.pinned ? "Desfijar" : "Fijar" }}
        </button>
        <button
          @click="deleteDocument(file)"
          class="mt-2 p-2 bg-red-500 text-white rounded"
          v-if="!file.pinned"
        >
          Eliminar
        </button>

        <!-- <q-btn @click="openModal(file)" label="Modificar" class="mt-2" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted, computed } from "vue";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useDocumentStore } from "../stores/documents.js";
import { Notify } from "quasar";

export default {
  name: "UserFiles",
  setup() {
    const documentStore = useDocumentStore();
    const files = computed(() => documentStore.documents);

    const getDocuments = (documents) => documentStore.getDocuments(documents);

    onMounted(async () => {
      const q = query(
        collection(db, "documents"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      getDocuments(docs);
    });

    const togglePinned = async (file) => {
      const documentQuery = query(
        collection(db, "documents"),
        where("id", "==", file.id)
      );

      const documentFS = await getDocs(documentQuery);

      let idDocto = "";
      documentFS.forEach((doc) => {
        idDocto = doc.id;
      });

      const docRef = doc(db, "documents", idDocto);
      await updateDoc(docRef, { pinned: !file.pinned });

      const q = query(
        collection(db, "documents"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      getDocuments(docs);
    };

    const deleteDocument = async (file) => {
      if (file.pinned) {
        Notify.create({
          type: "negative",
          message: "No se puede eliminar un archivo fijado",
        });
        return;
      }
      try {
        const documentQuery = query(
          collection(db, "documents"),
          where("id", "==", file.id)
        );

        const documentFS = await getDocs(documentQuery);

        let idDocto = "";
        documentFS.forEach((doc) => {
          idDocto = doc.id;
        });

        const docRef = doc(db, "documents", idDocto);
        await deleteDoc(docRef);

        const q = query(
          collection(db, "documents"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        getDocuments(docs);

        Notify.create({
          type: "positive",
          message: "Archivo eliminado exitosamente",
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: "Error eliminando documento, intentalo luego",
        });

        console.error("Error deleting document: ", error);
      }
    };

    return {
      // hidden,
      files,
      togglePinned,
      deleteDocument,
      // showModal,
      // editedDocument,
      // openModal,
      // closeModal,
      // submitUpdateDocto,
    };
  },
};
</script>

<!-- // // const showModal = ref(false);
    // const editedDocument = ref({ id: "", name: "", pages: 0 });
    // let hidden = "";

    // const openModal = (file) => {
    //   hidden = "hidden";
    //   editedDocument.value = {
    //     id: file.id,
    //     name: file.file_name,
    //     pages: file.pages,
    //   };
    // };

    // const closeModal = () => {
    //   hidden = "";

    //   // showModal.value = false;
    // };

    // const submitUpdateDocto = async () => {
    //   try {
    //     const documentQuery = query(
    //       collection(db, "documents"),
    //       where("id", "==", editedDocument.value.id)
    //     );

    //     const documentFS = await getDocs(documentQuery);

    //     let idDocto = "";
    //     documentFS.forEach((doc) => {
    //       idDocto = doc.id;
    //     });

    //     const docRef = doc(db, "documents", idDocto);
    //     await updateDoc(docRef, {
    //       file_name: editedDocument.value.name,
    //       pages: editedDocument.value.pages,
    //     });

    //     // showModal.value = false;

    //     const q = query(
    //       collection(db, "documents"),
    //       where("userId", "==", auth.currentUser.uid)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     const docs = [];
    //     querySnapshot.forEach((doc) => {
    //       docs.push({ id: doc.id, ...doc.data() });
    //     });

    //     getDocuments(docs);

    //     Notify.create({
    //       type: "positive",
    //       message: "Se realizaron los cambios",
    //     });
    //   } catch (error) {
    //     Notify.create({
    //       type: "negative",
    //       message: "Error modificando el documento, intentalo luego",
    //     });

    //     console.error("Error updating document:", error);
    //   }
    // }; -->

<!-- <div :class="`text-lg mt-4 bg-white ${hidden}`">
      <h3>Modifica aqui tu documento</h3>
      <q-form @submit="submitUpdateDocto">
        <q-input v-model="editedDocument.name" label="Nombre del archivo" />
        <q-input v-model="editedDocument.pages" type="number" label="Número de páginas" />
        <q-btn color="primary" type="submit" label="Modificar" />
        <q-btn color="secondary" label="Cerrar" @click="closeModal" />
      </q-form>
    </div> -->

<!-- <q-modal v-model="showModal">
      <q-card>
        <q-card-section>
          <q-card-title class="text-lg">Modificar Documento</q-card-title>
          <q-form @submit="submitUpdateDocto">
            <q-input v-model="editedDocument.name" label="Nombre del archivo" />
            <q-input
              v-model="editedDocument.pages"
              type="number"
              label="Número de páginas"
            />
            <q-btn color="primary" type="submit" label="Modificar" />
            <q-btn color="secondary" label="Cerrar" @click="closeModal" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-modal> -->
