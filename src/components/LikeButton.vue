<template lang="">
  <n-button
    :style="{ minWidth: 'fit-content' }"
    strong
    size="large"
    circle
    type="info"
    @click="updateMovieFavoriteValue"
    :disabled="!user.userInfo"
    :loading="favoriteMovies.setFavoriteValueLoading"
    ><template #icon><n-icon><heart :color="favorite ? '#F36653' : 'white'" /></n-icon
  ></template></n-button>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, computed } from 'vue';
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
    movieId: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<VideoType>,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['updated'],
  setup(props, { emit }) {
    const store = useStore();
    const user = computed(() => store.state.user);
    const { movieId, type, favorite } = toRefs(props);
    const favoriteMovies = reactive(useFavoriteMovies());

    const updateMovieFavoriteValue = () => {
      if (movieId.value && type.value && user.value.userInfo) {
        favoriteMovies
          .setFavoriteValue(
            user.value.userInfo.id,
            user.value.userInfo.session_id,
            type.value,
            movieId.value,
            !favorite.value
          )
          .then(() => emit('updated'));
      }
    };

    return {
      user,
      favoriteMovies,
      updateMovieFavoriteValue,
    };
  },
});
</script>

<style lang="scss"></style>
