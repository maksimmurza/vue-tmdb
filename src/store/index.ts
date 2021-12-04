import { createStore } from 'vuex';
import { UserInfo } from '@/types'
import * as loginMutations from './mutations/loginMutations'
import * as accountDetailsMutations from './mutations/accountDetailsMutations'
import loginAction from './actions/loginAction';
import accountDetailsAction from './actions/accountDetailsAction';

export interface AppState {
  user: {
    loading: boolean;
    errorMessage: string | null;
    userInfo: UserInfo | null;
  };
}

export default createStore<AppState>({
  state: {
    user: {
      loading: false,
      errorMessage: null,
      userInfo: null,
    },
  },
  mutations: {
    ...loginMutations,
    ...accountDetailsMutations,
  },
  actions: {
    login: loginAction,
    accountDetails: accountDetailsAction,
  },
  modules: {},
});
