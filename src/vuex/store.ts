import Vue from 'vue';
import Vuex from 'vuex';

import { ActionTypes } from '@/vuex/action-types';
import { MutationTypes } from '@/vuex/mutation-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';

import { module } from './modules/module';

Vue.use(Vuex);

class RootState {
  count = 0;
}

export const store = new Vuex.Store({

  state: new RootState(),
  modules: { module },

  mutations: {

    ROOT_INCREMENT(state, payload) {
      state.count += payload;
    },

    ROOT_INCREMENT5(state) {
      state.count += 5;
    },

  } as AppMutationsTree<RootState, MutationTypes>,

});

store.dispatch('incrementFromTo', 2);
store.commit('ROOT_INCREMENT', 2);
