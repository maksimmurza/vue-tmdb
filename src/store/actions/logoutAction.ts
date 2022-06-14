import { logoutV3 } from '@/api/auth';
import { deleteCookie } from '@/utils/cookie';
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
    deleteCookie('session_id');
    deleteCookie('access_token');
  } catch (error) {
    commit('logoutFail', (error as Error).message);
  }
}

export default logoutAction;
