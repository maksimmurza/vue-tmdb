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
          <div class="rating-block__buttons">
            <n-popover v-if="accountStates.movieAccountStates" placement="bottom" trigger="click">
              <template #trigger>
                <n-button
                  :loading="
                    movieLists.movieListsLoading ||
                    movieLists.addMovieToListLoading ||
                    movieLists.removeMovieFromListLoading
                  "
                  strong
                  size="large"
                  circle
                  type="info"
                  @click="fetchMovieLists"
                  ><n-icon><list-ul /></n-icon
                ></n-button>
              </template>
              <n-checkbox-group v-if="movieLists.movieListsResult" v-model:value="movieListsValue">
                <n-space vertical>
                  <n-checkbox
                    v-for="list in movieLists.movieListsResult.results"
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

            <!-- <n-button
              :style="{ minWidth: 'fit-content' }"
              strong
              size="large"
              circle
              type="info"
              @click="updateMovieFavoriteValue"
              :loading="favoriteMovies.setFavoriteValueLoading"
              ><n-icon
                ><heart
                  :color="
                    accountStates.movieAccountStates?.favorite ? '#F36653' : 'white'
                  " /></n-icon
            ></n-button> -->
            <like-button
              :movieId="movie.details.id"
              :type="type"
              :favorite="accountStates.movieAccountStates?.favorite"
              @updated="updateMovieAccountStates"
            />
            <n-button
              :style="{ minWidth: 'fit-content' }"
              strong
              size="large"
              circle
              type="info"
              @click="updateMovieWatchlistValue"
              :loading="watchlist.setWatchlistValueLoading"
              ><n-icon
                ><bookmark
                  :color="
                    accountStates.movieAccountStates?.watchlist ? '#db5ece' : 'white'
                  " /></n-icon
            ></n-button>
            <n-popover v-if="accountStates" placement="bottom" trigger="click">
              <template #trigger>
                <n-button
                  strong
                  size="large"
                  circle
                  type="info"
                  :loading="rating.setRatingValueLoading || rating.deleteRatingValueLoading"
                  ><n-icon><star :color="movieRated ? 'gold' : 'white'" /></n-icon
                ></n-button>
              </template>

              <n-rate
                allow-half
                :default-value="
                  accountStates.movieAccountStates.rated
                    ? accountStates.movieAccountStates.rated.value / 2
                    : 0
                "
                :on-update:value="updateMovieRating"
              />
              <n-button
                v-if="accountStates.movieAccountStates.rated"
                @click="deleteMovieRating"
                text
              >
                <n-icon><trash /></n-icon>
              </n-button>
            </n-popover>
            <n-button v-else strong size="large" circle type="info"
              ><n-icon
                ><star
                  :color="accountStates.movieAccountStates?.rated ? 'gold' : 'white'" /></n-icon
            ></n-button>
          </div>
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
import { defineComponent, onMounted, ref, reactive, watch } from 'vue';
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
// import useFavoriteMovies from '../composables/useFavoriteMovies';
import useWatchlist from '../composables/useWatchlist';
import useRating from '../composables/useRating';
import { VideoType } from '@/types/movie';
import useMovieLists from '../composables/useMovieLists';
import useMovieAccountStates from '@/composables/useMovieAccountStates';
import LikeButton from '../components/LikeButton.vue';

export default defineComponent({
  name: 'MoviePage',
  components: {
    NButton,
    NProgress,
    NIcon,
    Loader,
    // Heart,
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
    LikeButton,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const id = parseInt(route.params.id as string);
    const type = route.params.type as VideoType;
    const { userInfo } = store.state.user;
    let movieListsValue = ref<Array<number>>([]);
    let movieRated = ref<boolean>(false);

    const movie = reactive(useMovie(type, id));
    const accountStates = reactive(useMovieAccountStates());
    // const favoriteMovies = reactive(useFavoriteMovies());
    const watchlist = reactive(useWatchlist());
    const rating = reactive(useRating());
    const movieLists = reactive(useMovieLists());

    const updateMovieAccountStates = () => {
      if (movie.details && userInfo) {
        accountStates.getMovieAccountStates(userInfo.session_id, movie.details.id, type);
      }
    };

    // const updateMovieFavoriteValue = () => {
    //   if (userInfo && movie.details && accountStates.movieAccountStates) {
    //     favoriteMovies
    //       .setFavoriteValue(
    //         userInfo.id,
    //         userInfo.session_id,
    //         type,
    //         movie.details.id,
    //         !accountStates.movieAccountStates.favorite
    //       )
    //       .then(updateMovieAccountStates);
    //   }
    // };

    const updateMovieWatchlistValue = () => {
      if (userInfo && movie.details && accountStates.movieAccountStates) {
        watchlist
          .setWatchlistValue(
            userInfo.id,
            userInfo.session_id,
            type,
            movie.details.id,
            !accountStates.movieAccountStates.watchlist
          )
          .then(updateMovieAccountStates);
      }
    };

    const updateMovieRating = (value: number) => {
      if (userInfo && movie.details && accountStates.movieAccountStates) {
        rating
          .setRatingValue(userInfo.session_id, type, movie.details.id, value * 2)
          .then(() => (movieRated.value = true))
          .then(updateMovieAccountStates);
      }
    };

    const deleteMovieRating = () => {
      if (userInfo && movie.details && movie.details && accountStates.movieAccountStates) {
        rating
          .deleteRatingValue(userInfo.session_id, type, movie.details.id)
          .then(() => (movieRated.value = false))
          .then(updateMovieAccountStates);
      }
    };

    const checkMoviePersistence = () => {
      if (movieLists.movieListsResult && movieLists.movieListsResult.results.length > 0) {
        movieLists.movieListsResult.results.forEach(async list => {
          if (movie.details) {
            const inList = await movieLists.isMoviePersistInList(
              movie.details.id,
              type,
              list.id,
              userInfo.access_token
            );

            if (inList) {
              movieListsValue.value.push(list.id);
            }
          }
        });
      }
    };

    const fetchMovieLists = () => {
      if (userInfo && movie.details && accountStates.movieAccountStates) {
        movieListsValue.value = [];
        movieLists.getMovieLists(userInfo.id, userInfo.session_id).then(checkMoviePersistence);
      }
    };

    const updateMovieListsValues = (listId: number, checked: boolean): void => {
      if (movie.details && checked) {
        movieLists.addMovieToList(movie.details.id, type, listId, userInfo.access_token);
      } else if (movie.details) {
        movieLists.deleteMovieFromList(movie.details.id, type, listId, userInfo.access_token);
      }
    };

    onMounted(() => {
      movie
        .getDetails()
        .then(() => {
          movie.getCredits();
          movie.getVideo();
        })
        .then(updateMovieAccountStates)
        .then(() => {
          if (accountStates.movieAccountStates?.rated) {
            movieRated.value = true;
          } else {
            movieRated.value = false;
          }
        });
    });

    return {
      movie,
      accountStates,
      // favoriteMovies,
      watchlist,
      rating,
      movieLists,
      movieListsValue,
      movieRated,
      // updateMovieFavoriteValue,
      type,
      updateMovieWatchlistValue,
      updateMovieRating,
      deleteMovieRating,
      fetchMovieLists,
      updateMovieListsValues,
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
