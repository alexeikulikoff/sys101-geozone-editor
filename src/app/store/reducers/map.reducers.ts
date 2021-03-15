import { Action, createReducer, on } from '@ngrx/store';
import { Layer, Zone } from 'src/app/data/models';
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
	
	on(mapAction.toggleEditMode, (state)=>{
	
		const s0 = {...state, editMode: !state.editMode };
		console.log(s0);
		return s0;
	}),
	
	
	on(mapAction.loadLayersSuccess, (state, { layers })=>{
	
		const s0 = {...state, layers: layers };
		console.log(s0);
		return s0;
	}),

	on(mapAction.createLayer, (state, { layerName })=>{
	
		const layer: Layer = {name: layerName, zones: []}; 
		let layers = state.layers.map(s=>s);
		layers.push(layer);
		
		const s0 = {...state, layers: layers };
		console.log(s0);
		return s0;
	}),
	on(mapAction.dropLayer, (state, { layerName })=>{
	
		const layers = state.layers.filter(f=>f.name !== layerName)	;
		const s0 = {...state, layers: layers };
		console.log(s0);
		return s0;
	}),
	on(mapAction.createZone, (state, { layerName, zoneName })=>{
        
        const zones = state.layers.filter(f=>f.name === layerName)[0].zones.map(s=>s);
		zones.push({name: zoneName, position: [] });
		const a = state.layers.map(l=>{
			return (l.name === layerName) ? {name: l.name, zones: zones} : l;
		});
		
		const s0 = {...state, layers: a };
		console.log(s0);
		return s0;
	}),
	on(mapAction.dropZone, (state, { layerName, zoneName })=>{
        
        const zones = state.layers.filter(f=>f.name === layerName)[0].zones.filter(z=>z.name!== zoneName);
		
		const a = state.layers.map(l=>{
			return (l.name === layerName) ? {name: l.name, zones: zones} : l;
		});
		
		const s0 = {...state, layers: a };
		console.log(s0);
		return s0;
	}),
	on(mapAction.updateZone, (state, { layerName, zoneName, position })=>{
        
        const zones = state.layers.filter(f=>f.name === layerName)[0].zones.map(z=>{
			return (z.name === zoneName) ? { ...z, position: position} : z;
		});
		
		const a = state.layers.map(l=>{
			return (l.name === layerName) ? {name: l.name, zones: zones} : l;
		});
		
		const s0 = {...state, layers: a };
		console.log(s0);
		return s0;
	}),


);	


export function reducer(state: IState = initialState, action: Action) {
  return mapReducer(state, action);
}