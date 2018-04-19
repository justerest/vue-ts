export type AppMutationsTree<S, MT> = {
  [P in keyof MT]: MT[P] extends void
  ? (state: S) => void
  : (state: S, payload: MT[P]) => void;
};
