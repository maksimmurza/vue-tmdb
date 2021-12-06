<template>
  <n-card :title="actor.name" class="actor-card">
    <template #cover>
      <img :src="actorPhotoSrc" />
    </template>
  </n-card>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { NCard } from 'naive-ui';

export default defineComponent({
  name: 'ActorCard',
  setup(props) {
    const actorPhotoSrc = process.env.VUE_APP_IMG_URL + props.actor.profile_path;

    return { ...toRefs(props), actorPhotoSrc };
  },
  components: { NCard },
  props: {
    actor: Object,
  },
});
</script>

<style lang="scss">
.actor-card {
  min-width: 140px;
}
</style>
