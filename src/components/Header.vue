<template>
  <div class="header">
    <h1 class="header__home-link">
      <router-link :to="'/'"> Vue TMDB </router-link>
    </h1>
    <n-dropdown
      @select="handleSelect"
      :options="item.options"
      :key="item.id"
      trigger="hover"
      placement="bottom-start"
      v-for="item in [
        { id: 0, title: 'Movies', options: moviesDropdownOptions },
        { id: 1, title: 'TV Shows', options: tvShowsDropdownOptions },
        { id: 2, title: 'More', options: moreShowsDropdownOptionsClickable },
      ]"
    >
      <n-button text color="white">
        <h3>{{ item.title }}</h3>
      </n-button>
    </n-dropdown>
    <div v-if="user.userInfo">
      <n-spin :show="user.loading">
        <n-dropdown
          trigger="click"
          @select="handleSelect"
          :options="profileDropdownOptionsClickable"
          placement="bottom-end"
        >
          <div class="header__user-button user-button">
            <n-avatar
              v-if="user.userInfo.avatar"
              :src="userAvatarBaseUrl + user.userInfo.avatar"
              :style="{ minWidth: 'fit-content' }"
            />
            <n-avatar v-else :style="{ color: 'gray', backgroundColor: 'white' }">
              <n-icon size="30">
                <user-astronaut />
              </n-icon>
            </n-avatar>
            <h3 class="user-button__user-name">{{ user.userInfo.name }}</h3>
          </div>
        </n-dropdown>
      </n-spin>
    </div>
    <div v-else>
      <router-link :to="'/login'" style="text-decoration: none; color: inherit">
        <h3>Login</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { NDropdown, NButton, NIcon, NAvatar, NSpin } from 'naive-ui';
import { UserAstronaut } from '@vicons/fa';
import router from '../router';
import {
  moviesDropdownOptions,
  tvShowsDropdownOptions,
  moreShowsDropdownOptions,
  profileDropdownOptions,
} from '../constants';

export default defineComponent({
  name: 'Header',
  components: { NDropdown, NButton, NIcon, NAvatar, UserAstronaut, NSpin },
  setup() {
    const store = useStore();

    const userAvatarBaseUrl = process.env.VUE_APP_AVATAR_IMG_URL;

    const user = computed(() => store.state.user);

    [moviesDropdownOptions, tvShowsDropdownOptions].forEach(options =>
      options.map(
        option =>
          (option.props = {
            onClick: () => {
              router.push(option.url);
            },
          })
      )
    );

    const moreShowsDropdownOptionsClickable = computed(() =>
      moreShowsDropdownOptions.map(option => ({
        ...option,
        props: {
          onClick: () => {
            console.log(window);
            window.open(option.url, '_blank');
          },
        },
      }))
    );

    const profileDropdownOptionsClickable = computed(() =>
      profileDropdownOptions.map(option =>
        option.key === 'logout'
          ? {
              ...option,
              props: {
                onClick: () => {
                  store.dispatch('logout', store.state.user.userInfo?.sessionId);
                },
              },
            }
          : option
      )
    );

    return {
      moviesDropdownOptions,
      tvShowsDropdownOptions,
      userAvatarBaseUrl,
      moreShowsDropdownOptionsClickable,
      profileDropdownOptionsClickable,
      user,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  z-index: 5;
  position: relative;
  background-color: #032541;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10vw;

  & > * {
    color: white;
    margin-right: 2rem;
  }

  & > *:last-child {
    margin-right: 0;
    margin-left: auto;
    cursor: pointer;
  }

  &__home-link {
    background: -webkit-linear-gradient(rgb(153, 219, 208), rgb(206, 193, 228));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    margin-right: calc(2rem + 3vh);
  }
}

.user-button {
  display: flex;
  align-items: center;

  &__user-name {
    margin-left: 1rem;
  }
}
</style>
