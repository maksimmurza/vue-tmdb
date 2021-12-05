<template>
  <div class="details-header">
    <div class="details-foreground">
      <div>
        <img :src="movieCoverSrc" />
      </div>
      <div class="movie-description">
        <div class="movie-title-container">
          <h1 class="movie-title">{{ movie && movie.title }}</h1>
          <span class="movie-release-year">({{ movie && movie.release_date.slice(0, 4) }})</span>
        </div>
        <div class="genres-list" v-if="movie">
          <n-button
            round
            type="tertiary"
            class="genre-button"
            size="tiny"
            v-for="genre in movie.genres"
            :key="genre.id"
            >{{ genre.name }}
          </n-button>
        </div>
        <div class="movie-page-rating-block">
          <div class="movie-page-rating-label" v-if="movie && movie.vote_count > 0">
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
          <div class="personal-lists">
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
        <div class="movie-overview" v-if="movie">
          <h3>Overview</h3>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </div>
    <div
      class="details-background"
      :style="{
        backgroundImage: `url(${backgroundImageUrl})`,
      }"
    ></div>
  </div>
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
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { NButton, NProgress, NIcon, NEmpty, NScrollbar } from 'naive-ui';
import { Heart, Star, StarRegular, Bookmark, ListUl } from '@vicons/fa';
import ActorCard from '../components/ActorCard.vue';

export default defineComponent({
  name: 'MoviePage',
  setup() {
    const route = useRoute();
    const store = useStore();
    const { loading, movie, error, getMovie } = useMovie(route.params.id);

    const backgroundImageUrl = computed(
      () => process.env.VUE_APP_BACKGROUND_IMG_URL + movie.value?.backdrop_path
    );

    const movieCoverSrc = computed(() => process.env.VUE_APP_IMG_URL + movie.value?.poster_path);

    onMounted(() => {
      getMovie();
    });

    return { loading, movie, error, getMovie, movieCoverSrc, backgroundImageUrl };
  },
  components: {
    NButton,
    NProgress,
    NIcon,
    NScrollbar,
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
.details-header {
  position: relative;
}

.details-background {
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}

.details-foreground {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  padding: 1.5rem 10vw;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
}

.movie-description {
  margin-left: 2rem;
}

.movie-title {
  display: inline;
}

.movie-release-year {
  font-size: 22px;
  font-weight: 500;
  margin-left: 1rem;
}

.genre-button {
  margin-right: 10px;
}

.personal-lists {
  & > * {
    margin-right: 1rem;
  }
}

.movie-page-rating-block {
  margin: 2rem 0;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 2rem;
  }
}

.movie-page-rating-label {
  background-color: transparent;
}

.movie-page-content {
  padding: 0 10vw;
}

.personal-list-button {
  border-radius: 50%;
  background-color: rgb(88, 112, 143);
}

.movie-page-cast {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  background-color: #e2e8dd;
}

.movie-page-cast > * {
  min-width: 130px;
  margin-right: 1rem;
}
</style>
