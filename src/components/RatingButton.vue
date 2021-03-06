<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button
        :disabled="ratingValue === undefined"
        strong
        size="large"
        circle
        type="info"
        :loading="rating.setRatingValueLoading || rating.deleteRatingValueLoading"
        ><template #icon
          ><n-icon><star :color="ratingButtonColor" /></n-icon></template
      ></n-button>
    </template>

    <div class="popup-content">
      <n-rate
        allow-half
        :default-value="ratingValue.value / 2"
        :on-update:value="updateMovieRating"
      />
      <n-button v-if="ratingValue" @click="deleteMovieRating" class="delete-rating-button" text>
        <n-icon><trash /></n-icon>
      </n-button>
    </div>
  </n-popover>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { NButton, NIcon, NPopover, NRate } from 'naive-ui';
import { Trash, Star } from '@vicons/fa';
import useRating from '../composables/useRating';
import { VideoType } from '@/types/movie';

export default defineComponent({
  name: 'RatingButton',
  components: {
    NPopover,
    NButton,
    NIcon,
    NRate,
    Star,
    Trash,
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
    ratingValue: {
      type: (Object as PropType<{ value: number }>) || (Boolean as PropType<false>),
      required: true,
    },
  },
  emits: ['updated'],
  setup(props, { emit }) {
    const store = useStore();
    const { userInfo } = store.state.user;
    const { movieId, type, ratingValue } = toRefs(props);
    const rating = reactive(useRating());
    let movieRated = ref<boolean | null>(null);

    const updateMovieRating = (value: number) => {
      if (movieId.value && type.value && userInfo) {
        rating
          .setRatingValue(userInfo.session_id, type.value, movieId.value, value * 2)
          .then(() => (movieRated.value = true))
          .then(() => {
            setTimeout(() => emit('updated'), 3000);
          });
      }
    };

    const deleteMovieRating = () => {
      if (movieId.value && type.value && userInfo) {
        rating
          .deleteRatingValue(userInfo.session_id, type.value, movieId.value)
          .then(() => (movieRated.value = false))
          .then(() => {
            setTimeout(() => emit('updated'), 3000);
          });
      }
    };

    const ratingButtonColor = computed(() => {
      let color;
      if (movieRated.value === null) {
        color = ratingValue.value ? 'gold' : 'white';
      } else {
        color = movieRated.value ? 'gold' : 'white';
      }
      return color;
    });

    return {
      rating,
      movieRated,
      userInfo,
      ratingButtonColor,
      updateMovieRating,
      deleteMovieRating,
    };
  },
});
</script>

<style lang="scss">
.popup-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.delete-rating-button {
  margin-left: 0.5rem;
}
</style>
