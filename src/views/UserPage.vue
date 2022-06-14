<template>
  <div class="user-header">
    <img
      v-if="user.userInfo.avatar"
      :src="userAvatarBaseUrl + user.userInfo.avatar"
      :style="{ minWidth: 'fit-content' }"
      class="user-header__avatar"
    />
    <h1>{{ user.userInfo.name }}</h1>
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
        <loader v-if="favorite.favoriteMoviesLoading"></loader>
        <cards-list v-else>
          <movie-card
            v-for="movie in favorite.favoriteMovies?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </cards-list>
      </n-tab-pane>
      <n-tab-pane name="watchlist" tab="Watchlist">
        <loader v-if="watchlist.watchlistMoviesLoading"></loader>
        <cards-list v-else>
          <movie-card
            v-for="movie in watchlist.watchlistMoviesResults?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </cards-list>
      </n-tab-pane>
      <n-tab-pane name="rated" tab="Rated">
        <loader v-if="rated.ratedMoviesLoading"></loader>
        <cards-list v-else>
          <movie-card
            v-for="movie in rated.ratedMoviesResults?.results"
            :movie="movie"
            :type="movie.type"
            :key="movie.id"
          />
        </cards-list>
      </n-tab-pane>
      <n-tab-pane name="lists" tab="Lists">
        <loader v-if="listsInfo.movieListsLoading"></loader>
        <div v-else class="lists-pane-content">
          <div class="create-list-button">
            <create-list-button @created="profileMoviesService.getListsMovies" />
          </div>
          <div v-if="listsInfo.movieListsLoading || listsInfo.listDetailsLoading"></div>
          <div v-else :class="{ 'movies-container': menuItem !== 'lists' }">
            <n-collapse>
              <n-collapse-item
                v-for="list in moviesLists"
                :key="list.id"
                :title="list.name"
                :name="list.id"
              >
                <template #header-extra>
                  <edit-list-button @updated="profileMoviesService.getListsMovies" :list="list" />
                  <clear-list-button @cleared="profileMoviesService.getListsMovies" :list="list" />
                  <delete-list-button @deleted="profileMoviesService.getListsMovies" :list="list" />
                </template>
                <cards-list-horizontal v-if="list.results.length > 0">
                  <movie-card
                    v-for="movie in list.results"
                    :movie="movie"
                    :type="movie.media_type"
                    :key="movie.id"
                    :maxWidth="200"
                  />
                </cards-list-horizontal>
                <span v-else>Empty list</span>
              </n-collapse-item>
            </n-collapse>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { NCollapse, NCollapseItem, NTabs, NTabPane } from 'naive-ui';
import { useStore } from 'vuex';
import MovieCard from '../components/MovieCard.vue';
import { ProfileMenuItem } from '@/types/movie';
import { useRoute, useRouter } from 'vue-router';
import CardsListHorizontal from '../components/CardsListHorizontal.vue';
import CreateListButton from '../components/CreateListButton.vue';
import EditListButton from '../components/EditListButton.vue';
import DeleteListButton from '../components/DeleteListButton.vue';
import ClearListButton from '../components/ClearListButton.vue';
import Loader from '@/components/Loader.vue';
import useProfileMovies from '../composables/useProfileMovies';
import CardsList from '@/components/CardsList.vue';

export default defineComponent({
  name: 'UserPage',
  components: {
    NTabs,
    NTabPane,
    MovieCard,
    NCollapse,
    NCollapseItem,
    EditListButton,
    CardsListHorizontal,
    CreateListButton,
    DeleteListButton,
    ClearListButton,
    Loader,
    CardsList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const menuItem = route.params.menuItem as ProfileMenuItem;
    const userAvatarBaseUrl = process.env.VUE_APP_IMG_URL;

    const user = computed(() => store.state.user);
    const profileMoviesService = useProfileMovies();
    const { favorite, watchlist, rated, listsInfo, moviesLists } = profileMoviesService;

    const handleBeforeLeave = (tabName: string): boolean => {
      switch (tabName) {
        case 'favorite':
          router.push('/profile/favorite');
          profileMoviesService.getFavoriteMovies();
          return true;
        case 'watchlist':
          router.push('/profile/watchlist');
          profileMoviesService.getWatchlistMovies();
          return true;
        case 'rated':
          router.push('/profile/rated');
          profileMoviesService.getRatedMovies();
          return true;
        case 'lists':
          router.push('/profile/lists');
          profileMoviesService.getListsMovies();
          return true;
        default:
          return true;
      }
    };

    onMounted(() => {
      if (menuItem) {
        switch (menuItem) {
          case 'favorite':
            profileMoviesService.getFavoriteMovies();
            break;
          case 'watchlist':
            profileMoviesService.getWatchlistMovies();
            break;
          case 'rated':
            profileMoviesService.getRatedMovies();
            break;
          case 'lists':
            profileMoviesService.getListsMovies();
            break;
        }
      } else {
        profileMoviesService.getFavoriteMovies();
      }
    });

    return {
      user,
      userAvatarBaseUrl,
      menuItem,
      profileMoviesService,
      favorite,
      watchlist,
      rated,
      listsInfo,
      moviesLists,
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
  margin: -170px 10vw 2rem 10vw;
  border-radius: 20px;

  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__tabs {
    box-sizing: border-box;
    padding: 1rem 2rem;
  }

  &__pane > .lists-pane-content > .create-list-button {
    margin: 0 auto 1em auto;
    display: flex;
    justify-content: center;
  }
}
</style>
