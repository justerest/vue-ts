import { ActionContext } from 'vuex';

export type AppActionsTree<S, AT> = {
  [P in keyof AT]: AT[P] extends void
  ? (injectee: ActionContext<S>) => void
  : (injectee: ActionContext<S>, payload: AT[P]) => void;
};
