<template lang="">
  <n-alert></n-alert>
</template>
<script>
import { defineComponent, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { NAlert } from 'naive-ui';
import { confirmLogin } from '../api/auth';
// import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'loginConfirmationPage',
  components: {
    NAlert,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch('approveLogin');
    });

    return {};
  },
});
</script>

<style lang="scss">
.login-form {
  padding: 0 10vw;
  margin-top: 2rem;
}
</style>
