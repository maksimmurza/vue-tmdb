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
            <n-date-picker v-model:value="releaseDateGte" type="date" />
            <n-date-picker v-model:value="releaseDateLte" type="date" />
            <n-divider></n-divider>
            <div>Genres</div>
            <n-checkbox-group v-if="genres" v-model:value="genresInput">
              <n-checkbox
                v-for="genre in genres"
                :genre="genre"
                :key="genre.id"
                :value="genre.id"
                :label="genre.name"
                class="genre"
              />
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
          <movie-card
            v-for="movie in movies.results"
            :key="movie.id"
            :movie="movie"
            :type="typeRef"
          ></movie-card>
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
import { useRoute } from 'vue-router';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NSelect,
  NCheckbox,
  NSpace,
  NDatePicker,
  NPagination,
} from 'naive-ui';
import { sortingOptions } from '../constants';
import useGenres from '../composables/useGenres';
import useMovies from '../composables/useMovies';
import { Movie, TVShow } from '@/types/movie';
import { MoviesFetchingService } from '@/types/fetching';
import toCamelCase from '../utils/toCamelCase';

export default defineComponent({
  name: 'MoviesPage',
  setup(props) {
    const page = ref(1);
    const route = useRoute();
    const type = route.params.type as 'movie' | 'tv';
    const pathKey = route.params.key as string;
    const typeRef = ref(type);
    const key = toCamelCase(pathKey) as keyof MoviesFetchingService<Movie | TVShow>;

    const { loading: moviesLoading, movies, error: moviesError, getMovies } = useMovies(type, key);

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
      genresLoading,
      moviesLoading,
      genresError,
      moviesError,
      page,
      movies,
      genres,
      typeRef,

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
    NDatePicker,
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
  width: 200px;
  min-width: 250px;
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
  margin-bottom: 2rem;
}

.genre {
  margin: 0 10px 10px 0;
}
</style>
