<template>
  <div v-if="movieDetails" class="movie-page-header">
    <div class="movie-page-header__foreground">
      <div>
        <img :src="movieCoverSrc" />
      </div>
      <div class="movie-description">
        <div>
          <h1 class="movie-description__title">
            {{ movieDetails.title ? movieDetails.title : movieDetails.name }}
          </h1>
          <span v-if="movieDetails.release_date" class="movie-description__release-year"
            >({{ movieDetails.release_date.slice(0, 4) }})</span
          >
        </div>
        <div v-if="movieDetails">
          <n-button
            round
            type="tertiary"
            class="movie-description__genre-button"
            size="tiny"
            v-for="genre in movieDetails.genres"
            :key="genre.id"
            >{{ genre.name }}
          </n-button>
        </div>
        <div class="rating-block">
          <div v-if="movieDetails.vote_count > 0" class="rating-block__infographic">
            <n-progress
              type="circle"
              :indicator-text-color="'white'"
              :percentage="movieDetails.vote_average * 10"
              :color="
                movieDetails.vote_average < 5
                  ? 'red'
                  : movieDetails.vote_average < 8
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
          <div class="rating-block__buttons">
            <n-popover v-if="movieAccountStates" placement="bottom" trigger="click">
              <template #trigger>
                <n-button
                  :loading="
                    movieListsLoading || addMovieToListLoading || removeMovieFromListLoading
                  "
                  strong
                  size="large"
                  circle
                  type="info"
                  @click="fetchMovieLists"
                  ><n-icon><list-ul /></n-icon
                ></n-button>
              </template>
              <n-checkbox-group v-if="movieLists" v-model:value="movieListsValue">
                <n-space vertical>
                  <n-checkbox
                    v-for="list in movieLists.results"
                    :list="list"
                    :key="list.id"
                    :value="list.id"
                    :label="list.name"
                    @click="
                      () => updateMovieListsValues(list.id, movieListsValue.includes(list.id))
                    "
                  />
                </n-space>
              </n-checkbox-group>
            </n-popover>
            <n-button v-else strong size="large" circle type="info"
              ><n-icon><list-ul /></n-icon
            ></n-button>

            <n-button
              :style="{ minWidth: 'fit-content' }"
              strong
              size="large"
              circle
              type="info"
              @click="updateMovieFavoriteValue"
              :loading="setFavoriteValueLoading"
              ><n-icon><heart :color="movieAccountStates?.favorite ? '#F36653' : 'white'" /></n-icon
            ></n-button>
            <n-button
              :style="{ minWidth: 'fit-content' }"
              strong
              size="large"
              circle
              type="info"
              @click="updateMovieWatchlistValue"
              :loading="setWatchlistValueLoading"
              ><n-icon
                ><bookmark :color="movieAccountStates?.watchlist ? '#db5ece' : 'white'" /></n-icon
            ></n-button>
            <n-popover v-if="movieAccountStates" placement="bottom" trigger="click">
              <template #trigger>
                <n-button
                  strong
                  size="large"
                  circle
                  type="info"
                  :loading="setRatingValueLoading || deleteRatingValueLoading"
                  ><n-icon><star :color="movieAccountStates?.rated ? 'gold' : 'white'" /></n-icon
                ></n-button>
              </template>

              <n-rate
                allow-half
                :default-value="movieAccountStates.rated ? movieAccountStates.rated.value / 2 : 0"
                :on-update:value="updateMovieRating"
              />
              <n-button v-if="movieAccountStates.rated" @click="deleteMovieRating" text>
                <n-icon><trash /></n-icon>
              </n-button>
            </n-popover>
            <n-button v-else strong size="large" circle type="info"
              ><n-icon><star :color="movieAccountStates?.rated ? 'gold' : 'white'" /></n-icon
            ></n-button>
          </div>
        </div>
        <div v-if="movieDetails" class="movie-description__overview">
          <h3>Overview</h3>
          <p>{{ movieDetails.overview }}</p>
        </div>
      </div>
    </div>
    <div class="movie-page-header__background" :style="backgroundImageStyle"></div>
  </div>
  <loader v-else />
  <div v-if="movieDetails && movieDetails.credits" class="movie-page-content">
    <h1>Cast</h1>
    <cards-list :loading="movieCreditsLoading" :error="movieDetailsError">
      <actor-card
        v-for="actor in movieDetails.credits.cast"
        :key="actor.id"
        :actor="actor"
      ></actor-card>
    </cards-list>
    <h1>Trailer</h1>
    <iframe :src="movieTrailerLink" width="700" height="500" frameborder="0">
      {{ movieTrailerLink }}
    </iframe>
  </div>
