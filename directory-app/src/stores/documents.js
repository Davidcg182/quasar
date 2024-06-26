import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('documents', {
  state: () => ({
    documents: []
  }),
  actions: {
    getDocuments(documents) {
      this.documents = documents;
    },
    addDocument(documents) {
      this.documents.push(documents);
    }
  },
  persist: true
});
