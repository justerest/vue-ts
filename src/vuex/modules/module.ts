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

    MODULE_INCREMENT(state, payload) {
      state.moduleCount += payload;
    },

  } as AppMutationsTree<ModuleState, MutationTypes>,

  actions: {

    [Actions.incrementFromTo]({ commit, dispatch }, payload) {
      for (let i = 0; i < payload; i++) {
        commit(Mutations.MODULE_INCREMENT, i);
      }
    },

  } as AppActionsTree<ModuleState, MutationTypes, ActionTypes>,

};
