import { Component, Prop, Vue } from 'vue-property-decorator';

import { commit, store } from '@/store';

@Component
export default class HelloWorld extends Vue {

  @Prop({ type: String, required: true })
  msg!: string;

  get count() {
    return store.state.count;
  }

  incr() {
    commit('MODULE_INCREMENT2', undefined);
  }

}
