import Vue from 'vue';
import Vuex from 'vuex';

import { Card } from '@/models/Card';
import { ActionTypes, Actions } from '@/vuex/action-types';
import { MutationTypes, Mutations } from '@/vuex/mutation-types';
import { AppActionsTree } from '@/vuex/type-helpers/actions-tree';
import { AppMutationsTree } from '@/vuex/type-helpers/mutations-tree';

Vue.use(Vuex);

const ONE_SECOND = 1000;

export class RootState {
  cards = getRandomSet();
  isAnimating = false;
  isGameStarted = false;
  pairsCount = 0;
  score = 0;
  choosen?: {
    name: string,
    index: number,
  };
}

export const store = new Vuex.Store({

  strict: true,
  state: new RootState(),

  mutations: {

    [Mutations.START_GAME](state) {
      state.isGameStarted = true;
    },

    [Mutations.OPEN](state, cardIndex) {
      state.cards[cardIndex].isOpen = true;
    },

    [Mutations.CLOSE](state, cardIndex) {
      state.cards[cardIndex].isOpen = false;
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

    [Mutations.RESET](state) {
      Object.assign(state, new RootState());
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

        const isCompared = (
          state.choosen.name === state.cards[cardIndex].name &&
          state.choosen.index !== cardIndex
        );
        if (isCompared) {
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
 * @returns ['2C', '2D', ..., 'AS']
 */
function getCardNames() {
  const deck = [];

  const values = [];
  for (let i = 2; i <= 10; i++) {
    values.push(i % 10);
  }
  values.push('J', 'Q', 'K', 'A');

  const suits = ['C', 'D', 'H', 'S'];
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
