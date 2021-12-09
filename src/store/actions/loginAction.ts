import { login } from '@/api/auth';
import router from '@/router';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function loginAction(
  { commit, dispatch }: ActionContext<AppState, AppState>,
  { username, password }: { username: string; password: string }
): Promise<void> {
  commit('loginLoading');
  try {
    const response = await login(username, password);
    const { session_id: sessionId } = response.data;
    await dispatch('accountDetails', { sessionId });
    commit('loginSuccess', { sessionId });
    router.go(-1);
  } catch (error) {
    commit('loginFail', (error as Error).message);
  }
}

export default loginAction;
