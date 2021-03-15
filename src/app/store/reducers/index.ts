import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as mapReducer from './map.reducers';


export interface IState {
  mapState: mapReducer.IState
}

export const reducers: ActionReducerMap<IState> = {
  mapState: mapReducer.reducer
}	

export const metaReducers: Array<MetaReducer<IState>> = !environment.production ? [] : [];


