import { accountDetails } from "@/api/account";
import { ActionContext } from "vuex";
import { AppState } from "..";

async function accountDetailsAction({ commit }: ActionContext<AppState, AppState>, { sessionId }: {sessionId: string}): Promise<void> {
  try {
    const response = await accountDetails(sessionId);
    const { name, username } = response.data;
    commit('accountDetailsSuccess', {name, username});
  } catch (error) {
    throw new Error(error);
  }
}

export default accountDetailsAction;