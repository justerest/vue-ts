export enum Actions {
  compare = 'compare',
}

/**
 * @type {{[Actions]: payloadType}}
 */
export interface ActionTypes {
  [Actions.compare]: number;
}
