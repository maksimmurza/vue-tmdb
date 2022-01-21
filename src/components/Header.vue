<template>
  <div class="header">
    <h1 class="header__home-link">
      <router-link :to="'/'"> Vue TMDB </router-link>
    </h1>
    <n-button
      class="header__toggle-menu"
      @click="menuOpened = !menuOpened"
      quaternary
      circle
      color="white"
    >
      <n-icon size="30">
        <menu-outline v-if="!menuOpened"></menu-outline>
        <close-outline v-else></close-outline>
      </n-icon>
    </n-button>
    <div class="header__menu" :style="{ display: !menuOpened && width < 768 ? 'none' : 'grid' }">
      <n-dropdown
        @select="handleSelect"
        :options="item.options"
        :key="item.id"
        trigger="hover"
        placement="bottom-start"
        v-for="item in [
          { id: 0, title: 'Movies', options: moviesDropdownOptions },
          { id: 1, title: 'TV Shows', options: tvShowsDropdownOptions },
          { id: 2, title: 'More', options: moreDropdownOptions },
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
            :options="profileDropdownOptions"
            placement="bottom-end"
          >
            <div class="user-button">
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
      <a v-else @click="login" class style="text-decoration: none; color: inherit; cursor: pointer">
        <h3>Login</h3>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, inject, Ref } from 'vue';
import { useStore } from 'vuex';
import { NDropdown, NButton, NIcon, NAvatar, NSpin } from 'naive-ui';
import { UserAstronaut } from '@vicons/fa';
import {
  moviesDropdownOptions,
  tvShowsDropdownOptions,
  moreDropdownOptions,
  profileDropdownOptions,
} from '../constants';
import { useRouter } from 'vue-router';
import { MenuOutline, CloseOutline } from '@vicons/ionicons5';

export default defineComponent({
  name: 'Header',
  components: {
    NDropdown,
    NButton,
    NIcon,
    NAvatar,
    UserAstronaut,
    NSpin,
    MenuOutline,
    CloseOutline,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const width = inject<Ref<number>>('width');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    watch(width!, (newValue, oldValue) => {
      if (newValue < 768 && oldValue >= 768) {
        menuOpened.value = false;
      }
    });

    const handleSelect = (key: string, option: { label: string; key: string; url: string }) => {
      switch (key) {
        case 'api':
          window.open(option.url, '_blank');
          break;
        case 'about':
          window.open(option.url, '_blank');
          break;
        case 'logout':
          store.dispatch('logout', store.state.user.userInfo?.session_id);
          router.push('/');
          break;
        default:
          router.push(option.url);
      }
    };

    const userAvatarBaseUrl = process.env.VUE_APP_IMG_URL;

    const user = computed(() => store.state.user);

    const menuOpened = ref(false);

    const login = () => {
      store.dispatch('login', { redirect_to: router.currentRoute.value.fullPath });
    };

    return {
      user,
      width,
      menuOpened,
      moviesDropdownOptions,
      tvShowsDropdownOptions,
      moreDropdownOptions,
      profileDropdownOptions,
      userAvatarBaseUrl,
      login,
      handleSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  background-color: #032541;
  color: white;
  padding: 0 10vw;

  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 1rem;
  align-items: center;

  transition: all ease 0.4s;

  &__home-link {
    background: -webkit-linear-gradient(rgb(153, 219, 208), rgb(206, 193, 228));
    background-clip: text;
    white-space: nowrap;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    padding-right: calc(2rem + 3vh);
  }

  &__toggle-menu {
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__menu {
    display: grid;
    grid-template-columns: repeat(3, min-content) 1fr;
    grid-gap: inherit;
    align-items: center;

    transition: inherit;

    & > *:last-child {
      justify-self: right;
    }

    @media (max-width: 768px) {
      grid-column: 1 / 3;
      grid-template-columns: 1fr;
      justify-items: left;
      grid-gap: 0;

      & > *:last-child {
        justify-self: left;
      }
    }

    @media (min-width: 768px) {
      display: grid;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: min-content 1fr;
    grid-gap: 0;

    & > *:nth-child(2) {
      justify-self: right;
    }
  }
}

.user-button {
  display: flex;
  align-items: center;
  cursor: pointer;

  &__user-name {
    margin-left: 1rem;
    white-space: nowrap;
  }
}
</style>
