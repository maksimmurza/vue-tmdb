<template lang="">
  <n-button
    :style="{ minWidth: 'fit-content' }"
    strong
    size="large"
    circle
    type="info"
    @click="updateMovieFavoriteValue"
    :loading="favoriteMovies.setFavoriteValueLoading"
    ><n-icon><heart :color="favorite ? '#F36653' : 'white'" /></n-icon
  ></n-button>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue';
import { useStore } from 'vuex';
import { NButton, NIcon } from 'naive-ui';
import { Heart } from '@vicons/fa';
import useFavoriteMovies from '../composables/useFavoriteMovies';
import { VideoType } from '@/types/movie';

export default defineComponent({
  name: 'LikeButton',
  components: {
    NButton,
    NIcon,
    Heart,
  },
  props: {
    movieId: Number,
    type: String as PropType<VideoType>,
    favorite: Boolean,
  },
  emits: ['updated'],
  setup(props, context) {
    const store = useStore();
    const { userInfo } = store.state.user;
    const { movieId, type, favorite } = toRefs(props);
    const favoriteMovies = reactive(useFavoriteMovies());

    const updateMovieFavoriteValue = () => {
      if (movieId.value && type.value && userInfo) {
        favoriteMovies
          .setFavoriteValue(
            userInfo.id,
            userInfo.session_id,
            type.value,
            movieId.value,
            !favorite.value
          )
          .then(() => context.emit('updated'));
      }
    };

    return {
      favoriteMovies,
      updateMovieFavoriteValue,
    };
  },
});
</script>

<style lang="scss"></style>
