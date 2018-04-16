import Vue from 'vue';
import Vuex from 'vuex';

import { ActionTypes } from '@/action-types';
import { AppActionsTree } from '@/actions-tree';
import { MutationTypes } from '@/mutation-types';
import { AppMutationsTree } from '@/mutations-tree';

Vue.use(Vuex);

class ModuleState {
  count = 1;
}

export const module = {

  state: new ModuleState(),

  mutations: {

    MODULE_INCREMENT(state, payload) {
      state.count += payload;
    },

  } as AppMutationsTree<ModuleState, MutationTypes>,

  actions: {

    incrementFromTo({ commit, dispatch }, payload) {
      for (let i = 0; i < payload; i++) {
        commit('ROOT_INCREMENT', i);
      }
    },

  } as AppActionsTree<ModuleState, MutationTypes, ActionTypes>,

};
