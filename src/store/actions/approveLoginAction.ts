import { approveAccessToken, createSession } from '@/api/auth';
import { setCookie } from '@/utils/cookie';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function approveLoginAction(store: ActionContext<AppState, AppState>): Promise<void> {
  store.commit('loginLoading');
  try {
    const responseAccessToken = await approveAccessToken();
    const { access_token } = responseAccessToken.data;
    const sessionResponse = await createSession(access_token);
    const { session_id } = sessionResponse.data;
    store.dispatch('accountDetails', { session_id, access_token });
    setCookie('session_id', session_id);
    setCookie('access_token', access_token);
  } catch (error) {
    store.commit('loginFail', (error as Error).message);
  }
}

export default approveLoginAction;
