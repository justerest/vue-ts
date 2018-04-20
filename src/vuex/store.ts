import Vue from 'vue';
import Vuex from 'vuex';

import { ActionTypes, Actions } from '@/vuex/action-types';
import { MutationTypes, Mutations } from '@/vuex/mutation-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';

import { module } from './modules/module';

Vue.use(Vuex);

class RootState {
  count = 0;
}

export const store = new Vuex.Store({

  strict: true,

  state: new RootState(),

  modules: { module },

  mutations: {

    [Mutations.ROOT_INCREMENT](state, payload) {
      state.count += payload;
    },

    [Mutations.ROOT_INCREMENT5](state) {
      state.count += 5;
    },

  } as AppMutationsTree<RootState, MutationTypes>,

  actions: {

    [Actions.actionWithoutPayload]({ commit }) {
      commit(Mutations.ROOT_INCREMENT5, undefined);
    },

  } as AppActionsTree<RootState, MutationTypes, ActionTypes>,

});

store.dispatch(Actions.incrementFromTo, 2);
store.commit(Mutations.ROOT_INCREMENT, 2);
