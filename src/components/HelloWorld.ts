import { Component, Prop, Vue } from 'vue-property-decorator';

import { Actions } from '@/vuex/action-types';
import { Mutations } from '@/vuex/mutation-types';
import { store } from '@/vuex/store';

@Component
export default class HelloWorld extends Vue {

  @Prop({ type: String, required: true })
  msg!: string;

  get count() {
    return store.state.count;
  }

  incr() {
    store.commit(Mutations.ROOT_INCREMENT, 1);
    store.dispatch(Actions.incrementFromTo, 10);
  }

}
