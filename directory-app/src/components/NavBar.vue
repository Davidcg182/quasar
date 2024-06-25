<!-- <template>
  <nav>
    <div v-if="user">
      <button @click="logout">Cerrar sesión</button>
    </div>
    <div v-else>
      <router-link to="/login">Iniciar sesión</router-link>
      <router-link to="/register">Registrarse</router-link>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "../stores/user";
import { auth } from "../firebase";

export default {
  setup() {
    const userStore = useUserStore();
    const { user } = userStore;

    const logout = async () => {
      await auth.signOut();
    };

    return { user, logout };
  },
};
</script> -->
