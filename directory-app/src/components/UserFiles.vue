<template>
  <div>
    <h1 class="text-3xl font-bold text-center col-span-3 mb-8">Tus documentos</h1>
    <div class="grid grid-cols-6 gap-4">
      <div
        v-for="file in files"
        :key="file.id"
        class="bg-white p-4 shadow-lg rounded-lg hover:opacity-70"
      >
        <h3 class="text-lg font-semibold mb-2">{{ file.file_name }}</h3>
        <a :href="file.fileURL" class="text-blue-500 hover:underline">Visualizar</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDocumentStore } from "../stores/documents.js";

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

    console.log("userFIles", files);

    return { files };
  },
};
</script>
