

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, mapFeatureKey } from '../reducers/reducers';


const getEmployeeState = createFeatureSelector<State>(
  mapFeatureKey
);


export const selectVehicleLayer = createSelector(
	getEmployeeState,
	state => state.vehicleLayer
	
) ;
export const selectCustomLayer = createSelector(
	getEmployeeState,
	state => state.customLayers
	
) ;

export const selectEditMode = createSelector(
  getEmployeeState,
  state => state.editMode
);

export const selectLayers = createSelector(
  getEmployeeState,
  state => state.layers
);
