<template>
  <div class="bg-white py-4 px-6 shadow-lg rounded-lg">
    <h3 class="text-xl font-semibold mb-4">Almacena tus documentos</h3>
    <q-form @submit="submitForm">
      <q-input v-model="document.id" label="Numero de identificación (documento)" />
      <q-input v-model="document.name" label="Nombre" />
      <q-input v-model="document.last_name" label="Apellido" />
      <q-input v-model="document.file_name" label="Nombre del archivo" />
      <q-input v-model="document.pages" label="Cantidad de paginas" />
      <q-input v-model="document.size" label="Tamaño" />
      <q-file v-model="file" label="Entrada de archivo" />
      <div class="flex items-center justify-center">
        <q-btn color="primary" type="submit" label="Guardar" class="mt-4 w-3/4" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { db, storage, ref, uploadBytes, getDownloadURL } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";

export default {
  name: "DocumentForm",
  data() {
    return {
      document: {
        id: "",
        name: "",
        last_name: "",
        file_name: "",
        pages: "",
        size: "",
      },
      file: null,
    };
  },
  methods: {
    async submitForm() {
      if (this.file) {
        const fileRef = ref(
          storage,
          `documents/${auth.currentUser.uid}/${this.file.name}`
        );
        try {
          await uploadBytes(fileRef, this.file);
          const fileURL = await getDownloadURL(fileRef);

          await addDoc(collection(db, "documents"), {
            ...this.document,
            userId: auth.currentUser.uid, // Agrega el userId del usuario actual
            fileURL,
          });

          this.$q.notify({
            type: "positive",
            message: "Documento guardado exitosamente!",
          });

          this.document.id = "";
          this.document.name = "";
          this.document.last_name = "";
          this.document.file_name = "";
          this.document.pages = "";
          this.document.size = "";
          this.file = null;
        } catch (error) {
          console.error("Error during document upload:", error);
          this.$q.notify({
            type: "negative",
            message: "No se pudo guardar el documento",
          });
        }
      } else {
        this.$q.notify({ type: "warning", message: "Debes seleccionar un documento" });
      }
    },
  },
};
</script>
