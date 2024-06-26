<template>
  <div class="flex flex-col md:flex-row w-full">
    <div class="md:w-1/4 w-full h-screen bg-gray-100 p-4">
      <document-form />
    </div>

    <div class="w-full md:w-3/4 p-4 bg-gray-100 md:relative flex flex-col md:flex-row">
      <div class="md:absolute md:top-4 md:right-4">
        <user-logout />
      </div>
      <user-files />
    </div>
  </div>
</template>

<script>
import DocumentForm from "../components/DocumentForm.vue";
import UserFiles from "../components/UserFiles.vue";
import userLogout from "../components/UserLogout.vue";

export default {
  components: {
    DocumentForm,
    UserFiles,
    userLogout,
  },
};
</script>
