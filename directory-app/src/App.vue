<template>
  <router-view />
</template>

<style src="./css/app.css"></style>

<script setup>
defineOptions({
  name: "App",
});
</script>

<!-- <template>
  <router-view v-if="authResolved" />
</template> -->

<!-- <script>
import { ref, onMounted } from "vue";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createPinia, useStore } from "pinia";
import { createApp } from "vue";
import { useUserStore } from "./stores/user";

export default {
  name: "App",
  setup() {
    const isAuthenticated = ref(false);
    const authResolved = ref(false);
    const pinia = createPinia();
    const app = createApp({});
    app.use(pinia);
    const userStore = useUserStore();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = !!user;
        userStore.user = user;
        authResolved.value = true;
      });
    });

    return { isAuthenticated, authResolved };
  },
};
</script> -->
