import { UserInfo } from '@/types/user';
import { AppState } from '../index';

export function accountDetailsLoading(state: AppState): void {
  state.user.loading = true;
  state.user.errorMessage = null;
}

export function accountDetailsFail(state: AppState, errorMessage: string): void {
  state.user.loading = false;
  state.user.errorMessage = errorMessage;
}

export function accountDetailsSuccess(state: AppState, userInfo: UserInfo): void {
  state.user.loading = false;
  state.user.errorMessage = null;
  state.user.userInfo = { ...state.user.userInfo, ...userInfo };
}
