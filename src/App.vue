<template>
  <Header></Header>
  <router-view :key="$route.path" />
  <Footer></Footer>
</template>

<script>
import { defineComponent, provide, ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import useWidth from './composables/useWidth';

export default defineComponent({
  components: {
    Header,
    Footer,
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
</style>
