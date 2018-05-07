import Vue from 'vue';
import Vuex from 'vuex';

import { Card } from '@/Card';
import { MutationTypes, Mutations } from '@/vuex/mutation-types';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';
import { Actions, ActionTypes } from '@/vuex/action-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';

Vue.use(Vuex);

const ONE_SECOND = 1000;

export class RootState {
  cards = getRandomSet();
  score = 0;
  pairsCount = 0;
  isAnimating = false;
  choosen?: {
    name: string,
    index: number,
  };
}

export const store = new Vuex.Store({

  strict: true,
  state: new RootState(),

  mutations: {

    [Mutations.CREATE_DECK](state) {
      Object.assign(state, new RootState());
    },

    [Mutations.OPEN](state, payload) {
      state.cards[payload].isOpen = true;
    },

    [Mutations.CLOSE](state, payload) {
      state.cards[payload].isOpen = false;
    },

    [Mutations.CHOSE](state, cardIndex) {
      state.choosen = {
        index: cardIndex,
        name: state.cards[cardIndex].name,
      };
    },

    [Mutations.UNCHOSE](state) {
      state.choosen = undefined;
    },

    [Mutations.DELETE](state, cardIndex) {
      state.cards[cardIndex].isDeleted = true;
    },

    [Mutations.START_ANIMATION](state) {
      state.isAnimating = true;
    },

    [Mutations.STOP_ANIMATION](state) {
      state.isAnimating = false;
    },

    [Mutations.INCREMENT_PAIRS](state) {
      state.pairsCount++;
    },

    [Mutations.INCREMENT_SCORE](state) {
      state.score += 42 * (state.cards.length / 2 - state.pairsCount);
    },

    [Mutations.DECREMENT_SCORE](state) {
      state.score -= 42 * state.pairsCount;
    },

  } as AppMutationsTree<RootState, MutationTypes>,

  actions: {

    async [Actions.compare]({ state, commit }, cardIndex) {
      commit(Mutations.OPEN, cardIndex);

      if (!state.choosen) {
        commit(Mutations.CHOSE, cardIndex);
      }
      else {
        commit(Mutations.START_ANIMATION);
        await delay(ONE_SECOND);

        if (state.choosen.name === state.cards[cardIndex].name) {
          commit(Mutations.DELETE, state.choosen.index);
          commit(Mutations.DELETE, cardIndex);
          commit(Mutations.INCREMENT_PAIRS);
          commit(Mutations.INCREMENT_SCORE);
        }
        else {
          commit(Mutations.CLOSE, state.choosen.index);
          commit(Mutations.CLOSE, cardIndex);
          commit(Mutations.DECREMENT_SCORE);
        }
        commit(Mutations.UNCHOSE);

        commit(Mutations.STOP_ANIMATION);
      }
    },

  } as AppActionsTree<RootState, ActionTypes>,

});

function getRandomSet(setLength = 9) {
  const set = getCardNames()
    .sort(randomSort)
    .slice(0, setLength);

  return set.concat(set)
    .sort(randomSort)
    .map((cardName) => new Card(cardName));
}

/**
 * @returns ['0', '1', ..., 'A']
 */
function getCardNames() {
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

  return deck;
}

function randomSort() {
  return Math.random() - 0.5;
}

async function delay(timeout: number) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}
