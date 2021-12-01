<template>
  <div>
    <n-input-group>
      <n-input size="large" round placeholder="Search movie" />
      <n-button round size="large" type="info">Search</n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui';
export default defineComponent({
  name: 'Search',
  components: {
    NInput,
    NButton,
    NInputGroup,
  },
});
</script>

<style lang="scss"></style>
