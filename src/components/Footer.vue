<template>
  <div class="footer">
    <h3>
      <a
        :style="{
          color: 'white',
        }"
        href="https://github.com/maksimmurza/vue-tmdb"
        >github.com/maksimmurza/vue-tmdb
      </a>
    </h3>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Footer',
});
</script>

<style lang="scss">
.footer {
  z-index: 5;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #032541;
  margin-top: auto;
}
</style>
