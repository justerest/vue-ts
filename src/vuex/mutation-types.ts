export const enum Mutations {
  CREATE_DECK = 'CREATE_DECK',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  CHOSE = 'CHOSE',
  UNCHOSE = 'UNCHOSE',
  DELETE = 'DELETE',
  START_ANIMATION = 'START_ANIMATION',
  STOP_ANIMATION = 'STOP_ANIMATION',
  INCREMENT_PAIRS = 'INCREMENT_PAIRS',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
  DECREMENT_SCORE = 'DECREMENT_SCORE',
}

/**
 * @type {{[Mutations]: payloadType}}
 */
export interface MutationTypes {
  [Mutations.CREATE_DECK]: void;
  [Mutations.OPEN]: number;
  [Mutations.CLOSE]: number;
  [Mutations.CHOSE]: number;
  [Mutations.UNCHOSE]: void;
  [Mutations.DELETE]: number;
  [Mutations.START_ANIMATION]: void;
  [Mutations.STOP_ANIMATION]: void;
  [Mutations.INCREMENT_PAIRS]: void;
  [Mutations.INCREMENT_SCORE]: void;
  [Mutations.DECREMENT_SCORE]: void;
}
