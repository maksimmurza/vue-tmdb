<template>
  <n-input-group>
    <n-input
      :autofocus="$route.name === 'Search Results'"
      size="large"
      round
      v-model:value="query"
      @keyup.enter="search"
      placeholder="Search movie"
    />
    <n-button round size="large" type="info" @click="search">Search</n-button>
  </n-input-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NInput, NButton, NInputGroup, useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'SearchInput',
  components: {
    NInput,
    NButton,
    NInputGroup,
  },
  emits: ['clicked'],
  setup(props, { emit }) {
    const route = useRoute();
    const message = useMessage();
    const query = ref(route.query.query);

    const search = () => {
      if (!query.value) {
        message.warning('Search input require text');
      } else {
        emit('clicked', query.value);
      }
    };

    return {
      query,
      search,
    };
  },
});
</script>

<style lang="scss"></style>
