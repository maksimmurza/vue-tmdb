import { accountDetails } from '@/api/account';
import { ActionContext } from 'vuex';
import { AppState } from '..';

async function accountDetailsAction(
  { commit }: ActionContext<AppState, AppState>,
  { session_id, access_token }: { session_id: string; access_token: string }
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
      iso_639_1,
    } = response.data;
    commit('accountDetailsSuccess', {
      id,
      name,
      username,
      avatar: avatar_path,
      iso_639_1,
      session_id,
      access_token,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default accountDetailsAction;
