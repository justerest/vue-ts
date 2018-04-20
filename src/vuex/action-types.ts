export enum Actions {
  incrementAllModules = 'incrementAllModules',
  actionWithoutPayload = 'actionWithoutPayload',
}

/**
 * @type {{[Actions]: payloadType}}
 */
export interface ActionTypes {
  [Actions.incrementAllModules]: number;
  [Actions.actionWithoutPayload]: void;
}
