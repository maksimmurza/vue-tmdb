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

<script>
import { defineComponent, toRefs } from 'vue';
import { NCard, NIcon } from 'naive-ui';
import { User } from '@vicons/fa';

export default defineComponent({
  name: 'ActorCard',
  setup(props) {
    const actorPhotoSrc = process.env.VUE_APP_IMG_URL + props.actor.profile_path;
    if (props.actor.name === 'Sian Webber') {
      console.log(props.actor.profile_path);
    }

    return { ...toRefs(props), actorPhotoSrc };
  },
  components: { NCard, NIcon, User },
  props: {
    actor: Object,
  },
});
</script>

<style lang="scss">
.actor-card {
  min-width: 140px;
  position: relative;

  &__avatar-icon {
    display: flex;
    justify-content: center;
    padding: 3rem 1rem;
    color: gray;
  }
}
</style>
