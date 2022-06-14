<template>
  <loader v-if="user.loading"></loader>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Loader from '../components/Loader.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'loginConfirmationPage',
  components: {
    Loader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.state.user);

    onMounted(() => {
      store.dispatch('approveLogin').then(() => {
        const redirect_to = window.localStorage.getItem('redirect_to');
        router.replace(redirect_to as string);
        window.localStorage.removeItem('redirect_to');
      });
    });

    return {
      user,
    };
  },
});
</script>

<style lang="scss"></style>
