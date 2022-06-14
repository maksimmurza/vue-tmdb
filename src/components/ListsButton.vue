<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button
        :disabled="!listsInfo || !listMovie"
        :loading="
          listsInfo.movieListsLoading ||
          listMovie.addMovieToListLoading ||
          listMovie.removeMovieFromListLoading
        "
        strong
        size="large"
        circle
        type="info"
        @click="fetchMovieLists"
      >
        <template #icon>
          <n-icon><list-ul /></n-icon>
        </template>
      </n-button>
    </template>
    <n-checkbox-group v-if="listsInfo.movieListsResult" v-model:value="movieListsValue">
      <n-space vertical>
        <n-checkbox
          v-for="list in listsInfo.movieListsResult.results"
          :list="list"
          :key="list.id"
          :value="list.id"
          :label="list.name"
          @click="() => updateMovieListsValues(list.id, movieListsValue.includes(list.id))"
        />
      </n-space>
    </n-checkbox-group>
  </n-popover>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
import { NPopover, NButton, NIcon, NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui';
import { ListUl } from '@vicons/fa';
import { VideoType } from '@/types/movie';
import useListsInfo from '@/composables/useListsInfo';
import useListMovie from '@/composables/useListMovie';

export default defineComponent({
  name: 'ListsButton',
  components: {
    NPopover,
    NButton,
    NIcon,
    NCheckbox,
    NCheckboxGroup,
    NSpace,
    ListUl,
  },
  props: {
    movieId: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<VideoType>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { userInfo } = store.state.user;
    const { movieId, type } = toRefs(props);
    const listsInfo = reactive(useListsInfo());
    const listMovie = reactive(useListMovie());
    let movieListsValue = ref<Array<number>>([]);

    const fetchMovieLists = () => {
      movieListsValue.value = [];
      listsInfo.getMovieLists(userInfo.id, userInfo.session_id).then(checkMoviePersistence);
    };

    const checkMoviePersistence = () => {
      if (listsInfo.movieListsResult && listsInfo.movieListsResult.results.length > 0) {
        listsInfo.movieListsResult.results.forEach(async list => {
          if (movieId.value && type.value) {
            const inList = await listMovie.isMoviePresentInList(
              movieId.value,
              type.value,
              list.id,
              userInfo.access_token
            );

            if (inList) {
              movieListsValue.value.push(list.id);
            }
          }
        });
      }
    };

    const updateMovieListsValues = (listId: number, checked: boolean): void => {
      if (movieId.value && type.value && checked) {
        listMovie.addMovieToList(movieId.value, type.value, listId, userInfo.access_token);
      } else if (movieId.value && type.value) {
        listMovie.deleteMovieFromList(movieId.value, type.value, listId, userInfo.access_token);
      }
    };

    return {
      listsInfo,
      listMovie,
      movieListsValue,
      fetchMovieLists,
      updateMovieListsValues,
    };
  },
});
</script>

<style lang="scss"></style>
