<template>
  <div class="flex">
    <div class="w-1/4 h-screen bg-gray-100 p-4">
      <document-form />
    </div>

    <div class="w-3/4 p-4 bg-gray-100">
      <user-files />
    </div>
  </div>
</template>

<script>
import DocumentForm from "../components/DocumentForm.vue";
import UserFiles from "../components/UserFiles.vue";

export default {
  components: {
    DocumentForm,
    UserFiles,
  },
};
</script>
