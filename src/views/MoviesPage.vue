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
        <n-collapse :default-expanded-names="['0']">
          <n-collapse-item title="Sort" name="0">
            <div>Sort results By</div>
            <n-select v-model:value="filters.sortValue" :options="filters.sortOptions" />
          </n-collapse-item>
          <n-collapse-item title="Filters" name="1">
            <div class="filter">
              <div>Release Dates</div>
              <n-date-picker v-model:value="filters.releaseDateGteValue" type="date" />
              <n-date-picker v-model:value="filters.releaseDateLteValue" type="date" />
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>Genres</div>
              <n-checkbox-group v-if="filters.genresOptions" v-model:value="filters.genresValue">
                <n-checkbox
                  v-for="genre in filters.genresOptions"
                  :genre="genre"
                  :key="genre.id"
                  :value="genre.id"
                  :label="genre.name"
                  class="genre"
                />
              </n-checkbox-group>
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>User Score</div>
              <n-slider v-model:value="filters.scoreValue" range :marks="scoreMarks" />
            </div>
            <n-divider></n-divider>
            <div class="filter">
              <div>Minimum User Votes</div>
              <n-slider v-model:value="filters.votesValue" :max="5000" />
            </div>
            <n-divider></n-divider>
          </n-collapse-item>
        </n-collapse>
        <n-button
          @click="getMovies(page, filters)"
          strong
          round
          type="info"
          size="large"
          block
          :style="{
            marginTop: '1rem',
          }"
          >Search</n-button
        >
      </div>
      <n-drawer
        v-else
        v-model:show="sidebarActive"
        width="60vw"
        :style="{ minWidth: '300px', maxWidth: '450px' }"
        placement="left"
      >
        <n-drawer-content title="Filters">
          <n-collapse :default-expanded-names="['0']">
            <n-collapse-item title="Sort" name="0">
              <div>Sort results By</div>
              <n-select v-model:value="filters.sortValue" :options="filters.sortOptions" />
            </n-collapse-item>
            <n-collapse-item title="Filters" name="1">
              <div class="filter">
                <div>Release Dates</div>
                <n-date-picker v-model:value="filters.releaseDateGteValue" type="date" />
                <n-date-picker v-model:value="filters.releaseDateLteValue" type="date" />
              </div>
              <n-divider></n-divider>
              <div class="filter">
                <div>Genres</div>
                <n-checkbox-group v-if="filters.genresOptions" v-model:value="filters.genresValue">
                  <n-checkbox
                    v-for="genre in filters.genresOptions"
                    :genre="genre"
                    :key="genre.id"
                    :value="genre.id"
                    :label="genre.name"
                    class="genre"
                  />
                </n-checkbox-group>
              </div>
              <n-divider></n-divider>
              <div class="filter">
                <div>User Score</div>
                <n-slider v-model:value="filters.scoreValue" range :marks="scoreMarks" />
              </div>
              <n-divider></n-divider>
              <div class="filter">
                <div>Minimum User Votes</div>
                <n-slider v-model:value="filters.votesValue" max="5000" />
              </div>
              <n-divider></n-divider>
            </n-collapse-item>
          </n-collapse>
          <n-button
            @click="getMovies(page, filters)"
            strong
            round
            type="info"
            size="large"
            block
            :style="{
              marginTop: '1rem',
            }"
            >Search</n-button
          >
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
        ></n-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { useRoute } from 'vue-router';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NSelect,
  NCheckbox,
  NDatePicker,
  NPagination,
  NSlider,
  NCheckboxGroup,
  NDrawer,
  NIcon,
  NResult,
  NDrawerContent,
} from 'naive-ui';
import useMovies from '../composables/useMovies';
import useFilters from '../composables/useFilters';
import { Movie, MovieType, TVShow, VideoType } from '@/types/movie';
import { MoviesFetchingService } from '@/types/fetching';
import { scoreMarks } from '@/constants';
import Loader from '../components/Loader.vue';
import toRegularCase from '../utils/toRegularCase';
import CardsList from '../components/CardsList.vue';
import { Filter } from '@vicons/fa';

export default defineComponent({
  name: 'MoviesPage',
  components: {
    MovieCard,
    NButton,
    NCollapse,
    NCollapseItem,
    NCheckbox,
    NCheckboxGroup,
    NDivider,
    NSelect,
    NPagination,
    NDatePicker,
    NSlider,
    Loader,
    CardsList,
    NIcon,
    NDrawer,
    NDrawerContent,
    FilterIcon: Filter,
    NResult,
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
    const width = inject('width');

    const moviesPageHeader = computed(() => {
      return toRegularCase(key) + ` ${key !== 'on-tv' ? type : ''}${type === 'movie' ? 's' : ''}`;
    });

    const moviesData = useMovies<typeof type extends MovieType ? Movie : TVShow>(type, key);
    const { moviesLoading, movies, moviesError, getMovies } = moviesData;
    const sidebarActive = ref(false);

    const { filters, getFilters } = useFilters(type, key);

    watch(page, newPage => {
      getMovies(newPage, filters);
    });

    onMounted(() => {
      getMovies();
      getFilters();
    });

    return {
      moviesLoading,
      movies,
      moviesError,
      filters,
      page,
      typeRef,
      scoreMarks,
      moviesPageHeader,
      width,
      sidebarActive,
      getMovies,
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
  margin-right: 2rem;
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

.filter {
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
}
</style>
