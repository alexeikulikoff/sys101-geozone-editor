import { Action, createReducer, on } from '@ngrx/store';
import { Layer } from 'src/app/data/models';
import * as mapAction from '../actions/map.actions';

export const AdminKey = 'Administration';

export interface IState {
	editMode: boolean;
	layers: Layer[];

}

export const initialState: IState = {
	editMode: false,
	layers: []
}

const mapReducer = createReducer(

	initialState,
	on(mapAction.toggleEditMode, (state, {mode})=>{
		return {...state, currentStaff: mode };
	})
);	


export function reducer(state: IState = initialState, action: Action) {
  return mapReducer(state, action);
}