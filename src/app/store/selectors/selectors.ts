

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, mapFeatureKey } from '../reducers/reducers';


const getEmployeeState = createFeatureSelector<State>(
  mapFeatureKey
);

export const selectEditMode = createSelector(
  getEmployeeState,
  state => state.editMode
);

export const selectLayers = createSelector(
  getEmployeeState,
  state => state.layers
);
