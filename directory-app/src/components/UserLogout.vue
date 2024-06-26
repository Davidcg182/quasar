<template>
  <div class="flex items-center justify-center">
    <button
      @click="logout"
      class="bg-primary text-white font-bold py-2 px-4 rounded w-3/4 md:w-full"
    >
      Cerrar sesión
    </button>
  </div>
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
