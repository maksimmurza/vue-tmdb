<template>
  <n-card :title="actor.name" class="actor-card">
    <template #cover>
      <img v-if="actor.profile_path" :src="actorPhotoSrc" />
      <div v-else class="actor-card__avatar-icon">
        <n-icon size="120">
          <user />
        </n-icon>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NCard, NIcon } from 'naive-ui';
import { User } from '@vicons/fa';
import { Actor } from '../types/credits';

export default defineComponent({
  name: 'ActorCard',
  components: { NCard, NIcon, User },
  props: {
    actor: Object as PropType<Actor>,
  },
  setup(props) {
    const actorPhotoSrc = process.env.VUE_APP_IMG_URL + props.actor?.profile_path;

    return { actorPhotoSrc };
  },
});
</script>

<style lang="scss">
.actor-card {
  min-width: 150px;
  max-width: 150px;
  position: relative;

  &__avatar-icon {
    display: flex;
    justify-content: center;
    padding: 3rem 1rem;
    color: gray;
  }
}
</style>
