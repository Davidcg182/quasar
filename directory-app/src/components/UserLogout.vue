<template>
  <button @click="logout" class="bg-primary text-white font-bold py-2 px-4 rounded">
    Cerrar sesión
  </button>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "App",
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    },
  },
};
</script>
