<template lang="">
  <loader v-if="user.loading"></loader>
  <n-alert
    v-else-if="user.userInfo && !user.errorMessage"
    type="success"
    title="You successfuly logged in"
    class="alert"
  ></n-alert>
  <n-alert v-else type="warning" title="Some error while logging in" class="alert">{{
    user.errorMessage
  }}</n-alert>
</template>
<script>
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { NAlert } from 'naive-ui';
import Loader from '../components/Loader.vue';

export default defineComponent({
  name: 'loginConfirmationPage',
  components: {
    NAlert,
    Loader,
  },
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    onMounted(() => {
      store.dispatch('approveLogin');
    });

    return {
      user,
    };
  },
});
</script>

<style lang="scss">
.login-form {
  padding: 0 10vw;
  margin-top: 2rem;
}

.alert {
  margin: 1rem 10vw;
}
</style>
