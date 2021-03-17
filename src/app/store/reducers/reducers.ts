import { latLng, Layer, marker } from 'leaflet';
import { MyLayer, Zone } from 'src/app/data/models';
import { Vehicle, VehicleDto, VehicleLayer } from 'src/app/models';
import { Actions, ActionTypes } from '../actions/actions';

export const mapFeatureKey = 'mapKey';

const myPolygon1Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[42.155037379840024, -101.97190689992182],[45.628795310387204, -103.3576613980916]];

const myPolygon2Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[38.26231978561517, -99.9394669692728],[45.628795310387204, -103.3576613980916]];


export interface State {
	editMode: boolean;
	layers: MyLayer[];
	
	vehicleLayer: VehicleLayer;
	customLayers: Layer[];
	
	
}

export const initialState: State = {
	editMode: false,
	layers: [],
	vehicleLayer: {id: '', name:'', vehicles: [] },
	customLayers: []
	
	
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
     
//		return {
	//		...state,
//			vehicleLayer: {...state.vehicleLayer, vehicles: [
//				...state.vehicleLayer.vehicles.slice(0,index),
//				{id: state.vehicleLayer.vehicles[index].id, name: state.vehicleLayer.vehicles[index].name, 
//				 x: state.vehicleLayer.vehicles[index].x + 1, y: state.vehicleLayer.vehicles[index].y },
//				...state.vehicleLayer.vehicles.slice(index+1),
//			]}
//		}
      return {...state, 
			vehicleLayer: {...state.vehicleLayer, vehicles: ve }
		}
    }

	case ActionTypes.LOAD_VEHILES_SUCCESS: {
	  
      return {
        ...state,
        vehicleLayer: action.payload.vehicleLayer,
        customLayers: state.customLayers.concat(marker([ 44.879966, -121.726909 ]))  
	//	customLayers: state.customLayers.concat(action.payload.vehicleLayer.vehicles.map(ve=>{
	//		return new Vehicle(latLng(ve.x, ve.y), ve.name);
	//	}))
      };
    }


	case ActionTypes.LOAD_LAYERS_SUCCESS: {
      return {
        ...state,
        layers: action.payload.layers,
        
      };
    }
	case ActionTypes.CHANGE_POLYGON: {
	  const zone1: Zone = {name: 'zone1', position: myPolygon2Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const zone2: Zone = {name: 'zone1', position: myPolygon1Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const layer1: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: MyLayer[] = [layer1, layer2];	
      return {
        ...state,
        layers: layers,
        
      };
    }
	case ActionTypes.CHANGE_POLYGON2: {
	  const zone1: Zone = {name: 'zone1', position: myPolygon1Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const zone2: Zone = {name: 'zone1', position: myPolygon2Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const layer1: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: MyLayer[] = [layer1, layer2];	
      return {
        ...state,
        layers: layers,
        
      };
    }
  default: {
      return state;
  }
 }
}
