import { Component, Vue } from 'vue-property-decorator';

import Card from '@/components/Card';
import { Mutations } from '@/vuex/mutation-types';
import { store } from '@/vuex/store';

const FIVE_SECONDS = 5000;

@Component({
  components: { Card },
})
export default class Deck extends Vue {

  get isGameStarted() {
    return store.state.isGameStarted;
  }

  get cards() {
    return store.state.cards;
  }

  get score() {
    return store.state.score;
  }

  created() {
    if (!this.isGameStarted) {
      store.commit(Mutations.START_GAME);
      setTimeout(() => {
        this.cards.forEach((_, i) => store.commit(Mutations.CLOSE, i));
      }, FIVE_SECONDS);
    }
  }

}
