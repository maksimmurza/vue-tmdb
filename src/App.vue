<template>
  <n-message-provider>
    <Header></Header>
    <router-view :key="$route.path" />
    <Footer></Footer>
  </n-message-provider>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { NMessageProvider } from 'naive-ui';

export default defineComponent({
  components: {
    Header,
    Footer,
    NMessageProvider,
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
