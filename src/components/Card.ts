import { Component, Prop, Vue } from 'vue-property-decorator';

import { Actions } from '@/vuex/action-types';
import { store } from '@/vuex/store';

@Component
export default class CardComponent extends Vue {

  @Prop({ type: Number, required: true })
  index!: number;

  get card() {
    return store.state.cards[this.index];
  }

  get link() {
    const name = this.card.isOpen ? this.card.name : 'suit';
    return `/cards/${name}.png`;
  }

  get isAnimating() {
    return store.state.isAnimating;
  }

  open() {
    if (!this.isAnimating && !this.card.isOpen) {
      store.dispatch(Actions.compare, this.index);
    }
  }

}
