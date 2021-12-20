import { logout } from '@/api/auth';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function logoutAction(
  { commit }: ActionContext<AppState, AppState>,
  sessionId: string
): Promise<void> {
  commit('logoutLoading');
  try {
    const response = await logout(sessionId);
    const { success } = response.data;
    if (success) {
      commit('logoutSuccess');
    }
  } catch (error) {
    commit('logoutFail', (error as Error).message);
  }
}

export default logoutAction;
