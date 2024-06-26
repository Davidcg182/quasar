<template>
  <div class="flex">
    <div class="w-1/4 h-screen bg-gray-100 p-4 sm:hidden md:block">
      <document-form />
    </div>

    <div class="w-3/4 p-4 bg-gray-100 relative">
      <div class="absolute top-4 right-4">
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
