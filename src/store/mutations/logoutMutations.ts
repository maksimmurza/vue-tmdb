import { AppState } from '../index';

export function logoutLoading(state: AppState): void {
  state.user = { ...state.user, loading: true, errorMessage: null };
}

export function logoutFail(state: AppState, errorMessage: string): void {
  state.user = { ...state.user, loading: false, errorMessage };
}

export function logoutSuccess(state: AppState): void {
  state.user = { ...state.user, loading: false, errorMessage: null, userInfo: null };
}
