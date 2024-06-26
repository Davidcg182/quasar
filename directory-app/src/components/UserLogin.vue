<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="w-11/12 md:w-2/4 bg-white py-8 px-4 sm:px-8 shadow-2xl rounded-2xl column"
    >
      <h2 class="text-2xl text-center mb-4">Iniciar Sesión</h2>
      <q-input v-model="email" label="Correo electrónico" class="mb-4" />
      <q-input v-model="password" type="password" label="Contraseña" class="mb-4" />
      <q-btn color="primary" label="Iniciar Sesión" @click="loginUser" class="mb-4" />
      <router-link to="/register" class="text-center block underline"
        >No tengo una cuenta, registrarme</router-link
      >
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$router.push("/document-form"); // Redirige al usuario a /document-form
        this.$q.notify({
          type: "positive",
          message: "Sesion iniciada",
        });
      } catch (error) {
        if (error.message.includes("auth/invalid-credential")) {
          this.$q.notify({
            type: "negative",
            message: "No existe una cuenta asociada a este correo",
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: "Error, intenta en otro momento",
          });
        }
        console.error("Error logging in:", error.message);
      }
    },
  },
};
</script>
