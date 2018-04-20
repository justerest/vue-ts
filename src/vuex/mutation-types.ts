export enum Mutations {
  ROOT_INCREMENT = 'ROOT_INCREMENT',
  ROOT_INCREMENT5 = 'ROOT_INCREMENT5',
  MODULE_INCREMENT = 'MODULE_INCREMENT',
  MODULE_INCREMENT2 = 'MODULE_INCREMENT2',
}

/**
 * @type {{[Mutations]: payloadType}}
 */
export interface MutationTypes {
  [Mutations.ROOT_INCREMENT]: number;
  [Mutations.ROOT_INCREMENT5]: void;
  [Mutations.MODULE_INCREMENT]: number;
  [Mutations.MODULE_INCREMENT2]: void;
}
