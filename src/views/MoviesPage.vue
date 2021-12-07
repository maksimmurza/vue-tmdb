<template>
  <div class="movies-page">
    <h1>{{ $route.name }}</h1>
    <div class="movies-page__content">
      <div class="movies-filters"></div>
      <div v-if="movies" class="movies-block">
        <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue';
import { NPagination } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';
import { useRouter, useRoute } from 'vue-router';
import useMovies from '../composables/useMovies';
import useTVShows from '../composables/useTVShows';
import { TVShowsFetchingService, MoviesFetchingService } from '../api/movies';

export default defineComponent({
  name: 'MoviesPage',
  setup(props) {
    let title;
    const { path } = useRoute();
    const type = path.slice(path.indexOf('/'));
    type SearchKey = keyof MoviesFetchingService | keyof TVShowsFetchingService;
    const searchKey = path
      .slice(path.lastIndexOf('/') + 1, path.length)
      .replace(/-./g, x => x[1].toUpperCase()) as SearchKey;

    const { loading, movies, error, getMovies } = (
      path.includes('movies') ? useMovies : useTVShows
    )(searchKey);

    onMounted(() => {
      getMovies();
    });

    return { ...toRefs(props), movies };
  },
  props: {
    title: String,
  },
  components: {
    MovieCard,
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

.movies-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > * {
    max-width: 200px;
    margin: 0 1rem 1rem 0;
  }
}
</style>
