<template>
  <n-card hoverable class="movie-card" :style="cardStyle">
    <template #cover>
      <router-link :to="'/' + type + '/' + movie.id">
        <img
          v-if="!movie.poster_path && (type === 'movie' || type === 'tv')"
          src="@/assets/images/movieCoverPlaceholder.png"
          class="movie-card__cover"
        />
        <img
          v-else-if="!movie.poster_path"
          src="@/assets/images/personAvatarPlaceholder.jpg"
          class="movie-card__cover"
        />
        <img
          v-else
          v-show="imageIsLoaded"
          @load="imageIsLoaded = true"
          :src="movieCoverSrc"
          class="movie-card__cover"
        />
        <n-skeleton v-if="!imageIsLoaded && movie.poster_path" width="100%" height="300px" />
      </router-link>
    </template>
    <div
      v-if="type === 'movie' || type === 'tv'"
      class="movie-card__rating"
      @mouseover="ratingLabelIsHover = true"
      @mouseleave="ratingLabelIsHover = false"
    >
      <n-icon size="20">
        <star color="gold" size="30px" />
      </n-icon>
      <span class="movie-card__rating-text">{{ movie.vote_average }}</span>
      <span class="movie-card__rating-text" v-show="ratingLabelIsHover"
        >- {{ movie.vote_count }} votes</span
      >
    </div>
    <div class="movie-card__text">
      <h3 :style="{ marginBottom: '0' }">
        {{ movie[titleProperty] }}
      </h3>
    </div>
  </n-card>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { NCard, NIcon, NSkeleton } from 'naive-ui';
import { Star } from '@vicons/fa';

export default defineComponent({
  name: 'MovieCard',
  components: { NCard, NIcon, Star, NSkeleton },
  props: {
    movie: Object,
    type: String,
    minWidth: Number,
    maxWidth: Number,
  },
  setup(props) {
    const movieCoverSrc = process.env.VUE_APP_IMG_URL + props.movie.poster_path;
    const ratingLabelIsHover = ref(false);
    const imageIsLoaded = ref(false);

    const titleProperty = computed(() => (props.type === 'movie' ? 'title' : 'name'));

    const cardStyle = computed(() => ({
      minWidth: `${props.minWidth}px`,
      maxWidth: `${props.maxWidth}px`,
    }));

    return {
      cardStyle,
      movieCoverSrc,
      titleProperty,
      ratingLabelIsHover,
      imageIsLoaded,
    };
  },
});
</script>

<style lang="scss">
.movie-card {
  position: relative;

  &__cover {
    cursor: pointer;
  }

  &__rating {
    $ratingHeight: 25px;

    position: relative;
    top: -$ratingHeight / 2 - 1;
    margin-bottom: -1rem;
    background-color: white;
    box-shadow: 0 0 5px 0px black;
    border-radius: $ratingHeight;
    height: $ratingHeight;
    display: flex;
    flex-wrap: nowrap;
    width: fit-content;
    align-items: center;
    padding: 3px 10px;
    cursor: default;

    &:hover {
      z-index: 3;
    }
  }

  &__rating-text {
    color: black;
    font-weight: 700;
    margin-left: 5px;
    white-space: nowrap;
  }

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    min-height: 3em;
  }
}
</style>
