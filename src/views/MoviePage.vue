<template>
  <div v-if="movie" class="movie-page-header">
    <div class="movie-page-header__foreground">
      <div>
        <img :src="movieCoverSrc" />
      </div>
      <div class="movie-description">
        <div>
          <h1 class="movie-description__title">{{ movie && movie.title }}</h1>
          <span class="movie-description__release-year"
            >({{ movie && movie.release_date.slice(0, 4) }})</span
          >
        </div>
        <div v-if="movie">
          <n-button
            round
            type="tertiary"
            class="movie-description__genre-button"
            size="tiny"
            v-for="genre in movie.genres"
            :key="genre.id"
            >{{ genre.name }}
          </n-button>
        </div>
        <div class="rating-block">
          <div v-if="movie.vote_count > 0" class="rating-block__infographic">
            <n-progress
              type="circle"
              :indicator-text-color="'white'"
              :percentage="movie.vote_average * 10"
              :color="movie.vote_average < 5 ? 'red' : movie.vote_average < 8 ? 'orange' : 'green'"
            ></n-progress>
          </div>
          <div v-else>
            <n-empty description="No rating yet">
              <template #icon>
                <n-icon>
                  <star-regular />
                </n-icon>
              </template>
            </n-empty>
          </div>
          <div class="rating-block__buttons">
            <n-button strong size="large" circle type="info"
              ><n-icon><list-ul /></n-icon
            ></n-button>
            <n-button strong size="large" circle type="info"
              ><n-icon><heart /></n-icon
            ></n-button>
            <n-button strong size="large" circle type="info"
              ><n-icon><bookmark /></n-icon
            ></n-button>
            <n-button strong size="large" circle type="info"
              ><n-icon><star /></n-icon
            ></n-button>
          </div>
        </div>
        <div v-if="movie" class="movie-description__overview">
          <h3>Overview</h3>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </div>
    <div class="movie-page-header__background" :style="backgroundImageStyle"></div>
  </div>
  <loader v-else />
  <div v-if="movie && movie.credits" class="movie-page-content">
    <h1>Cast</h1>
    <n-scrollbar x-scrollable>
      <div class="movie-page-cast">
        <actor-card v-for="actor in movie.credits.cast" :key="actor.id" :actor="actor"></actor-card>
      </div>
    </n-scrollbar>
  </div>
</template>

<script>
import useMovie from '@/composables/useMovie';
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NButton, NProgress, NIcon, NEmpty, NScrollbar } from 'naive-ui';
import { Heart, Star, StarRegular, Bookmark, ListUl } from '@vicons/fa';
import ActorCard from '../components/ActorCard.vue';
import Loader from '../components/Loader.vue';

export default defineComponent({
  name: 'MoviePage',
  setup() {
    const route = useRoute();
    const { loading, movie, error, getMovie } = useMovie(route.params.id);

    const backgroundImageUrl = computed(
      () => process.env.VUE_APP_BACKGROUND_IMG_URL + movie.value?.backdrop_path
    );

    const backgroundImageStyle = computed(() => ({
      backgroundImage: `url(${backgroundImageUrl.value})`,
    }));

    const movieCoverSrc = computed(() => process.env.VUE_APP_IMG_URL + movie.value?.poster_path);

    onMounted(() => {
      getMovie();
    });

    return { loading, movie, error, movieCoverSrc, backgroundImageStyle };
  },
  components: {
    NButton,
    NProgress,
    NIcon,
    NScrollbar,
    Loader,
    Heart,
    Star,
    StarRegular,
    Bookmark,
    ListUl,
    NEmpty,
    ActorCard,
  },
});
</script>

<style lang="scss">
.movie-page-header {
  position: relative;

  &__background {
    z-index: 1;
    position: absolute;
    inset: 0;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

  &__foreground {
    z-index: 3;
    position: relative;
    display: flex;
    align-items: center;
    padding: 1.5rem 10vw;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
  }
}

.movie-description {
  margin-left: 2rem;

  &__title {
    display: inline;
  }

  &__release-year {
    font-size: 1.5rem;
    font-weight: 500;
    margin-left: 1rem;
  }

  &__genre-button {
    margin-right: 10px;
  }
}

.rating-block {
  margin: 2rem 0;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 2rem;
  }

  &__infographic {
    background-color: transparent;
  }

  &__buttons {
    & > * {
      margin-right: 1rem;
    }
  }
}

.movie-page-content {
  padding: 0 10vw;
}

.movie-page-cast {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  background-color: #e2e8dd;

  & > * {
    min-width: 130px;
    margin-right: 1rem;
  }
}
</style>
