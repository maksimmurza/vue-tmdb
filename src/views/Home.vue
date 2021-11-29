<template>
  <Header></Header>
  <span v-if="popularMovies.length > 0">
    The first popular movie from {{ popularMovies.length }} is {{ popularMovies[0].title }}
  </span>
  <span v-if="upcomingMovies.length > 0">
    The first upcoming movie from {{ upcomingMovies.length }} is {{ upcomingMovies[0].title }}
  </span>
  <span v-if="error">
    {{ error }}
  </span>
  <Footer></Footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { Movie, PopularMoviesResponse, UpcomingMoviesResponse } from '../types';
import { fetchPopularMovies, fetchUpcomingMovies } from '../api/movies';
import { AxiosResponse } from 'axios';

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

    const getUpcomingMovies = async (): Promise<void> => {
      try {
        const response: AxiosResponse<UpcomingMoviesResponse> = await fetchUpcomingMovies();
        state.upcomingMovies = response.data.results;
      } catch (error) {
        state.error = error;
      }
    };

    onMounted(() => {
      getPopularMovies();
      getUpcomingMovies();
    });

    return {
      ...toRefs(state),
      getPopularMovies,
      getUpcomingMovies,
    };
  },
  components: {
    Header,
    Footer,
  },
});
</script>
