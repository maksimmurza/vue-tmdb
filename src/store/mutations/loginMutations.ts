import { UserInfo } from '@/types/user';
import { AppState } from '../index';

export function loginLoading(state: AppState): void {
  state.user = { ...state.user, loading: true, errorMessage: null };
}

export function loginFail(state: AppState, errorMessage: string): void {
  state.user = { ...state.user, loading: false, errorMessage, userInfo: null };
}

export function loginSuccess(state: AppState, userInfo: UserInfo): void {
  state.user = {
    ...state.user,
    errorMessage: null,
    userInfo: { ...state.user.userInfo, ...userInfo },
  };
}
