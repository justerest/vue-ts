import Vue from 'vue';
import Vuex from 'vuex';

import { Card } from '@/Card';
import { MutationTypes, Mutations } from '@/vuex/mutation-types';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';
import { Actions, ActionTypes } from '@/vuex/action-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';

Vue.use(Vuex);

const DELAY = 1000;

export class RootState {
  cards = getRandomSet();
  choosen?: {
    name: string,
    index: number,
  };
  isAnimated = false;
  pairs = 0;
  score = 0;
}

export const store = new Vuex.Store({

  strict: true,
  state: new RootState(),

  mutations: {

    [Mutations.CREATE_DECK]: (state) => Object.assign(state, new RootState()),

    [Mutations.FLIP_CARD]: (state, payload) => {
      const card = state.cards[payload];
      card.isOpen = !card.isOpen;
    },

    [Mutations.CHOSE]: (state, payload) => {
      const card = state.cards[payload];
      state.choosen = { index: payload, name: card.name };
    },

    [Mutations.UNCHOSE]: (state) => {
      state.choosen = undefined;
    },

    [Mutations.DELETE]: (state, payload) => {
      const card = state.cards[payload];
      card.isDeleted = true;
    },

    [Mutations.TOGGLE_ANIMATION]: (state) => {
      state.isAnimated = !state.isAnimated;
    },

    [Mutations.INCREMENT_PAIRS]: (state) => {
      state.pairs++;
    },

    [Mutations.INCREMENT_SCORE]: (state, payload) => {
      state.score += payload;
    },

  } as AppMutationsTree<RootState, MutationTypes>,

  actions: {

    async [Actions.compare]({ state, commit }, payload) {
      if (
        state.isAnimated ||
        state.choosen && state.choosen.index === payload
      ) return;

      commit(Mutations.FLIP_CARD, payload);

      if (state.choosen) {
        const oldIndex = state.choosen.index;

        commit(Mutations.TOGGLE_ANIMATION, undefined);
        await new Promise((resolve) => setTimeout(resolve, DELAY));

        if (state.choosen.name === state.cards[payload].name) {
          commit(Mutations.DELETE, oldIndex);
          commit(Mutations.DELETE, payload);
          commit(Mutations.INCREMENT_PAIRS, undefined);
          commit(Mutations.INCREMENT_SCORE, 42 * (state.cards.length / 2 - state.pairs));
        }
        else {
          commit(Mutations.FLIP_CARD, oldIndex);
          commit(Mutations.FLIP_CARD, payload);
          commit(Mutations.INCREMENT_SCORE, -42 * state.pairs);
        }

        commit(Mutations.TOGGLE_ANIMATION, undefined);
        commit(Mutations.UNCHOSE, undefined);
      }
      else commit(Mutations.CHOSE, payload);
    },

  } as AppActionsTree<RootState, ActionTypes>,

});

function getDeck() {
  const deck = [];
  const values = [];
  const suits = ['C', 'D', 'H', 'S'];

  for (let i = 0; i < 10; i++) {
    if (i !== 1) values.push(i);
  }
  values.push('J', 'Q', 'K', 'A');

  for (const value of values) {
    for (const suit of suits) {
      deck.push(value + suit);
    }
  }

  return deck.map((cardName) => new Card(cardName));
}

function getRandomSet() {
  const set = getDeck().sort(() => Math.random() - 0.5).slice(0, 9);
  const doubleSet = set.map((card) => new Card(card.name)).concat(set);
  return doubleSet.sort(() => Math.random() - 0.5);
}
