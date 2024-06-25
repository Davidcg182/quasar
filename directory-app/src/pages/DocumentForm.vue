<template>
  <div class="flex">
    <div class="w-1/4 h-screen bg-gray-100 p-4">
      <document-form />
      <!-- <nav-bar /> -->
    </div>

    <div class="w-3/4 p-4 bg-gray-100">
      <user-files />
    </div>
  </div>
</template>

<script>
import DocumentForm from "../components/DocumentForm.vue";
import UserFiles from "../components/UserFiles.vue";
// import NavBar from "../components/NavBar.vue";

export default {
  components: {
    DocumentForm,
    UserFiles,
    // NavBar,
  },
};
</script>
