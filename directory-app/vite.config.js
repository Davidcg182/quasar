import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import env from 'vite-plugin-env';

export default defineConfig({
    plugins: [
        vue(),
        env({
            prefix: 'VITE_',
        }),
    ],
});
