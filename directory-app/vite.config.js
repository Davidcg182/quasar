import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import env from 'vite-plugin-env';

export default defineConfig({
    plugins: [
        vue(),
        env({  // Configuración para cargar variables de entorno
            // Prefixo para las variables de entorno, VITE_ por defecto
            prefix: 'VITE_',
        }),
    ],
});
