<template>
  <n-popconfirm @positive-click="() => deleteList(list.id)">
    <template #trigger>
      <n-button
        title="Delete list"
        quaternary
        circle
        type="error"
        size="small"
        @click.stop
        :disabled="!user.userInfo"
        :loading="deleteMovieListAction.loading"
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
import { computed, PropType } from 'vue';
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
    list: {
      type: Object as PropType<MovieListDetails>,
      required: true,
    },
  },
  emits: ['deleted'],
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.state.user);
    const { deleteMovieListAction, deleteMovieList } = useListActions();

    const deleteList = (listId: number) => {
      deleteMovieList(user.value.userInfo.access_token, listId).then(() => emit('deleted'));
    };

    return {
      user,
      deleteMovieListAction,
      deleteList,
    };
  },
});
</script>

<style lang="scss"></style>
