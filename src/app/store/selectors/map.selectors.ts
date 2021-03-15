

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IState } from '../reducers/map.reducers';


export const mapSelector = createFeatureSelector<IState>('map');

export const selectLayer =  createSelector(
	 mapSelector,
    (state: IState, layerName: string) => state.layers.filter(f=>f.name === layerName)[0]
);



export const selectLayers =  createSelector(
  mapSelector,
  (state: IState) =>{
	    console.log(mapSelector);
		return state.layers
  }    
);


export const editModeSelector =  createSelector(
  mapSelector,
  (state: IState) => ( typeof state !== 'undefined' ) ? state.editMode : false  
);
