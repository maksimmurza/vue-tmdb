import { UserInfo } from '@/types';
import { AppState } from '../index'

export function accountDetailsLoading(state: AppState): void {
  state.user = { ...state.user, loading: true, errorMessage: null };
};

export function accountDetailsFail(state: AppState, errorMessage: string): void {
  state.user = { ...state.user, loading: false, errorMessage };
};

export function accountDetailsSuccess(state: AppState, userInfo: UserInfo): void {
  state.user = { ...state.user, loading: false, errorMessage: null, userInfo: {...state.user.userInfo, ...userInfo} };
};