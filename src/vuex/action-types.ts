export enum Actions {
  incrementFromTo = 'incrementFromTo',
  actionWithoutPayload = 'actionWithoutPayload',
}

/**
 * @type {{[Actions]: payloadType}}
 */
export interface ActionTypes {
  [Actions.incrementFromTo]: number;
  [Actions.actionWithoutPayload]: void;
}
