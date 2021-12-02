<template>
  <div class="details-header">
    <div class="details-foreground">
      <div class="movie-cover">
        <img :src="movieCoverSrc" class="movie-cover" />
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
        <div class="rating-block">
          <div class="rating-label" v-if="movie">
            <n-progress
              type="circle"
              :percentage="movie.vote_average * 10"
              :color="movie.vote_average < 5 ? 'red' : movie.vote_average < 8 ? 'orange' : 'green'"
            ></n-progress>
          </div>
          <div class="personal-lists"></div>
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
</template>

<script>
import useMovie from '@/composables/useMovie';
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NButton, NProgress } from 'naive-ui';

export default defineComponent({
  name: 'MoviePage',
  setup() {
    const route = useRoute();
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
  components: { NButton, NProgress },
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
  transform: scale(1.1);
}

.details-foreground {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
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
</style>
