import { AppState } from '../index';

export function logoutLoading(state: AppState): void {
  state.user.loading = true;
  state.user.errorMessage = null;
}

export function logoutFail(state: AppState, errorMessage: string): void {
  state.user.loading = false;
  state.user.errorMessage = errorMessage;
}

export function logoutSuccess(state: AppState): void {
  state.user.loading = false;
  state.user.errorMessage = null;
  state.user.userInfo = null;
}
