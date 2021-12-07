<template>
  <div>Here we go</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { NPagination } from 'naive-ui';
import MovieCard from '../components/MovieCard.vue';

export default defineComponent({
  name: 'MoviesPage',
  setup(props) {
    return { ...toRefs(props) };
  },
  props: {
    title: String,
  },
  components: {
    // MovieCard
  },
});
</script>

<style lang="scss"></style>
