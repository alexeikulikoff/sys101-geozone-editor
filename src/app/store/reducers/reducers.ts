import { Layer, Zone } from 'src/app/data/models';
import { Actions, ActionTypes } from '../actions/actions';

export const mapFeatureKey = 'mapKey';

const myPolygon1Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[42.155037379840024, -101.97190689992182],[45.628795310387204, -103.3576613980916]];

const myPolygon2Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[38.26231978561517, -99.9394669692728],[45.628795310387204, -103.3576613980916]];


export interface State {
	editMode: boolean;
	layers: Layer[];
	
}

export const initialState: State = {
	editMode: false,
	layers: []
	
}

export function mapReducer(state = initialState, action: Actions): State {

  switch (action.type) {
	case ActionTypes.TOGGLE_EDIT_MODE: {
	
	  console.log(state);	
      return {
        ...state,
        editMode: !state.editMode,
        
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
		const layer1: Layer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: Layer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: Layer[] = [layer1, layer2];	
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
		const layer1: Layer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: Layer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: Layer[] = [layer1, layer2];	
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
