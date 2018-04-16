import Vue from 'vue';
import Vuex from 'vuex';

import { ActionTypes } from '@/action-types';
import { AppActionsTree } from '@/actions-tree';
import { MutationTypes } from '@/mutation-types';
import { AppMutationsTree } from '@/mutations-tree';

import { module } from './module';

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
