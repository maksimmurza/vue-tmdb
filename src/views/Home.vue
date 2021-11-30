<template>
  <div class="content">
    <h1>What's popular</h1>
    <n-scrollbar x-scrollable>
      <div class="movies-container">
        <movie-card v-for="movie in popularMovies" :key="movie.id" :movie="movie"></movie-card>
        <div class="container-shadow"></div>
      </div>
    </n-scrollbar>

    <n-divider />

    <h1>Top rated movies</h1>
    <n-scrollbar x-scrollable>
      <div class="movies-container">
        <movie-card v-for="movie in upcomingMovies" :key="movie.id" :movie="movie"></movie-card>
      </div>
    </n-scrollbar>

    <h3 v-if="error">
      {{ error }}
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import {
  Movie,
  PopularMoviesResponse,
  TopRatedMoviesResponse,
  UpcomingMoviesResponse,
} from '../types';
import { fetchPopularMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../api/movies';
import { AxiosResponse } from 'axios';
import { NScrollbar, NDivider } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';

export default defineComponent({
  setup() {
    let state = reactive<{
      popularMovies: Array<Movie>;
      upcomingMovies: Array<Movie>;
      error: any;
    }>({
      popularMovies: [],
      upcomingMovies: [],
      error: null,
    });

    const getPopularMovies = async (): Promise<void> => {
      try {
        const response: AxiosResponse<PopularMoviesResponse> = await fetchPopularMovies();
        state.popularMovies = response.data.results;
      } catch (error) {
        state.error = error;
      }
    };

    const getTopRatedMovies = async (): Promise<void> => {
      try {
        const response: AxiosResponse<TopRatedMoviesResponse> = await fetchTopRatedMovies();
        state.upcomingMovies = response.data.results;
      } catch (error) {
        state.error = error;
      }
    };

    onMounted(() => {
      getPopularMovies();
      getTopRatedMovies();
    });

    return {
      ...toRefs(state),
      getPopularMovies,
      getTopRatedMovies,
    };
  },
  components: {
    MovieCard,
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
  /* overflow: auto; */
  background-color: #e2e8dd;
}

.movies-container > * {
  min-width: 200px;
  margin-right: 1rem;
}
</style>
