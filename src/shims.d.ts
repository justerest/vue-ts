
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vuex' {
  import * as Vuex from '@/../node_modules/vuex';
  export * from '@/../node_modules/vuex';

  import { ActionTypes } from '@/action-types';
  import { MutationTypes } from '@/mutation-types';

  // FIXME: payload is required
  export class Store<S> extends Vuex.Store<S> {

    /** @override check payload type */
    commit: <T extends keyof MutationTypes>
    (type: T, payload: MutationTypes[T], options?: Vuex.CommitOptions) => void;

    /** @override check payload type */
    dispatch: <T extends keyof ActionTypes>
    (type: T, payload: ActionTypes[T], options?: Vuex.DispatchOptions) => Promise<void>;

  }

  const DEFAULT: {
    Store: typeof Store;
    install: typeof Vuex.install;
  };

  export default DEFAULT;
}
