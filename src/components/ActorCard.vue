<template>
  <n-card :title="actor.name" class="actor-card">
    <template #cover>
      <img v-if="actor.profile_path" :src="actorPhotoSrc" />
      <img v-else src="@/assets/images/personAvatarPlaceholder.jpg" />
    </template>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NCard } from 'naive-ui';
import { Actor } from '../types/credits';

export default defineComponent({
  name: 'ActorCard',
  components: { NCard },
  props: {
    actor: {
      type: Object as PropType<Actor>,
      required: true,
    },
  },
  setup(props) {
    const actorPhotoSrc = process.env.VUE_APP_IMG_URL + props.actor?.profile_path;

    return { actorPhotoSrc };
  },
});
</script>

<style lang="scss">
.actor-card {
  width: 150px;
}
</style>
