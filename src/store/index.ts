import { createStore } from 'vuex';

interface User {
  name: string;
  username?: string;
  request_token?: string;
}

interface AppState {
  user: User | null;
}

export default createStore<AppState>({
  state: {
    user: null,
  },
  mutations: {
    login(state, { username, password }) {
      state.user = { name: 'Name' };
      console.log(username);
      console.log(password);
    },
  },
  actions: {},
  modules: {},
});
