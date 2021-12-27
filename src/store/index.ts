import { createStore } from 'vuex';
import { UserInfo } from '@/types/user';
import * as loginMutations from './mutations/loginMutations';
import * as logoutMutations from './mutations/logoutMutations';
import * as accountDetailsMutations from './mutations/accountDetailsMutations';
import loginAction from './actions/loginAction';
import logoutAction from './actions/logoutAction';
import accountDetailsAction from './actions/accountDetailsAction';
import approveLoginAction from './actions/approveLoginAction';

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
    ...logoutMutations,
    ...accountDetailsMutations,
  },
  actions: {
    login: loginAction,
    logout: logoutAction,
    approveLogin: approveLoginAction,
    accountDetails: accountDetailsAction,
  },
  modules: {},
});
