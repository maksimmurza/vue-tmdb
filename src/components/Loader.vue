<template>
  <div class="loader">
    <n-spin size="large"></n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NSpin } from 'naive-ui';

export default defineComponent({
  name: 'Loader',
  components: { NSpin },
});
</script>

<style lang="scss">
.loader {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
