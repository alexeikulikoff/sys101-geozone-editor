
import { createAction, props } from '@ngrx/store';
import { Layer, Point } from 'src/app/data/models';

export const toggleEditMode = createAction('[MAP] Toggle Edit State');

export const loadLayers = createAction('[MAP] Load Data');

export const loadLayersSuccess =  createAction('[MAP] Load Layers Success', props<{ layers: Layer[] }>());

export const loadLayersFail = createAction('[MAP] Load Data Fail');

export const createLayer = createAction('[MAP] Create Layer', props<{ layerName: string }>());

export const dropLayer = createAction('[MAP] Drop Layer', props<{ layerName: string }>());

export const createZone = createAction('[MAP] Create Zone', props<{ layerName: string, zoneName: string }>());

export const dropZone = createAction('[MAP] Drop Zone', props<{ layerName: string, zoneName: string }>());

export const updateZone = createAction('[MAP] Update Zone', props<{ layerName:  string, zoneName: string, position: Point[] }>());

