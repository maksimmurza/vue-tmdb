<template>
  <div class="search-results" style="margin-top: 2rem">
    <loader v-if="searchLoading" />
    <cards-list>
      <movie-card
        v-for="movie in searchResults.results"
        :key="movie.id"
        :movie="movie"
        :type="movie.media_type"
      ></movie-card>
    </cards-list>
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
import { NPagination } from 'naive-ui';
import useSearch from '@/composables/useSearch';
import CardsList from '@/components/CardsList.vue';

export default defineComponent({
  name: 'SearchResults',
  components: {
    MovieCard,
    Loader,
    NPagination,
    CardsList,
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

  &__pagination {
    margin: 2rem 0;
  }
}
</style>
