<template>
  <div v-if="movie.details" class="movie-page-header">
    <div class="movie-page-header__foreground">
      <div>
        <img :src="movie.coverURL" />
      </div>
      <div class="movie-description">
        <div>
          <h1 class="movie-description__title">
            {{ movie.details.title ? movie.details.title : movie.details.name }}
          </h1>
          <span v-if="movie.details.release_date" class="movie-description__release-year"
            >({{ movie.details.release_date.slice(0, 4) }})</span
          >
        </div>
        <div v-if="movie.details">
          <n-button
            round
            type="tertiary"
            class="movie-description__genre-button"
            size="tiny"
            v-for="genre in movie.details.genres"
            :key="genre.id"
            >{{ genre.name }}
          </n-button>
        </div>
        <div class="rating-block">
          <div v-if="movie.details.vote_count > 0" class="rating-block__infographic">
            <n-progress
              type="circle"
              :indicator-text-color="'white'"
              :percentage="movie.details.vote_average * 10"
              :color="
                movie.details.vote_average < 5
                  ? 'red'
                  : movie.details.vote_average < 8
                  ? 'orange'
                  : 'green'
              "
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
          <div v-if="userInfo" class="rating-block__buttons">
            <lists-button :movieId="movie.details.id" :type="type" />
            <like-button
              :movieId="movie.details.id"
              :type="type"
              :favorite="accountStates.movieAccountStates?.favorite"
              @updated="updateMovieAccountStates"
            />
            <watchlist-button
              :movieId="movie.details.id"
              :type="type"
              :watchlist="accountStates.movieAccountStates?.watchlist"
              @updated="updateMovieAccountStates"
            />
            <rating-button
              :movieId="movie.details.id"
              :type="type"
              :ratingValue="accountStates.movieAccountStates?.rated"
              @updated="updateMovieAccountStates"
            />
          </div>
          <div v-else>You should log in to rate or add movie to lists</div>
        </div>
        <div v-if="movie.details" class="movie-description__overview">
          <h3>Overview</h3>
          <p>{{ movie.details.overview }}</p>
        </div>
      </div>
    </div>
    <div class="movie-page-header__background" :style="movie.backgroundImageStyle"></div>
  </div>
  <loader v-else />
  <div v-if="movie.credits" class="movie-page-content">
    <h1>Cast</h1>
    <cards-list :loading="movie.creditsLoading" :error="movie.detailsError">
      <actor-card v-for="actor in movie.credits.cast" :key="actor.id" :actor="actor"></actor-card>
    </cards-list>
    <h1>Trailer</h1>
    <iframe :src="movie.trailerURL" width="700" height="500" frameborder="0">
      {{ movie.trailerURL }}
    </iframe>
  </div>
</template>

<script lang="ts">
import useMovie from '@/composables/useMovie';
import { defineComponent, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { NButton, NProgress, NIcon, NEmpty } from 'naive-ui';
import { StarRegular } from '@vicons/fa';
import ActorCard from '../components/ActorCard.vue';
import Loader from '../components/Loader.vue';
import CardsList from '../components/CardsList.vue';
import { VideoType } from '@/types/movie';
import useMovieAccountStates from '@/composables/useMovieAccountStates';
import LikeButton from '../components/LikeButton.vue';
import WatchlistButton from '../components/WatchlistButton.vue';
import RatingButton from '../components/RatingButton.vue';
import ListsButton from '../components/ListsButton.vue';

export default defineComponent({
  name: 'MoviePage',
  components: {
    NButton,
    NProgress,
    NIcon,
    Loader,
    StarRegular,
    NEmpty,
    ActorCard,
    CardsList,
    LikeButton,
    WatchlistButton,
    RatingButton,
    ListsButton,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = parseInt(route.params.id as string);
    const type = route.params.type as VideoType;
    const { userInfo } = store.state.user;

    const movie = reactive(useMovie(type, id));
    const accountStates = reactive(useMovieAccountStates());

    const updateMovieAccountStates = () => {
      if (movie.details && userInfo) {
        accountStates.getMovieAccountStates(userInfo.session_id, movie.details.id, type);
      }
    };

    onMounted(() => {
      movie
        .getDetails()
        .then(() => {
          movie.getCredits();
          movie.getVideo();
        })
        .then(updateMovieAccountStates);
    });

    return {
      movie,
      accountStates,
      type,
      userInfo,
      updateMovieAccountStates,
    };
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
