
import { Action, createAction, props } from '@ngrx/store';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { MyLayer, Point } from 'src/app/data/models';
import { Vehicle, VehicleLayer } from 'src/app/models';

export enum ActionTypes {
  TOGGLE_EDIT_MODE = "[MAP] Toggle Edit Mode",
  LOAD_LAYERS_REQUEST = "[MAP] Load Layers Request",
  LOAD_LAYERS_FAILURE = "[MAP] Load Layers Failure",
  LOAD_LAYERS_SUCCESS = "[Map] Load Layers Success",
  CHANGE_POLYGON = "[Map] CHANGE POLYGON",
  CHANGE_POLYGON2 = "[Map] CHANGE POLYGON2",

  LOAD_VEHILES_REQUEST = "[MAP] Load Vehicles Request", 
  LOAD_VEHILES_FAILURE = "[MAP] Load Vehicles Failure", 
  LOAD_VEHILES_SUCCESS = "[MAP] Load Vehicles SUCCESS", 
  UPDATE_VEHICLE_POSITION = "[MAP] Update Vehicles Position", 	
  REMOVE_VEHICLE = "[MAP] Remove Vehicles"

 
}

export class ToggleEditModeAction implements Action {
  readonly type = ActionTypes.TOGGLE_EDIT_MODE;
}


export class LoadVehicleRequestAction implements Action {
  readonly type = ActionTypes.LOAD_VEHILES_REQUEST
}

export class LoadVehicleFailureAction implements Action {
  readonly type = ActionTypes.LOAD_VEHILES_FAILURE
  constructor(public payload: { error: string }) {}
}


export class LoadVehicleSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_VEHILES_SUCCESS
  constructor(public payload: { vehicleLayer: VehicleLayer}) {}
}

export class UpdateVehicleSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_VEHICLE_POSITION
 
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
  constructor(public payload: { layers: MyLayer[] }) {}
}

export class ChangePolygon implements Action {
  readonly type = ActionTypes.CHANGE_POLYGON;
}

export class ChangePolygon2 implements Action {
  readonly type = ActionTypes.CHANGE_POLYGON2;
}


export type Actions =
  | ToggleEditModeAction
  | LoadLayersRequestAction
  | LoadLayersFailureAction
  | LoadLayersSuccessAction
  | ChangePolygon
  | ChangePolygon2
  | UpdateVehicleSuccessAction
  | LoadVehicleSuccessAction
  | LoadVehicleFailureAction
  | LoadVehicleRequestAction


