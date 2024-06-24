<!-- src/pages/Home.vue -->
<template>
  <div class="home">
    <user-register /> <!-- Aquí se renderizarán las páginas protegidas -->
  </div>
</template>

<script>

import UserRegister from '../components/UserRegister.vue';

export default {
  components: {
    UserRegister
  }
};

</script>

<style scoped>
.home {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
