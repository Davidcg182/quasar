<!-- src/pages/Login.vue -->
<template>
  <div class="login">
    <h2>Iniciar Sesión</h2>
    <q-input v-model="email" label="Correo electrónico" />
    <q-input v-model="password" type="password" label="Contraseña" />
    <q-btn color="primary" label="Iniciar Sesión" @click="loginUser" />
    <router-link to="/register">No tengo una cuenta, registrarme</router-link>
  </div>
</template>

<script>
import { ref } from "vue";
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
      } catch (error) {
        console.error("Error logging in:", error.message);
        // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
