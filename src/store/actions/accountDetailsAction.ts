import { accountDetails } from '@/api/account';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function accountDetailsAction(
  { commit }: ActionContext<AppState, AppState>,
  { sessionId }: { sessionId: string }
): Promise<void> {
  try {
    const response = await accountDetails(sessionId);
    const {
      id,
      name,
      username,
      avatar: {
        tmdb: { avatar_path },
      },
    } = response.data;
    commit('accountDetailsSuccess', { id, name, username, avatar: avatar_path });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default accountDetailsAction;
