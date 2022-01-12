<template>
  <n-popconfirm @positive-click="() => deleteMovieList(list.id)">
    <template #trigger>
      <n-button title="Delete list" quaternary circle type="error" size="small" @click.stop
        ><template #icon>
          <n-icon>
            <trash />
          </n-icon>
        </template>
      </n-button>
    </template>
    Are you sure?
  </n-popconfirm>
</template>

<script lang="ts">
import useListActions from '@/composables/useListActions';
import { defineComponent } from '@vue/runtime-core';
import { computed, PropType, reactive } from 'vue';
import { useStore } from 'vuex';
import { NIcon, NPopconfirm, NButton } from 'naive-ui';
import { Trash } from '@vicons/ionicons5';
import { MovieListDetails } from '@/types/fetching';

export default defineComponent({
  name: 'DeleteListButton',
  components: {
    Trash,
    NIcon,
    NPopconfirm,
    NButton,
  },
  props: {
    list: Object as PropType<MovieListDetails>,
  },
  emits: ['deleted'],
  setup(props, context) {
    const store = useStore();
    const user = computed(() => store.state.user);
    const listActions = reactive(useListActions());

    const deleteMovieList = (listId: number) => {
      listActions
        .deleteMovieList(user.value.userInfo.access_token, listId)
        .then(() => context.emit('deleted'));
    };

    return {
      deleteMovieList,
    };
  },
});
</script>

<style lang="scss"></style>
