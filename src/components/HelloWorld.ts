import { Component, Prop, Vue } from 'vue-property-decorator';

import { store } from '@/store';

@Component
export default class HelloWorld extends Vue {

  @Prop({ type: String, required: true })
  msg!: string;

  get count() {
    return store.state.count;
  }

  incr() {
    store.commit('ROOT_INCREMENT', 1);
    store.dispatch('incrementFromTo', 10);
  }

}
