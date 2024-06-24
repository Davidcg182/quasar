<!-- src/pages/Register.vue -->
<template>
  <div class="register">
    <h2>Registro</h2>
    <q-input v-model="email" label="Correo electrónico" />
    <q-input v-model="password" type="password" label="Contraseña" />
    <q-btn color="primary" label="Registrarse" @click="registerUser" />
    <router-link to="/login">Ya tengo una cuenta, iniciar sesión</router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$router.push("/document-form"); // Redirige al usuario a /document-form
      } catch (error) {
        console.error("Error registering user:", error.message);
        // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
