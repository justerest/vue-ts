import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';

Vue.use(Vuex);

class ModuleState {
  count = 1;
}

export interface ModuleMutationTypes {
  MODULE_INCREMENT2: void;
}

export const module = {
  state: new ModuleState(),
  mutations: {

    MODULE_INCREMENT2(state) {
      state.count += 2;
    },

  } as AppMutationsTree<ModuleState, ModuleMutationTypes>,
};
