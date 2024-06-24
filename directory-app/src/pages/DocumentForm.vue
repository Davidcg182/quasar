<!-- src/pages/Index.vue -->
<template>
  <q-page class="flex flex-center">
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <q-gutter-md>
            <q-layout>

              <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
                <document-form />
              </q-drawer>

              <q-page-container>
                <user-files />
              </q-page-container>
            </q-layout>
          </q-gutter-md>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
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

<style scoped>
.q-drawer {
  width: 250px;
}
.q-page-container {
  flex: 1;
}
</style>
