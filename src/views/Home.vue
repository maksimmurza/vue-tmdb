<template>
  <div class="home-page-content">
    <search class="search" />
    <h1>What's popular</h1>
    <cards-list :loading="popularLoading" :error="popularError">
      <movie-card
        v-for="movie in popularMovies.results"
        :key="movie.id"
        :movie="movie"
        :type="'movie'"
      ></movie-card>
    </cards-list>
    <n-divider />
    <h1>Top rated movies</h1>
    <cards-list :loading="topRatedLoading" :error="topRatedError">
      <movie-card
        v-for="movie in topRatedMovies.results"
        :key="movie.id"
        :movie="movie"
        :type="'movie'"
      ></movie-card>
    </cards-list>
    <h3 v-if="error">
      {{ error }}
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { NDivider } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';
import Search from '../components/Search.vue';
import CardsList from '../components/CardsList.vue';
import useMotionPicturesList from '../composables/useMotionPicturesList';

export default defineComponent({
  name: 'Home',
  setup() {
    const {
      loading: topRatedLoading,
      motionPictures: topRatedMovies,
      error: topRatedError,
      getMotionPictures: getTopRatedMovies,
    } = useMotionPicturesList('movie', 'topRated');
    const {
      loading: popularLoading,
      motionPictures: popularMovies,
      error: popularError,
      getMotionPictures: getPopularMovies,
    } = useMotionPicturesList('movie', 'popular');

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
    CardsList,
    NDivider,
  },
});
</script>

<style>
.home-page-content {
  padding: 0 10vw;
}

.search {
  margin-top: 2rem;
}
</style>
