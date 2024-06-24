<!-- src/components/DocumentForm.vue -->
<template>
  <q-form @submit="submitForm">
    <q-input v-model="document.id" label="Documento de identificacion" />
    <q-input v-model="document.name" label="Nombre de pila" />
    <q-input v-model="document.last_name" label="Apellido" />
    <q-input v-model="document.file_name" label="Nombre del archivo" />
    <q-input v-model="document.pages" label="Cantidad de paginas" />
    <q-input v-model="document.size" label="Tamaño" />
    <q-file v-model="file" label="Entrada de archivo" />
    <q-btn type="submit" label="Guardar" />
  </q-form>
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
        const fileRef = ref(storage, `documents/${auth.currentUser.uid}/${this.document.file_name}`);

        console.log("fileRef", fileRef);

        try {
          await uploadBytes(fileRef, this.file);
          const fileURL = await getDownloadURL(fileRef);

          this.$q.notify({ type: "positive", message: "Document and file saved!" });

          this.document.id = "";
          this.document.name = "";
          this.document.last_name = "";
          this.document.file_name = "";
          this.document.pages = "";
          this.document.size = "";
          this.file = null;
        } catch (error) {
          console.log("error", error);
          this.$q.notify({
            type: "negative",
            message: "Error saving document and file.",
          });
        }
      } else {
        this.$q.notify({ type: "negative", message: "Please select a file to upload." });
      }
    },
  },
};
</script>
