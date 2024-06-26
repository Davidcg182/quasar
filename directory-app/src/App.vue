<template>
  <router-view />
</template>

<style src="./css/app.css"></style>

<script setup>
import { createPinia } from "pinia";
import { useUserStore } from "./stores/user";
import { defineComponent } from "vue";

defineComponent({
  name: "App",
  setup() {
    const pinia = createPinia();
    const userStore = useUserStore();

    userStore.initAuth();

    return {
      pinia,
    };
  },
});
</script>
