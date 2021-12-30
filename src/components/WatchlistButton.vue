<template lang="">
  <n-button
    :style="{ minWidth: 'fit-content' }"
    strong
    size="large"
    circle
    type="info"
    @click="updateMovieWatchlistValue"
    :loading="watchlistMovies.setWatchlistValueLoading"
    ><n-icon><bookmark :color="watchlist ? '#db5ece' : 'white'" /></n-icon
  ></n-button>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue';
import { useStore } from 'vuex';
import { NButton, NIcon } from 'naive-ui';
import { Bookmark } from '@vicons/fa';
import { VideoType } from '@/types/movie';
import useWatchlist from '@/composables/useWatchlist';

export default defineComponent({
  name: 'WatchlistButton',
  components: {
    NButton,
    NIcon,
    Bookmark,
  },
  props: {
    movieId: Number,
    type: String as PropType<VideoType>,
    watchlist: Boolean,
  },
  emits: ['updated'],
  setup(props, context) {
    const store = useStore();
    const { userInfo } = store.state.user;
    const { movieId, type, watchlist } = toRefs(props);
    const watchlistMovies = reactive(useWatchlist());

    const updateMovieWatchlistValue = () => {
      if (movieId.value && type.value && userInfo) {
        watchlistMovies
          .setWatchlistValue(
            userInfo.id,
            userInfo.session_id,
            type.value,
            movieId.value,
            !watchlist.value
          )
          .then(() => context.emit('updated'));
      }
    };

    return {
      watchlistMovies,
      updateMovieWatchlistValue,
    };
  },
});
</script>

<style lang="scss"></style>
