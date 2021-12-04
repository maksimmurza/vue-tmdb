<template>
  <div class="header">
    <h1 class="header-home-link">
      <router-link :to="'/'"> Vue TMDB </router-link>
    </h1>
    <n-dropdown
      @select="handleSelect"
      trigger="hover"
      :options="moviesDropdownOptions"
      placement="bottom-start"
    >
      <n-button text color="white">
        <h3>Movies</h3>
      </n-button>
    </n-dropdown>
    <n-dropdown
      @select="handleSelect"
      trigger="hover"
      :options="tvShowsDropdownOptions"
      placement="bottom-start"
    >
      <n-button text color="white"> <h3>TV Shows</h3> </n-button>
    </n-dropdown>
    <n-dropdown
      @select="handleSelect"
      trigger="hover"
      :options="moreShowsDropdownOptions"
      placement="bottom-start"
    >
      <n-button text color="white"> <h3>More</h3> </n-button>
    </n-dropdown>
    <div v-if="store.state.user.userInfo" class="user-button-container">
      <n-dropdown
        trigger="click"
        @select="handleSelect"
        :options="profileDropdownOptions"
        placement="bottom-end"
      >
        <div class="user-button">
          <n-avatar :style="{ color: 'gray', backgroundColor: 'white' }">
            <n-icon size="30">
              <user-astronaut />
            </n-icon>
          </n-avatar>
          <h3 class="user-name">{{ store.state.user.userInfo.name }}</h3>
        </div>
      </n-dropdown>
    </div>
    <div v-else class="login-button">
      <router-link :to="'/login'" style="text-decoration: none; color: inherit">
        <h3>Login</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { NDropdown, NButton, NIcon, NAvatar } from 'naive-ui';
import { UserAstronaut } from '@vicons/fa';
import {
  moviesDropdownOptions,
  tvShowsDropdownOptions,
  moreShowsDropdownOptions,
  profileDropdownOptions,
} from '../constants';

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore();

    return {
      moviesDropdownOptions,
      tvShowsDropdownOptions,
      moreShowsDropdownOptions,
      profileDropdownOptions,
      store,
    };
  },
  components: { NDropdown, NButton, NIcon, NAvatar, UserAstronaut },
});
</script>

<style lang="scss">
.header {
  z-index: 5;
  position: relative;
  background-color: #032541;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10vw 0 10vw;
}

.header > * {
  color: white;
  margin-right: 2rem;
}

.header > h1 {
  background: -webkit-linear-gradient(rgb(153, 219, 208), rgb(206, 193, 228));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  margin-right: calc(2rem + 3vh);
}

.user-button-container {
  margin-right: 0;
  margin-left: auto;
  cursor: pointer;
}

.user-button {
  display: flex;
  align-items: center;

  & > .user-name {
    margin-left: 1rem;
  }
}

.login-button {
  margin-right: 0;
  margin-left: auto;
  cursor: pointer;
}
</style>
