// src/stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
    });

    return { user };
});
