<template>
  <Header></Header>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </router-view>
  <Footer></Footer>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
