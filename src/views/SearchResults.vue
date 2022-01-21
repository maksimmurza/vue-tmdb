<template>
  <div class="search-results">
    <loader v-if="searchLoading" />
    <div v-else-if="searchResults.results.length" class="search-results__movies">
      <movie-card
        v-for="movie in searchResults.results"
        :key="movie.id"
        :movie="movie"
        :type="movie.media_type"
      ></movie-card>
    </div>
    <n-result
      v-else
      status="404"
      title="Oops..."
      style="margin-top: 2rem"
      :description="`Search with query '${query}' didn't get any results`"
    ></n-result>
    <div class="search-results__pagination">
      <n-pagination
        v-if="searchResults.total_pages > 1"
        v-model:page="page"
        :page-count="searchResults.total_pages"
      ></n-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MovieCard from '../components/MovieCard.vue';
import Loader from '../components/Loader.vue';
import { NPagination, NResult } from 'naive-ui';
import useSearch from '@/composables/useSearch';

export default defineComponent({
  name: 'SearchResults',
  components: {
    MovieCard,
    Loader,
    NPagination,
    NResult,
  },
  setup() {
    let query = useRoute().query.query as string;
    const page = ref(1);

    const { searchLoading, searchResults, searchError, getMoviesByQuery } = useSearch();

    onMounted(() => {
      getMoviesByQuery(query);
    });

    watch(page, newPage => {
      getMoviesByQuery(query, newPage);
    });

    return {
      searchLoading,
      searchResults,
      searchError,
      query,
      page,
      getMoviesByQuery,
    };
  },
});
</script>

<style lang="scss">
.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &__pagination {
    margin-bottom: 2rem;
  }
}
</style>
