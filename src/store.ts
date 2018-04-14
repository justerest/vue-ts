import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';

import { module, ModuleMutationTypes } from './module';

Vue.use(Vuex);

class RootState {
  count = 1;
}

interface RootMutationTypes {
  ROOT_INCREMENT: number;
}

type AllMutations = RootMutationTypes & ModuleMutationTypes;

/** Root mutations  */
export function commit<T extends keyof AllMutations>(type: T, payload: AllMutations[T]) {
  store.commit(type, payload);
}

export const store = new Vuex.Store({
  state: new RootState(),
  modules: { module },
  mutations: {

    ROOT_INCREMENT(state, payload) {
      state.count += payload;
    },

  } as AppMutationsTree<RootState, RootMutationTypes>,
});
