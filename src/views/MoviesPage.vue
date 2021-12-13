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
            <div class="filter">
              <div>Release Dates</div>
              <n-date-picker v-model:value="releaseDateGte" type="date" />
              <n-date-picker v-model:value="releaseDateLte" type="date" />
            </div>
            <n-divider></n-divider>
            <div class="filter">
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
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>User Score</div>
              <n-slider
                v-model:value="scoreValue"
                range
                :marks="{
                  0: '0',
                  10: '1',
                  20: '2',
                  30: '3',
                  40: '4',
                  50: '5',
                  60: '6',
                  70: '7',
                  80: '8',
                  90: '9',
                  100: ' 10',
                }"
              />
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>Minimum User Votes</div>
              <n-slider v-model:value="votesValue" max="500" />
            </div>
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
  NSlider,
  NCheckboxGroup,
} from 'naive-ui';
import { sortingOptions } from '../constants';
import useGenres from '../composables/useGenres';
import useMovies from '../composables/useMovies';
import useAirDates from '../composables/useAirDates';
import { Movie, MovieType, TVShow, VideoType } from '@/types/movie';
import { MoviesFetchingService } from '@/types/fetching';
import toCamelCase from '../utils/toCamelCase';

export default defineComponent({
  name: 'MoviesPage',
  setup(props) {
    const page = ref(1);
    const route = useRoute();
    const type = route.params.type as VideoType;
    const pathKey = route.params.key as string;
    const typeRef = ref(type);
    const key = toCamelCase(pathKey) as keyof MoviesFetchingService<Movie | TVShow>;

    const {
      loading: moviesLoading,
      movies,
      error: moviesError,
      getMovies,
    } = useMovies<typeof type extends MovieType ? Movie : TVShow>(type, key);

    const { begin: releaseDateGte, end: releaseDateLte } = useAirDates<
      typeof type extends MovieType ? Movie : TVShow
    >(movies, type, key);

    const {
      loading: genresLoading,
      genres,
      error: genresError,
      getGenres,
    } = useGenres(type as VideoType);

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
      releaseDateGte,
      releaseDateLte,
      sortingValue: ref(pathKey === 'top-rated' ? 'vote_average.desc' : 'popularity.desc'),
      genresInput: ref(null),
      scoreValue: ref([0, 100]),
      votesValue: ref(0),
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
    NCheckboxGroup,
    NSpace,
    NDivider,
    NSelect,
    NPagination,
    NDatePicker,
    NSlider,
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

.filter {
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
}
</style>
