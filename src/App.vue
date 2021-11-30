<template>
  <n-layout>
    <n-layout-header>
      <Header></Header>
    </n-layout-header>
    <n-layout-content>
      <router-view />
    </n-layout-content>
    <n-layout-footer>
      <Footer></Footer>
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { defineComponent } from 'vue';
import { NLayout } from 'naive-ui';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  components: {
    NLayout,
    Header,
    Footer,
  },
});
</script>

<style lang="scss"></style>
