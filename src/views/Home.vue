<template>
  <div class="content">
    <search class="search" />
    <h1>What's popular</h1>
    <n-scrollbar x-scrollable>
      <div class="movies-container">
        <movie-card v-for="movie in popularMovies" :key="movie.id" :movie="movie"></movie-card>
      </div>
    </n-scrollbar>
    <n-divider />
    <h1>Top rated movies</h1>
    <n-scrollbar x-scrollable>
      <div class="movies-container">
        <movie-card v-for="movie in topRatedMovies" :key="movie.id" :movie="movie"></movie-card>
      </div>
    </n-scrollbar>
    <h3 v-if="error">
      {{ error }}
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { NScrollbar, NDivider } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';
import Search from '../components/Search.vue';
import useMovies from '../composables/useMovies';

export default defineComponent({
  name: 'Home',
  setup() {
    const {
      loading: topRatedLoading,
      movies: topRatedMovies,
      error: topRatedError,
      getMovies: getTopRatedMovies,
    } = useMovies('topRated');
    const {
      loading: popularLoading,
      movies: popularMovies,
      error: popularError,
      getMovies: getPopularMovies,
    } = useMovies('popular');

    onMounted(() => {
      getPopularMovies();
      getTopRatedMovies();
    });

    return {
      topRatedLoading,
      topRatedMovies,
      topRatedError,
      getTopRatedMovies,
      popularLoading,
      popularMovies,
      popularError,
      getPopularMovies,
    };
  },
  components: {
    MovieCard,
    Search,
    NDivider,
    NScrollbar,
  },
});
</script>

<style>
.content {
  padding: 0 10vw;
}

.movies-container {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  background-color: #e2e8dd;
}

.movies-container > * {
  min-width: 200px;
  margin-right: 1rem;
}

.search {
  margin-top: 2rem;
}
</style>
