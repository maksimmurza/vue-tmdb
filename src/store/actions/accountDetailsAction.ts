import { accountDetails } from '@/api/account';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function accountDetailsAction(
  { commit }: ActionContext<AppState, AppState>,
  { session_id }: { session_id: string }
): Promise<void> {
  try {
    const response = await accountDetails(session_id);
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
