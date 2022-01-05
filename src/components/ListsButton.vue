<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button
        :disabled="!movieId"
        :loading="
          movieLists.movieListsLoading ||
          movieLists.addMovieToListLoading ||
          movieLists.removeMovieFromListLoading
        "
        strong
        size="large"
        circle
        type="info"
        @click="fetchMovieLists"
        ><n-icon><list-ul /></n-icon
      ></n-button>
    </template>
    <n-checkbox-group v-if="movieLists.movieListsResult" v-model:value="movieListsValue">
      <n-space vertical>
        <n-checkbox
          v-for="list in movieLists.movieListsResult.results"
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
import useMovieLists from '@/composables/useMovieLists';

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
    movieId: Number,
    type: String as PropType<VideoType>,
  },
  setup(props) {
    const store = useStore();
    const { userInfo } = store.state.user;
    const { movieId, type } = toRefs(props);
    const movieLists = reactive(useMovieLists());
    let movieListsValue = ref<Array<number>>([]);

    const fetchMovieLists = () => {
      movieListsValue.value = [];
      movieLists.getMovieLists(userInfo.id, userInfo.session_id).then(checkMoviePersistence);
    };

    const checkMoviePersistence = () => {
      if (movieLists.movieListsResult && movieLists.movieListsResult.results.length > 0) {
        movieLists.movieListsResult.results.forEach(async list => {
          if (movieId.value && type.value) {
            const inList = await movieLists.isMoviePersistInList(
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
        movieLists.addMovieToList(movieId.value, type.value, listId, userInfo.access_token);
      } else if (movieId.value && type.value) {
        movieLists.deleteMovieFromList(movieId.value, type.value, listId, userInfo.access_token);
      }
    };

    return {
      movieLists,
      movieListsValue,
      fetchMovieLists,
      updateMovieListsValues,
    };
  },
});
</script>

<style lang="scss"></style>