</template>

<script lang="ts">
import useMovie from '@/composables/useMovie';
import { defineComponent, onMounted, computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {
  NButton,
  NProgress,
  NIcon,
  NEmpty,
  NRate,
  NPopover,
  NCheckbox,
  NCheckboxGroup,
  NSpace,
} from 'naive-ui';
import { Heart, Star, StarRegular, Bookmark, ListUl, Trash } from '@vicons/fa';
import ActorCard from '../components/ActorCard.vue';
import Loader from '../components/Loader.vue';
import CardsList from '../components/CardsList.vue';
import useMovieAccountStates from '../composables/useMovieAccountStates';
import useFavoriteMovies from '../composables/useFavoriteMovies';
import useWatchlist from '../composables/useWatchlist';
import useRating from '../composables/useRating';
import { VideoType } from '@/types/movie';
import { isEqual } from 'lodash';
import useMovieLists from '../composables/useMovieLists';

export default defineComponent({
  name: 'MoviePage',
  components: {
    NButton,
    NProgress,
    NIcon,
    Loader,
    Heart,
    Star,
    StarRegular,
    Bookmark,
    ListUl,
    NEmpty,
    ActorCard,
    CardsList,
    NRate,
    NPopover,
    Trash,
    NCheckbox,
    NCheckboxGroup,
    NSpace,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = parseInt(route.params.id as string);
    const type = route.params.type as VideoType;
    const { userInfo } = store.state.user;
    let movieListsValue = ref<Array<number>>([]);

    const {
      movieDetailsLoading,
      movieCreditsLoading,
      movieVideosLoading,
      movie: movieDetails,
      movieDetailsError,
      movieCreditsError,
      movieVideosError,
      getMovie,
      getMovieCredits,
      getMovieVideo,
    } = useMovie(type, id);

    const {
      getMovieAccountStates,
      movieAccountStatesLoading,
      movieAccountStates,
      movieAccountStatesError,
    } = useMovieAccountStates();

    const {
      favoriteMoviesLoading,
      favoriteMovies,
      favoriteMoviesError,
      getFavoriteMovies,
      setFavoriteValueLoading,
      setFavoriteValueResult,
      setFavoriteValueError,
      setFavoriteValue,
    } = useFavoriteMovies();

    const {
      setWatchlistValueLoading,
      setWatchlistValueResult,
      setWatchlistValueError,
      setWatchlistValue,
    } = useWatchlist();

    const {
      setRatingValueLoading,
      setRatingValueResult,
      setRatingValueError,
      setRatingValue,
      deleteRatingValue,
      deleteRatingValueLoading,
      deleteRatingValueResult,
      deleteRatingValueError,
    } = useRating();

    const {
      movieListsLoading,
      movieLists,
      movieListsError,
      getMovieLists,
      isMoviePersistInList,
      addMovieToListResponse,
      addMovieToListError,
      addMovieToListLoading,
      addMovieToList,
      deleteMovieFromList,
      removeMovieFromListResponse,
      removeMovieFromListError,
      removeMovieFromListLoading,
    } = useMovieLists();

    const backgroundImageUrl = computed(
      () => process.env.VUE_APP_BACKGROUND_IMG_URL + movieDetails.value?.backdrop_path
    );

    const backgroundImageStyle = computed(() => ({
      backgroundImage: `url(${backgroundImageUrl.value})`,
    }));

    const movieCoverSrc = computed(
      () => process.env.VUE_APP_IMG_URL + movieDetails.value?.poster_path
    );

    const movieTrailerLink = computed(() => {
      const officialTrailer = movieDetails.value?.videos?.results.find(
        video => video.name === 'Official Trailer'
      );

      if (officialTrailer) {
        return `https://www.youtube.com/embed/${officialTrailer.key}`;
      }

      const trailer = movieDetails.value?.videos?.results.find(video => video.type === 'Trailer');

      if (trailer) {
        return `https://www.youtube.com/embed/${trailer.key}`;
      }

      return null;
    });

    const updateMovieAccountStates = () => {
      if (movieDetails.value && userInfo) {
        getMovieAccountStates(userInfo.sessionId, movieDetails.value.id, type);
      }
    };

    const updateMovieFavoriteValue = () => {
      if (userInfo && movieDetails.value && movieAccountStates.value) {
        setFavoriteValue(
          userInfo.id,
          userInfo.sessionId,
          type,
          movieDetails.value.id,
          !movieAccountStates.value.favorite
        ).then(updateMovieAccountStates);
      }
    };

    const updateMovieWatchlistValue = () => {
      if (userInfo && movieDetails.value && movieAccountStates.value) {
        setWatchlistValue(
          userInfo.id,
          userInfo.sessionId,
          type,
          movieDetails.value.id,
          !movieAccountStates.value.watchlist
        ).then(updateMovieAccountStates);
      }
    };

    const updateMovieRating = (value: number) => {
      if (userInfo && movieDetails.value && movieAccountStates.value) {
        setRatingValue(userInfo.sessionId, type, movieDetails.value.id, value * 2).then(
          updateMovieAccountStates
        );
      }
    };

    const deleteMovieRating = () => {
      if (userInfo && movieDetails.value && movieAccountStates.value) {
        deleteRatingValue(userInfo.sessionId, type, movieDetails.value.id).then(
          updateMovieAccountStates
        );
      }
    };

    const checkMoviePersistence = () => {
      if (movieLists.value && movieLists.value.results.length > 0) {
        movieLists.value.results.forEach(async list => {
          if (movieDetails.value) {
            const inList = await isMoviePersistInList(
              movieDetails.value.id,
              list.id,
              userInfo.sessionId
            );

            if (inList) {
              movieListsValue.value.push(list.id);
            }
          }
        });
      }
    };

    const fetchMovieLists = () => {
      if (userInfo && movieDetails.value && movieAccountStates.value) {
        movieListsValue.value = [];
        getMovieLists(userInfo.id, userInfo.sessionId).then(checkMoviePersistence);
      }
    };

    const updateMovieListsValues = (listId: number, checked: boolean): void => {
      if (movieDetails.value && checked) {
        addMovieToList(movieDetails.value.id, type, listId, userInfo.sessionId);
      } else if (movieDetails.value) {
        deleteMovieFromList(movieDetails.value.id, type, listId, userInfo.sessionId);
      }
    };

    watch(movieAccountStates, (newStates, prevStates) => {
      if (isEqual(newStates, prevStates)) {
        setTimeout(updateMovieAccountStates, 1500);
      }
    });

    onMounted(() => {
      getMovie().then(getMovieCredits).then(getMovieVideo).then(updateMovieAccountStates);
    });

    return {
      movieDetailsLoading,
      movieCreditsLoading,
      movieVideosLoading,
      movieAccountStatesLoading,
      movieDetails,
      movieAccountStates,
      movieDetailsError,
      movieCreditsError,
      movieVideosError,
      movieAccountStatesError,
      movieCoverSrc,
      movieTrailerLink,
      backgroundImageStyle,
      favoriteMoviesLoading,
      favoriteMovies,
      favoriteMoviesError,
      setFavoriteValueLoading,
      setFavoriteValueResult,
      setFavoriteValueError,
      setWatchlistValueResult,
      setWatchlistValueError,
      setWatchlistValueLoading,
      setRatingValueLoading,
      setRatingValueResult,
      setRatingValueError,
      deleteRatingValueLoading,
      deleteRatingValueResult,
      deleteRatingValueError,
      movieListsLoading,
      movieLists,
      movieListsError,
      movieListsValue,
      addMovieToListResponse,
      addMovieToListError,
      addMovieToListLoading,
      removeMovieFromListResponse,
      removeMovieFromListError,
      removeMovieFromListLoading,
      addMovieToList,
      deleteMovieFromList,
      setRatingValue,
      getMovieAccountStates,
      getFavoriteMovies,
      setFavoriteValue,
      setWatchlistValue,
      updateMovieFavoriteValue,
      updateMovieWatchlistValue,
      updateMovieRating,
      deleteMovieRating,
      fetchMovieLists,
      updateMovieListsValues,
      log(checked: boolean) {
        console.log(checked);
      },
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
