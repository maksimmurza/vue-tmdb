import { logoutV3 } from '@/api/auth';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function logoutAction(
  { commit }: ActionContext<AppState, AppState>,
  session_id: string
): Promise<void> {
  commit('logoutLoading');
  try {
    const response = await logoutV3(session_id);
    const { success } = response.data;
    if (success) {
      commit('logoutSuccess');
    }
  } catch (error) {
    commit('logoutFail', (error as Error).message);
  }
}

export default logoutAction;
