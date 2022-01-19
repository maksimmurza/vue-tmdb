<template>
  <div class="container" ref="container" :class="{ singleColumn: containerWidth < 450 }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'CardsList',
  setup() {
    const container = ref<Ref | null>(null);
    const containerWidth = ref();

    onMounted(() => {
      window.onresize = debounce(() => {
        containerWidth.value = container?.value?.clientWidth;
      }, 50);
    });

    return {
      container,
      containerWidth,
    };
  },
});
</script>

<style lang="scss">
.container {
  contain: layout inline-size;
  width: 100%;
  display: grid;

  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

  & > * {
    max-width: 250px;
    justify-self: center;
  }
}

.singleColumn {
  grid-template-columns: 1fr;

  & > * {
    max-width: 350px;
  }
}
</style>
