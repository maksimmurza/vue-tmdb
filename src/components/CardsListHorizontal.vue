<template>
  <n-spin :show="loading">
    <n-scrollbar x-scrollable>
      <div class="cards-list">
        <n-alert v-if="error" title="Error occurs" type="warning" class="card-list__error">
          {{ error.message }}
        </n-alert>
        <slot else />
      </div>
    </n-scrollbar>
  </n-spin>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NSpin, NScrollbar, NAlert } from 'naive-ui';

export default defineComponent({
  name: 'CardsListHorizontal',
  components: {
    NSpin,
    NScrollbar,
    NAlert,
  },
  props: {
    loading: Boolean,
    error: Error || null,
    background: String,
  },
  setup(props) {
    const backgroundColor = computed(() => props.background || 'white');

    return {
      backgroundColor,
    };
  },
});
</script>

<style lang="scss">
.cards-list {
  position: relative;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  min-height: 300px;
  background-color: v-bind(backgroundColor);

  & > * {
    margin-right: 1rem;
  }

  &__error {
    width: 100%;
    height: 100%;
    margin: 1rem;
  }
}
</style>
