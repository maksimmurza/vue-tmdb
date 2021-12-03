<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<script>
import { defineComponent } from 'vue';
import { NLayout } from 'naive-ui';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  components: {
    // NLayout,
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
#app {
  /* display: flex; */
  /* flex-direction: column; */
  height: 100vh;
}
</style>
