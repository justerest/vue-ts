import Vue from 'vue';
import Vuex from 'vuex';

import { ActionTypes, Actions } from '@/vuex/action-types';
import { MutationTypes, Mutations } from '@/vuex/mutation-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';

Vue.use(Vuex);

class ModuleState {
  moduleCount = 1;
}

export const module = {

  state: new ModuleState(),

  mutations: {

    [Mutations.MODULE_INCREMENT](state, payload) {
      state.moduleCount += payload;
    },

  } as AppMutationsTree<ModuleState, MutationTypes>,

  actions: {

    [Actions.incrementAllModules]({ commit, state, rootState }, payload) {
      if (state.moduleCount) commit(Mutations.MODULE_INCREMENT, payload);
      if (rootState.count) commit(Mutations.ROOT_INCREMENT, payload);
    },

  } as AppActionsTree<ModuleState, MutationTypes, ActionTypes>,

};
