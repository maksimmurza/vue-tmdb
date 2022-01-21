<template>
  <div class="footer">
    <n-icon size="30">
      <logo-github />
    </n-icon>
    <a class="footer__link" href="https://github.com/maksimmurza/vue-tmdb" target="_blank">
      maksimmurza/vue-tmdb
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NIcon } from 'naive-ui';
import { LogoGithub } from '@vicons/ionicons5';
export default defineComponent({
  name: 'Footer',
  components: {
    LogoGithub,
    NIcon,
  },
});
</script>

<style lang="scss">
.footer {
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #032541;
  margin-top: auto;
  gap: 1rem;
  padding: 1rem 0;

  &__link {
    font-size: 1rem;
    text-decoration: none;
    color: inherit;
    font-weight: 600;
  }
}
</style>
