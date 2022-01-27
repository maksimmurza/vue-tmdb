<template>
  <n-collapse :default-expanded-names="['0']">
    <n-collapse-item title="Sort" name="0">
      <div>Sort results By</div>
      <n-select
        :value="filters.sortValue"
        :on-update:value="sortValue => $emit('update:filters', { ...filters, sortValue })"
        :options="filters.sortOptions"
      />
    </n-collapse-item>
    <n-collapse-item title="Filters" name="1">
      <div class="filter">
        <div>Release Dates</div>
        <n-date-picker
          :value="filters.releaseDateGteValue"
          :on-update:value="
            releaseDateGteValue => $emit('update:filters', { ...filters, releaseDateGteValue })
          "
          type="date"
        />
        <n-date-picker
          :value="filters.releaseDateLteValue"
          :on-update:value="
            releaseDateLteValue => $emit('update:filters', { ...filters, releaseDateLteValue })
          "
          type="date"
        />
      </div>
      <n-divider></n-divider>
      <div class="filter">
        <div>Genres</div>
        <n-checkbox-group
          v-if="filters.genresOptions"
          :value="filters.genresValue"
          :on-update:value="genresValue => $emit('update:filters', { ...filters, genresValue })"
        >
          <n-checkbox
            v-for="genre in filters.genresOptions"
            :genre="genre"
            :key="genre.id"
            :value="genre.id"
            :label="genre.name"
            class="genre"
          />
        </n-checkbox-group>
      </div>
      <n-divider></n-divider>
      <div class="filter">
        <div>User Score</div>
        <n-slider
          :value="filters.scoreValue"
          :on-update:value="scoreValue => $emit('update:filters', { ...filters, scoreValue })"
          range
          :marks="scoreMarks"
        />
      </div>
      <n-divider></n-divider>
      <div class="filter">
        <div>Minimum User Votes</div>
        <n-slider
          :value="filters.votesValue"
          :on-update:value="votesValue => $emit('update:filters', { ...filters, votesValue })"
          :max="5000"
        />
      </div>
      <n-divider></n-divider>
    </n-collapse-item>
  </n-collapse>
  <n-button
    @click="$emit('search')"
    strong
    round
    type="info"
    size="large"
    block
    :style="{
      marginTop: '1rem',
    }"
    >Search</n-button
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NSelect,
  NCheckbox,
  NDatePicker,
  NSlider,
  NCheckboxGroup,
} from 'naive-ui';
import { scoreMarks } from '@/constants';

export default defineComponent({
  name: 'FormFilterMovies',
  components: {
    NButton,
    NCollapse,
    NCollapseItem,
    NCheckbox,
    NCheckboxGroup,
    NDivider,
    NSelect,
    NDatePicker,
    NSlider,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  emits: ['search', 'update:filters'],
  setup() {
    return {
      scoreMarks,
    };
  },
});
</script>

<style lang="scss">
.filter {
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
}
</style>
