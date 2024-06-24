<!-- src/components/Files.vue -->
<template>
  <div>
    <h3>Documentos Subidos</h3>
    <q-list bordered separator>
      <q-item v-for="file in files" :key="file.id">
        <q-item-section>
          <q-item-label>{{ file.name }}</q-item-label>
          <q-item-label caption>{{ file.fileURL }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: 'UserFiles',
  setup() {
    const files = ref([]);

    onMounted(async () => {
      const q = query(collection(db, 'documents'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        files.value.push({ id: doc.id, ...doc.data() });
      });
    });

    return { files };
  }
};
</script>

<style scoped>
.q-list {
  max-width: 100%;
}
</style>
