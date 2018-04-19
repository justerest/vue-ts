import { Store } from 'vuex';

export type AppActionsTree<S, MT, AT> = {
  [P in keyof AT]: AT[P] extends void
  ? (injectee: ActionContext<S>) => void
  : (injectee: ActionContext<S>, payload: AT[P]) => void;
};

interface ActionContext<S> {
  dispatch: Store<S>['dispatch'];
  commit: Store<S>['commit'];
  state: S;
}
