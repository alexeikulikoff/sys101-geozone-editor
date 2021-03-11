
import { createAction, props } from '@ngrx/store';

export const toggleEditMode = createAction('[MAP] Toggle Edit State', props<{ mode:  boolean }>());

export const addPoint = createAction('[MAP] Add Point');

export const saveZone = createAction('[MAP] Save Zone');