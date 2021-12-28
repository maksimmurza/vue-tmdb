<template>
  <div class="movies-page">
    <h1>{{ $route.name }}</h1>
    <div class="movies-page__content">
      <div class="movies-query">
        <n-collapse :default-expanded-names="['0']">
          <n-collapse-item title="Sort" name="0">
            <div>Sort results By</div>
            <n-select v-model:value="filters.sortValue" :options="filters.sortOptions" />
          </n-collapse-item>
          <n-collapse-item title="Filters" name="1">
            <div class="filter">
              <div>Release Dates</div>
              <n-date-picker v-model:value="filters.releaseDateGteValue" type="date" />
              <n-date-picker v-model:value="filters.releaseDateLteValue" type="date" />
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>Genres</div>
              <n-checkbox-group v-if="filters.genresOptions" v-model:value="filters.genresValue">
                <n-checkbox
                  v-for="genre in filters.genresOptions"
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
              <n-slider v-model:value="filters.scoreValue" range :marks="scoreMarks" />
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>Minimum User Votes</div>
              <n-slider v-model:value="filters.votesValue" max="500" />
            </div>
            <n-divider></n-divider>
          </n-collapse-item>
        </n-collapse>
        <n-button
          @click="getMovies(page, filters)"
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
import { defineComponent, onMounted, ref, watch } from 'vue';
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
import useMovies from '../composables/useMovies';
import useFilters from '../composables/useFilters';
import { Movie, MovieType, TVShow, VideoType } from '@/types/movie';
import { MoviesFetchingService } from '@/types/fetching';
import { scoreMarks } from '@/constants';

export default defineComponent({
  name: 'MoviesPage',
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
  props: {
    title: String,
  },
  setup() {
    const page = ref(1);
    const route = useRoute();
    const type = route.params.type as VideoType;
    const typeRef = ref(type);
    const key = route.params.key as keyof Omit<MoviesFetchingService<Movie | TVShow>, 'discover'>;

    const moviesData = useMovies<typeof type extends MovieType ? Movie : TVShow>(type, key);
    const { moviesLoading, movies, moviesError, getMovies } = moviesData;

    const { filters, getFilters } = useFilters(type, key);

    watch(page, newPage => {
      getMovies(newPage, filters);
    });

    onMounted(() => {
      getMovies();
      getFilters();
    });

    return {
      moviesLoading,
      movies,
      moviesError,
      getMovies,
      filters,
      page,
      typeRef,
      scoreMarks,
    };
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
