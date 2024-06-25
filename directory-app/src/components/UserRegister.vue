<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-2/4 bg-white py-8 px-4 sm:px-8 shadow-2xl rounded-2xl column">
      <h2 className="text-2xl text-center mb-4">Registro</h2>
      <q-input v-model="email" label="Correo electrónico" class="mb-4" />
      <q-input v-model="password" type="password" label="Contraseña" class="mb-4" />
      <q-btn color="primary" label="Registrarse" @click="registerUser" class="mb-4" />
      <router-link to="/login" class="text-center block underline"
        >Ya tengo una cuenta, iniciar sesión</router-link
      >
    </div>
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
        this.$router.push("/document-form");
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    },
  },
};
</script>
