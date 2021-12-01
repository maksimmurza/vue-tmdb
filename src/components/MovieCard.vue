<template>
  <n-card
    hoverable
    :title="movie.title"
    :style="{
      position: 'relative',
    }"
  >
    <template #cover>
      <img :src="movieCoverSrc" class="movie-cover" />
    </template>
    <div
      class="rating-label"
      @mouseover="ratingLabelIsHover = true"
      @mouseleave="ratingLabelIsHover = false"
    >
      <n-icon size="20">
        <star color="gold" size="30px" />
      </n-icon>
      <span class="rating-text">{{ movie.vote_average }}</span>
      <span class="rating-text" v-show="ratingLabelIsHover">- {{ movie.vote_count }} votes</span>
    </div>
    <div class="card-overview">
      {{ movie.overview }}
    </div>
  </n-card>
</template>

<script>
import { defineComponent, toRefs, ref } from 'vue';
import { NCard, NIcon } from 'naive-ui';
import { Star } from '@vicons/fa';

export default defineComponent({
  name: 'MovieCard',
  setup(props) {
    const movieCoverSrc = process.env.VUE_APP_IMG_URL + props.movie.poster_path;
    const ratingLabelIsHover = ref(false);

    return { ...toRefs(props), movieCoverSrc, ratingLabelIsHover };
  },
  components: { NCard, NIcon, Star },
  props: {
    movie: Object,
  },
});
</script>

<style lang="scss">
.rating-label {
  position: absolute;
  top: 280px;
  left: 10px;
  background-color: white;
  box-shadow: 0 0 5px 0px black;
  border-radius: 25px;
  height: 25px;
  display: flex;
  flex-wrap: nowrap;
  width: fit-content;
  align-items: center;
  padding: 3px 10px;
  cursor: pointer;
}

.rating-text {
  color: black;
  font-weight: 700;
  margin-left: 5px;
}

.card-overview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 5em;
}

.movie-cover {
  cursor: pointer;
}
</style>
