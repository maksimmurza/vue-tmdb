<template>
  <n-button
    title="Clear list"
    quaternary
    circle
    type="tertiary"
    size="small"
    @click.stop="() => clearMovieList(list.id)"
    ><template #icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z" fill="currentColor"></path></svg
    ></template>
  </n-button>
</template>

<script lang="ts">
import useListActions from '@/composables/useListActions';
import { defineComponent } from '@vue/runtime-core';
import { computed, PropType, reactive } from 'vue';
import { useStore } from 'vuex';
import { NButton } from 'naive-ui';
import { MovieListDetails } from '@/types/fetching';

export default defineComponent({
  name: 'ClearListButton',
  components: {
    NButton,
  },
  props: {
    list: Object as PropType<MovieListDetails>,
  },
  emits: ['cleared'],
  setup(props, context) {
    const store = useStore();
    const user = computed(() => store.state.user);
    const listActions = reactive(useListActions());

    const clearMovieList = (listId: number) => {
      listActions
        .clearMovieList(user.value.userInfo.access_token, listId)
        .then(() => context.emit('cleared'));
    };

    return {
      clearMovieList,
    };
  },
});
</script>

<style lang="scss"></style>
