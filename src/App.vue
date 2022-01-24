<template>
  <n-message-provider>
    <Header></Header>
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade"> -->
      <component :is="Component" :key="$route.path"></component>
      <!-- </transition> -->
    </router-view>
    <Footer></Footer>
  </n-message-provider>
</template>

<script>
import { defineComponent, onMounted, provide } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import useWidth from './composables/useWidth';
import { NMessageProvider } from 'naive-ui';
import { getCookie } from './utils/cookie';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Header,
    Footer,
    NMessageProvider,
  },
  setup() {
    const store = useStore();
    const { width } = useWidth();
    provide('width', width);

    const getAuthCookie = () => {
      const session_id = getCookie('session_id');
      const access_token = getCookie('access_token');
      if (session_id && access_token) {
        store.dispatch('accountDetails', { session_id, access_token });
      }
    };

    onMounted(getAuthCookie);
  },
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
