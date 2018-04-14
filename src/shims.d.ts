declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare type AppMutationsTree<S, T> = {
  [P in keyof T]: (state: S, payload: T[P]) => void
};
