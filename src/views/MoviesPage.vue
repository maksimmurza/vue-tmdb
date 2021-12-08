<template>
  <div class="movies-page">
    <h1>{{ $route.name }}</h1>
    <div class="movies-page__content">
      <div class="movies-query">
        <n-collapse>
          <n-collapse-item title="Sort">
            <div>Sort results By</div>
            <n-select v-model:value="sortingValue" :options="sortingOptions" />
          </n-collapse-item>
          <n-collapse-item title="Filters">
            <div>Release Dates</div>
            <n-divider></n-divider>
            <div>Genres</div>
            <n-checkbox-group v-if="genres" v-model:value="genresInput">
              <n-space vertical>
                <n-checkbox
                  v-for="genre in genres"
                  :genre="genre"
                  :key="genre.id"
                  :value="genre.id"
                  :label="genre.name"
                />
              </n-space>
            </n-checkbox-group>
            <n-divider></n-divider>
          </n-collapse-item>
        </n-collapse>
        <n-button
          @click="discoverMovies"
          strong
          round
          type="info"
          size="large"
          block
          :style="{
            marginTop: '1rem',
          }"
          >Search</n-button
        >
      </div>
      <n-space vertical justify="center">
        <div v-if="movies" class="movies-block">
          <movie-card v-for="movie in movies.results" :key="movie.id" :movie="movie"></movie-card>
        </div>
        <n-pagination
          v-model:page="page"
          :page-count="movies.total_pages"
          class="pagination"
        ></n-pagination>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, ref, watch } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { useRouter, useRoute } from 'vue-router';
import useMovies from '../composables/useMovies';
import useTVShows from '../composables/useTVShows';
import { TVShowsFetchingService, MoviesFetchingService } from '../api/movies';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NSelect,
  NCheckbox,
  NSpace,
  NDatePicker,
  NRadio,
  NRadioGroup,
  NPagination,
} from 'naive-ui';
import { sortingOptions } from '../constants';
import useGenres from '../composables/useGenres';

export default defineComponent({
  name: 'MoviesPage',
  setup(props) {
    const page = ref(1);
    const { path } = useRoute();
    const type = path.slice(0, path.indexOf('/'));
    const searchKey = path
      .slice(path.lastIndexOf('/') + 1, path.length)
      .replace(/-./g, x => x[1].toUpperCase()) as any;

    const { loading, movies, error, getMovies } = (
      path.includes('movies') ? useMovies : useTVShows
    )(searchKey);

    const {
      loading: genresLoading,
      genres,
      error: genresError,
      getGenres,
    } = useGenres(type as 'movie' | 'tv');

    watch(page, newPage => {
      getMovies(newPage);
    });

    onMounted(() => {
      getMovies();
      getGenres();
    });

    return {
      ...toRefs(props),
      page,
      movies,
      genres,
      sortingOptions,
      genresInput: ref(null),
    };
  },
  props: {
    title: String,
  },
  components: {
    MovieCard,
    NButton,
    NCollapse,
    NCollapseItem,
    NCheckbox,
    NSpace,
    NDivider,
    NSelect,
    NPagination,
    // NDatePicker,
  },
});
</script>

<style lang="scss">
.movies-page {
  padding: 0 10vw;

  &__content {
    display: flex;
    position: relative;
  }
}

.movies-query {
  min-width: 300px;
  margin-right: 2rem;
}

.movies-block {
  flex-grow: 3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    max-width: 200px;
    margin: 0 1rem 1rem 0;
  }
}

.pagination {
  justify-content: center;
}
</style>
