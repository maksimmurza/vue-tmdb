<template>
  <div class="home-page-content">
    <search @clicked="searchMovies" class="search" />
    <div v-if="showSearchResults" class="search-results">
      <loader v-if="searchLoading" />
      <div class="search-results__movies">
        <movie-card
          v-for="movie in searchResults.results"
          :key="movie.id"
          :movie="movie"
          :type="'movie'"
        ></movie-card>
      </div>
      <div class="search-results__pagination">
        <n-pagination
          v-if="searchResults.total_pages > 1"
          v-model:page="page"
          :page-count="searchResults.total_pages"
        ></n-pagination>
      </div>
    </div>
    <div v-else>
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import { NDivider, NPagination } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';
import Search from '../components/Search.vue';
import CardsList from '../components/CardsList.vue';
import useMovies from '../composables/useMovies';
import useSearch from '@/composables/useSearch';
import Loader from '../components/Loader.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MovieCard,
    Search,
    CardsList,
    NDivider,
    Loader,
    NPagination,
  },
  setup() {
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
    const { searchLoading, searchResults, searchError, getMoviesByQuery } = useSearch();

    const query = ref('');
    const page = ref(1);
    const showSearchResults = ref(false);

    const searchMovies = (queryStr: string) => {
      showSearchResults.value = true;
      query.value = queryStr;
      getMoviesByQuery(queryStr);
    };

    watch(page, newPage => {
      getMoviesByQuery(query.value, newPage);
    });

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
      searchLoading,
      searchResults,
      searchError,
      showSearchResults,
      page,
      searchMovies,
      getTopRatedMovies,
      getMoviesByQuery,
      getPopularMovies,
    };
  },
});
</script>

<style lang="scss">
.home-page-content {
  padding: 0 10vw;
}

.search {
  margin-top: 2rem;
}

.search-results {
  &__movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1rem 0;

    & > * {
      max-width: 200px;
      margin-bottom: 1rem;
    }
  }
}
</style>
