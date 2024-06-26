<template>
  <div>
    <h1 class="text-3xl font-bold text-center col-span-3 mb-8">Tus documentos</h1>
    <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-4 grid-cols-1">
      <div
        v-for="file in files"
        :key="file.id"
        class="bg-white p-4 shadow-lg rounded-lg opacity-80 hover:opacity-100 relative flex column"
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

        <button
          @click="openModal(file)"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ file.modify ? "Cerrar" : "Editar" }}
        </button>

        <q-form @submit="sendEmail(file)">
          <q-input v-model="file.destiny_email" label="Email" />
          <q-btn
            color="primary"
            type="submit"
            label="Enviar"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          />
        </q-form>

        <q-form v-if="file.modify" @submit="submitUpdateDocto(file)">
          <q-input v-model="name" label="Nombre del archivo" />
          <q-input v-model="pages" type="number" label="Número de páginas" />
          <q-btn
            color="primary"
            type="submit"
            label="Actualizar"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          />
        </q-form>
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
import emailjs from "emailjs-com";

const documentStore = useDocumentStore();
const files = computed(() => documentStore.documents);

const getDocuments = (documents) => documentStore.getDocuments(documents);

export default {
  name: "UserFiles",
  data() {
    return {
      name: "",
      pages: "",
      email: "",
    };
  },
  methods: {
    async submitUpdateDocto(file) {
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
        await updateDoc(docRef, { file_name: this.name, pages: this.pages });

        const q = query(
          collection(db, "documents"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ destiny_email: "", modify: false, id: doc.id, ...doc.data() });
        });

        getDocuments(docs);

        this.$q.notify({
          type: "positive",
          message: "Documento actualizado exitosamente!",
        });
      } catch (err) {
        console.error("Error updating document:", error);
        this.$q.notify({
          type: "negative",
          message: "No se pudo actualizar el documento",
        });
      }
    },

    sendEmail(file) {
      if (file.destiny_email === "") {
        this.$q.notify({
          type: "warning",
          message: "Debes redactar un destinatario de correo",
        });
        return;
      }
      const templateParams = {
        to_email: file.destiny_email,
        file_name: file.file_name,
        file_url: file.fileURL,
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAIL_USER_ID
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);

            file.destiny_email = "";

            this.$q.notify({
              type: "positive",
              message: "Correo enviado exitosamente!",
            });
          },
          (error) => {
            console.log("FAILED...", error);
            this.$q.notify({
              type: "negative",
              message: "Error al enviar el correo",
            });
          }
        );
    },
  },
  setup() {
    onMounted(async () => {
      const q = query(
        collection(db, "documents"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const docs = [];

      querySnapshot.forEach((doc) => {
        docs.push({ destiny_email: "", modify: false, id: doc.id, ...doc.data() });
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
        docs.push({ destiny_email: "", modify: false, id: doc.id, ...doc.data() });
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
          docs.push({ destiny_email: "", modify: false, id: doc.id, ...doc.data() });
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

    const openModal = (file) => {
      const stateDocs = documentStore.documents;
      const docto = stateDocs.find((e) => file.id === e.id);
      const index = stateDocs.findIndex((e) => file.id === e.id);

      const newDocto = { ...docto, modify: !file.modify };
      stateDocs[index] = newDocto;

      getDocuments(stateDocs);
    };

    return {
      // hidden,
      files,
      togglePinned,
      deleteDocument,
      // showModal,
      // editedDocument,
      openModal,
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
    //       docs.push({ destiny_email: '',modify: true, id: doc.id, ...doc.data() });
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
