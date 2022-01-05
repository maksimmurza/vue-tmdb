import { loginV4 } from '@/api/auth';
import { RequestTokenResponse } from '@/types/fetching';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function loginAction(
  { commit }: ActionContext<AppState, AppState>,
  { redirect_to }: { redirect_to: string }
): Promise<void> {
  commit('loginLoading');
  try {
    const response = await loginV4(redirect_to);
    const { request_token } = response.data as RequestTokenResponse;
    commit('loginSuccess', { request_token });
  } catch (error) {
    commit('loginFail', (error as Error).message);
  }
}

export default loginAction;
