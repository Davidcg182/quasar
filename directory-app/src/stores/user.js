import { defineStore } from 'pinia';
import { auth, onAuthStateChanged } from '../firebase.js';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        },
        initAuth() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.setUser(user);
                } else {
                    this.clearUser();
                }
            });
        },
    },
});