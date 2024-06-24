<!-- src/pages/Home.vue -->
<template>
  <div class="login">
    <user-login /> <!-- Aquí se renderizarán las páginas protegidas -->
  </div>
</template>

<script>

import UserLogin from '../components/UserLogin.vue';

export default {
  components: {
    UserLogin
  }
};

</script>