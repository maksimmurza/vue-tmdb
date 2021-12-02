<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MoviePage',
  setup(props, context) {
    console.log(context);
  },
});
</script>

<style lang=""></style>
