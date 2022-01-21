<template>
  <div class="home-page-content">
    <search-input @clicked="searchMovies" class="search-input" />
    <router-view :key="$route.fullPath"></router-view>
    <div v-if="!$route.path.includes('search')">
      <h1>What's popular</h1>
      <cards-list :loading="popularLoading" :error="popularError" background="#e2e8dd">
        <movie-card
          v-for="movie in popularMovies.results"
          :key="movie.id"
          :movie="movie"
          :type="'movie'"
          :minWidth="200"
        ></movie-card>
      </cards-list>
      <n-divider />
      <h1>Top rated movies</h1>
      <cards-list :loading="topRatedLoading" :error="topRatedError" background="#e2e8dd">
        <movie-card
          v-for="movie in topRatedMovies.results"
          :key="movie.id"
          :movie="movie"
          :type="'movie'"
          :minWidth="200"
        ></movie-card>
      </cards-list>
      <h3 v-if="error">
        {{ error }}
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { NDivider } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';
import SearchInput from '../components/SearchInput.vue';
import CardsList from '../components/CardsList.vue';
import useMovies from '../composables/useMovies';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    MovieCard,
    SearchInput,
    CardsList,
    NDivider,
  },
  setup() {
    const router = useRouter();
    const {
      moviesLoading: topRatedLoading,
      movies: topRatedMovies,
      moviesError: topRatedError,
      getMovies: getTopRatedMovies,
    } = useMovies('movie', 'top-rated');
    const {
      moviesLoading: popularLoading,
      movies: popularMovies,
      moviesError: popularError,
      getMovies: getPopularMovies,
    } = useMovies('movie', 'popular');

    const searchMovies = (query: string): void => {
      router.push(`/search?query=${query}`);
    };

    onMounted(() => {
      getPopularMovies();
      getTopRatedMovies();
    });

    return {
      topRatedLoading,
      topRatedMovies,
      topRatedError,
      popularLoading,
      popularMovies,
      popularError,
      searchMovies,
      getTopRatedMovies,
      getPopularMovies,
    };
  },
});
</script>

<style lang="scss">
.home-page-content {
  padding: 0 10vw;
}

.search-input {
  margin-top: 2rem;
}
</style>
