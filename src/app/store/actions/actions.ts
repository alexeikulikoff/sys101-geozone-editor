
import { Action, createAction, props } from '@ngrx/store';
import { Layer, Point } from 'src/app/data/models';

export enum ActionTypes {
  TOGGLE_EDIT_MODE = "[MAP] Toggle Edit Mode",
  LOAD_LAYERS_REQUEST = "[MAP] Load Layers Request",
  LOAD_LAYERS_FAILURE = "[MAP] Load Layers Failure",
  LOAD_LAYERS_SUCCESS = "[Map] Load Layers Success",
  CHANGE_POLYGON = "[Map] CHANGE POLYGON",
 
}

export class ToggleEditModeAction implements Action {
  readonly type = ActionTypes.TOGGLE_EDIT_MODE;
}

export class LoadLayersRequestAction implements Action {
  readonly type = ActionTypes.LOAD_LAYERS_REQUEST;
}

export class LoadLayersFailureAction implements Action {
  readonly type = ActionTypes.LOAD_LAYERS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadLayersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_LAYERS_SUCCESS;
  constructor(public payload: { layers: Layer[] }) {}
}

export class ChangePolygon implements Action {
  readonly type = ActionTypes.CHANGE_POLYGON;
}


export type Actions =
  | ToggleEditModeAction
  | LoadLayersRequestAction
  | LoadLayersFailureAction
  | LoadLayersSuccessAction
  | ChangePolygon