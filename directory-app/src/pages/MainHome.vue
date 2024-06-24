<!-- src/pages/Home.vue -->
<template>
  <div class="home">
    <register /> <!-- Aquí se renderizarán las páginas protegidas -->
  </div>
</template>

<script>

import Register from '../components/UserRegister.vue';

export default {
  components: {
    Register
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
