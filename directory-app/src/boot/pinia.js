import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';

export default ({ app }) => {
  const pinia = createPinia();
  pinia.use(piniaPersistedstate);
  app.use(pinia);
};