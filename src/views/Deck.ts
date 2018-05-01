import { Component, Vue } from 'vue-property-decorator';

import Card from '@/components/Card';
import { Mutations } from '@/vuex/mutation-types';
import { store } from '@/vuex/store';

const FIVE_SECONDS = 5000;

@Component({
  components: { Card },
})
export default class Deck extends Vue {

  isDisabled = true;
  timeoutContainer!: NodeJS.Timer;

  get cards() {
    return store.state.cards;
  }

  get score() {
    return store.state.score;
  }

  created() {
    store.commit(Mutations.CREATE_DECK, undefined);
    this.timeoutContainer = setTimeout(() => {
      this.isDisabled = false;
      this.cards.forEach((_, i) => store.commit(Mutations.FLIP_CARD, i));
    }, FIVE_SECONDS);
  }

  destroyed() {
    clearTimeout(this.timeoutContainer);
  }

}
