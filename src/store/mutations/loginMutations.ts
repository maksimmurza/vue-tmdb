import { UserInfo } from '@/types/user';
import { AppState } from '../index';

export function loginLoading(state: AppState): void {
  state.user.loading = true;
  state.user.errorMessage = null;
}

export function loginFail(state: AppState, errorMessage: string): void {
  state.user.loading = false;
  state.user.errorMessage = errorMessage;
  state.user.userInfo = null;
}

export function loginSuccess(state: AppState, userInfo: UserInfo): void {
  state.user.errorMessage = null;
  state.user.userInfo = { ...state.user.userInfo, ...userInfo };
}
