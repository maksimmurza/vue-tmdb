<template>
  <div class="header">
    <h1>Vue TMDB</h1>
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
    <div class="avatar">
      <n-avatar :style="{ color: 'gray', backgroundColor: 'white' }">
        <n-icon size="30">
          <user-astronaut />
        </n-icon>
      </n-avatar>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { NDropdown, NButton, NIcon, NAvatar } from 'naive-ui';
import { UserAstronaut } from '@vicons/fa';

export default defineComponent({
  setup(props) {
    const moviesDropdownOptions = [
      { label: 'Popular', key: 'popular' },
      { label: 'Now playing', key: 'now playing' },
      { label: 'Upcoming', key: 'upcoming' },
      { label: 'Top Rated', key: 'top rated' },
    ];

    const tvShowsDropdownOptions = [
      { label: 'Popular', key: 'popular' },
      { label: 'Airing Today', key: 'airing today' },
      { label: 'On TV', key: 'on tv' },
      { label: 'Top Rated', key: 'top rated' },
    ];

    const moreShowsDropdownOptions = [
      { label: 'About', key: 'about' },
      { label: 'API', key: 'api' },
    ];

    return { moviesDropdownOptions, tvShowsDropdownOptions, moreShowsDropdownOptions };
  },
  components: { NDropdown, NButton, NIcon, NAvatar, UserAstronaut },
});
</script>

<style lang="scss">
.header {
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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  margin-right: calc(2rem + 3vh);
}

.avatar {
  margin-right: 0;
  margin-left: auto;
}
</style>
