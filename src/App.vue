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
import { defineComponent, provide } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import useWidth from './composables/useWidth';
import { NMessageProvider } from 'naive-ui';

export default defineComponent({
  components: {
    Header,
    Footer,
    NMessageProvider,
  },
  setup() {
    const { width } = useWidth();
    provide('width', width);
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
