<template>
  <Header></Header>
  <router-view />
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
</style>
