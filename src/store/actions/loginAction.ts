import { login } from "@/api/auth";
import { ActionContext } from "vuex";
import { AppState } from "..";

async function loginAction({ commit, dispatch }: ActionContext<AppState, AppState>, { username, password }: { username: string, password: string }): Promise<void> {
  commit('loginLoading');
  try {
    const sessionId = await login(username, password);
    await dispatch('accountDetails', { sessionId });
    commit('loginSuccess', {sessionId});
  } catch (error) {
    commit('loginFail', {errorMessage: error.message});
  }
}

export default loginAction;