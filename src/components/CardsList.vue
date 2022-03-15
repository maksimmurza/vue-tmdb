<template>
  <div
    class="container"
    ref="container"
    :class="{
      singleRow: listLength < 4 && listLength * 250 < containerWidth,
      singleColumn: containerWidth < 450,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref } from 'vue';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'CardsList',
  setup() {
    const container = ref<Ref | null>(null);
    const containerWidth = ref<number>();
    const getNewContainerWidth = debounce(() => {
      containerWidth.value = container?.value?.clientWidth;
    }, 50);

    onMounted(() => {
      getNewContainerWidth();
      window.addEventListener('resize', getNewContainerWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', getNewContainerWidth);
    });

    const listLength = computed(() => (container.value ? container?.value.childElementCount : 0));

    return {
      container,
      containerWidth,
      listLength,
    };
  },
});
</script>

<style lang="scss">
.container {
  width: 100%;
  display: grid;

  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

  & > * {
    max-width: 250px;
    justify-self: center;
  }
}

.singleRow {
  width: 100%;
  display: flex;

  & > * {
    max-width: 250px;
    min-width: 180px;
  }
}

.singleColumn {
  grid-template-columns: 1fr;

  & > * {
    max-width: 350px;
  }
}
</style>
