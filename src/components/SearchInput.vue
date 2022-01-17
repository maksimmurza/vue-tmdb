<template>
  <div>
    <n-input-group>
      <n-input
        size="large"
        round
        v-model:value="query"
        @keyup.enter="search"
        placeholder="Search movie"
      />
      <n-button round size="large" type="info" @click="search">Search</n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NInput, NButton, NInputGroup } from 'naive-ui';
export default defineComponent({
  name: 'SearchInput',
  components: {
    NInput,
    NButton,
    NInputGroup,
  },
  emits: ['clicked'],
  setup(props, { emit }) {
    const query = ref('');

    const search = () => {
      emit('clicked', query.value);
    };

    return {
      query,
      search,
    };
  },
});
</script>

<style lang="scss"></style>
