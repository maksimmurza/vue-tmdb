<template>
  <div class="movies-page">
    <h1>
      {{ moviesPageHeader }}
      <n-button v-if="width <= 690" quaternary circle @click="sidebarActive = !sidebarActive">
        <n-icon><filter-icon></filter-icon></n-icon>
      </n-button>
    </h1>
    <div class="movies-page__content">
      <div v-if="width > 690" class="movies-query">
        <form-movie-filters v-model:filters="filters" @search="search"></form-movie-filters>
      </div>
      <n-drawer
        v-else
        v-model:show="sidebarActive"
        width="60vw"
        :style="{ minWidth: '300px', maxWidth: '450px' }"
        placement="left"
      >
        <n-drawer-content title="Filters">
          <form-movie-filters v-model:filters="filters" @search="search"></form-movie-filters>
        </n-drawer-content>
      </n-drawer>
      <div class="movies-block">
        <loader v-if="moviesLoading" style="flex-grow: 1" />
        <cards-list v-else-if="movies.results.length > 0">
          <movie-card
            v-for="movie in movies.results"
            :key="movie.id"
            :movie="movie"
            :type="typeRef"
          ></movie-card>
        </cards-list>
        <n-result
          status="warning"
          title="No results"
          v-else-if="movies.results.length === 0"
          type="warning"
        />
        <n-pagination
          v-if="movies.total_pages > 1"
          v-model:page="page"
          :page-count="movies.total_pages"
          class="pagination"
          :page-slot="6"
        ></n-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref, watch } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { useRoute } from 'vue-router';
import { NButton, NPagination, NDrawer, NIcon, NResult, NDrawerContent } from 'naive-ui';
import useMovies from '../composables/useMovies';
import { Movie, MovieType, TVShow, VideoType } from '@/types/movie';
import { MoviesFetchingService } from '@/types/fetching';
import useUrlQueries from '../composables/useUrlQueries';
import Loader from '../components/Loader.vue';
import toRegularCase from '../utils/toRegularCase';
import CardsList from '../components/CardsList.vue';
import { Filter } from '@vicons/fa';
import FormMovieFilters from '../components/FormMovieFilters.vue';
import useFilters from '@/composables/useFilters';

export default defineComponent({
  name: 'MoviesPage',
  components: {
    MovieCard,
    NButton,
    NPagination,
    Loader,
    CardsList,
    NIcon,
    NDrawer,
    NDrawerContent,
    FilterIcon: Filter,
    NResult,
    FormMovieFilters,
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
    const width = inject('width') as Ref<number>;

    const moviesPageHeader = computed(() => {
      return toRegularCase(key) + ` ${key !== 'on-tv' ? type : ''}${type === 'movie' ? 's' : ''}`;
    });

    const moviesData = useMovies<typeof type extends MovieType ? Movie : TVShow>(type, key);
    const { moviesLoading, movies, moviesError, getMovies } = moviesData;
    const sidebarActive = ref(false);

    const { filters, getFilters } = useFilters(type, key);
    const { getFiltersFromUrl, getPageFromUrl } = useUrlQueries(filters, page);

    const search = () => {
      page.value = 1;
      getMovies(page.value, filters.value);
    };

    watch(page, newPage => {
      getMovies(newPage, filters.value);
    });

    watch(width, newWidth => {
      if (newWidth > 690) {
        sidebarActive.value = false;
      }
    });

    onMounted(() => {
      getFilters();
      getFiltersFromUrl();
      getPageFromUrl();
      getMovies(page.value, filters.value);
    });

    return {
      key,
      page,
      width,
      type,
      typeRef,
      filters,
      movies,
      moviesError,
      moviesLoading,
      sidebarActive,
      moviesPageHeader,
      search,
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

    @media (max-width: 690px) {
      flex-direction: column;
      align-items: center;

      & > * {
        margin-bottom: 1rem;
        width: 100%;
        & > * {
          justify-content: center;
        }
      }
    }
  }
}

.movies-query {
  width: 200px;
  min-width: 250px;
  margin: 0 2rem 2rem 0;
}

.movies-block {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.movies-results {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;

  & > * {
    min-width: 180px;
    max-width: 300px;
  }
}

.pagination {
  justify-content: center;
  margin: 2rem 0;
}

.genre {
  margin: 0 10px 10px 0;
}
</style>
