<template>
  <div class="user-header">
    <img
      v-if="user.userInfo.avatar"
      :src="userAvatarBaseUrl + user.userInfo.avatar"
      :style="{ minWidth: 'fit-content' }"
      class="user-header__avatar"
    />
    <h1>{{ user.userInfo.name }}</h1>
    <n-button tertiary round size="tiny" :text-color="gray">Edit profile</n-button>
  </div>
  <div class="user-menu">
    <n-tabs
      class="user-menu__tabs"
      justify-content="center"
      tab-style="margin: 0 2rem 0 2rem"
      pane-class="user-menu__pane"
      @before-leave="handleBeforeLeave"
      :default-value="menuItem || 'favorite'"
    >
      <n-tab-pane name="favorite" tab="Favorite">
        <div v-if="favorite.favoriteMoviesLoading"></div>
        <div v-else class="movies-container">
          <movie-card
            v-for="movie in favorite.favoriteMovies?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </div>
      </n-tab-pane>
      <n-tab-pane name="watchlist" tab="Watchlist">
        <div v-if="watchlist.watchlistMoviesLoading"></div>
        <div v-else class="movies-container">
          <movie-card
            v-for="movie in watchlist.watchlistMoviesResults?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </div>
      </n-tab-pane>
      <n-tab-pane name="rated" tab="Rated">
        <div v-if="rated.ratedMoviesLoading"></div>
        <div v-else class="movies-container">
          <movie-card
            v-for="movie in rated.ratedMoviesResults?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </div>
      </n-tab-pane>
      <n-tab-pane name="lists" tab="Lists">
        <div v-if="lists.movieListsLoading || lists.listDetailsLoading"></div>
        <div v-else :class="{ 'movies-container': menuItem !== 'lists' }">
          <n-collapse>
            <n-collapse-item
              v-for="list in moviesLists"
              :key="list.id"
              :title="list.name"
              :name="list.id"
            >
              <cards-list>
                <movie-card
                  v-for="movie in list.results"
                  :movie="movie"
                  :type="movie.media_type"
                  :key="movie.id"
                />
              </cards-list>
            </n-collapse-item>
          </n-collapse>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NTabs,
  NTabPane,
  // NBadge,
  // NModal,
  // NAvatar,
  // NMenu,
} from 'naive-ui';
import { useStore } from 'vuex';
import useFavoriteMovies from '../composables/useFavoriteMovies';
import useWatchlist from '../composables/useWatchlist';
import useRating from '../composables/useRating';
import useMovieLists from '../composables/useMovieLists';
import MovieCard from '../components/MovieCard.vue';
import { Movie, ProfileMenuItem, TVShow } from '@/types/movie';
import { useRoute, useRouter } from 'vue-router';
import { MovieListDetails } from '@/types/fetching';
import CardsList from '../components/CardsList.vue';

export default defineComponent({
  name: 'UserPage',
  components: { NButton, NTabs, NTabPane, MovieCard, NCollapse, NCollapseItem, CardsList },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const menuItem = route.params.menuItem as ProfileMenuItem;
    const userAvatarBaseUrl = process.env.VUE_APP_IMG_URL;
    let favoriteMovies = ref<Array<Movie | TVShow>>([]);
    let watchlistMovies = ref<Array<Movie | TVShow>>([]);
    let ratedMovies = ref<Array<Movie | TVShow>>([]);
    let moviesLists = ref<Array<MovieListDetails>>([]);

    const user = computed(() => store.state.user);

    const favorite = reactive(useFavoriteMovies());
    const watchlist = reactive(useWatchlist());
    const rated = reactive(useRating());
    const lists = reactive(useMovieLists());

    const handleBeforeLeave = (tabName: string): boolean => {
      switch (tabName) {
        case 'favorite':
          router.push('/profile/favorite');
          profileMoviesService.favorite();
          return true;
        case 'watchlist':
          router.push('/profile/watchlist');
          profileMoviesService.watchlist();
          return true;
        case 'rated':
          router.push('/profile/rated');
          profileMoviesService.rated();
          return true;
        case 'lists':
          router.push('/profile/lists');
          profileMoviesService.lists();
          return true;
        default:
          return true;
      }
    };

    const profileMoviesService = {
      favorite: () => {
        favorite.getFavoriteMovies(
          user.value.userInfo.account_id,
          user.value.userInfo.session_id,
          'all'
        );
      },

      watchlist: () => {
        watchlist.getWatchlistMovies(
          user.value.userInfo.account_id,
          user.value.userInfo.session_id,
          'all'
        );
      },

      rated: () => {
        rated.getRatedMovies(user.value.userInfo.account_id, user.value.userInfo.session_id, 'all');
      },

      lists: () => {
        lists
          .getMovieLists(user.value.userInfo.account_id, user.value.userInfo.session_id)
          .then(() => {
            if (lists.movieListsResult && lists.movieListsResult.results) {
              moviesLists.value = [];
              lists.movieListsResult.results.forEach(list => {
                lists.getListDetails(list.id, user.value.userInfo.access_token).then(() => {
                  if (lists.listDetailsResult) {
                    moviesLists.value.push(lists.listDetailsResult);
                  }
                });
              });
            }
          });
      },
    };

    onMounted(() => {
      if (menuItem) {
        profileMoviesService[menuItem]();
      } else {
        profileMoviesService.favorite();
      }
    });

    return {
      user,
      userAvatarBaseUrl,
      favorite,
      watchlist,
      rated,
      lists,
      favoriteMovies,
      watchlistMovies,
      ratedMovies,
      moviesLists,
      menuItem,
      handleBeforeLeave,
    };
  },
});
</script>

<style lang="scss">
.user-header {
  padding: 50px 10vw 200px 10vw;
  background: rgb(3, 37, 65);
  background: linear-gradient(180deg, rgba(3, 37, 65, 1) 0%, rgba(255, 255, 255, 0) 100%);

  display: flex;
  flex-direction: column;
  align-items: center;

  &__avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.185);
  }

  & > h1 {
    color: white;
    margin-bottom: 5px;
  }
}

.user-menu {
  background-color: white;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.185);
  margin: -150px 10vw 2rem 10vw;
  border-radius: 20px;

  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__tabs {
    box-sizing: border-box;
    padding: 1rem 2rem;
  }

  &__pane > .movies-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    & > * {
      max-width: 150px;
      margin: 0 1rem 1rem 0;
    }
  }
}
</style>
