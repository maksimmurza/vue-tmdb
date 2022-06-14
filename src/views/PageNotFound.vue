<template>
  <div class="not-found">
    <n-result status="404" title="Page not found"> </n-result>
    <router-link to="/">Go to the Main Page</router-link>
  </div>
</template>

<script lang="ts">
import { NResult } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNotFound',
  components: {
    NResult,
  },
});
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
</style>
