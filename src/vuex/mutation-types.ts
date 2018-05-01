export enum Mutations {
  CREATE_DECK = 'CREATE_DECK',
  FLIP_CARD = 'FLIP_CARD',
  CHOSE = 'CHOSE',
  UNCHOSE = 'UNCHOSE',
  DELETE = 'DELETE',
  TOGGLE_ANIMATION = 'TOGGLE_ANIMATION',
  INCREMENT_PAIRS = 'INCREMENT_PAIRS',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
}

/**
 * @type {{[Mutations]: payloadType}}
 */
export interface MutationTypes {
  [Mutations.CREATE_DECK]: void;
  [Mutations.FLIP_CARD]: number;
  [Mutations.CHOSE]: number;
  [Mutations.UNCHOSE]: void;
  [Mutations.DELETE]: number;
  [Mutations.TOGGLE_ANIMATION]: void;
  [Mutations.INCREMENT_PAIRS]: void;
  [Mutations.INCREMENT_SCORE]: number;
}
