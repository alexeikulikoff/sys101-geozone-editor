
import * as L from 'leaflet';

import {  VehicleDto, VehicleLayer } from 'src/app/models';
import { Actions, ActionTypes } from '../actions/actions';

export const mapFeatureKey = 'mapKey';

const myPolygon1Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[42.155037379840024, -101.97190689992182],[45.628795310387204, -103.3576613980916]];

const myPolygon2Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[38.26231978561517, -99.9394669692728],[45.628795310387204, -103.3576613980916]];


export interface State {
	editMode: boolean;
	vehicleLayer: VehicleLayer;
	
	
}

export const initialState: State = {
	editMode: false,
	vehicleLayer: {id: '', name:'', vehicles: [] },
	
}

export function mapReducer(state = initialState, action: Actions): State {

  switch (action.type) {
	case ActionTypes.TOGGLE_EDIT_MODE: {
	
      return {
        ...state,
        editMode: !state.editMode,
        
      };
    }
	case ActionTypes.UPDATE_VEHICLE_POSITION: {
	
	   const ve: VehicleDto[] = state.vehicleLayer.vehicles.map( (s: VehicleDto) => {
		 return ( s.name === 'Vehicle1' ) ? { ...s, x: s.x + 1} : s;  
	  });	
	 const index = state.vehicleLayer.vehicles.findIndex(s => s.name === 'Vehicle1');
     

      return {...state, 
			vehicleLayer: {...state.vehicleLayer, vehicles: ve }
		}
    }

	case ActionTypes.LOAD_VEHILES_SUCCESS: {
		
	 const z0 = action.payload.vehicleLayer.vehicles.map(v=>{
			return {id: v.id, name: v.name, x: v.x, y: v.y, marker: L.marker([v.x, v.y])}	
	 });	
		
	  const a0 = {
        ...state,
        vehicleLayer: {...action.payload.vehicleLayer, vehicles: z0}
      }
	  console.log(a0);
      return {
        ...state,
        vehicleLayer: {...action.payload.vehicleLayer, vehicles: z0}
      };
    }
    
  default: {
      return state;
  }
 }
}
