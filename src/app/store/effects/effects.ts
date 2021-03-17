import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { MyLayer } from 'src/app/data/models';
import { Vehicle, VehicleLayer } from 'src/app/models';
import * as mapAction from '../actions/actions';

@Injectable()
export class MapEffects {

 constructor( private actions$: Actions, private httpClient: HttpClient, ) {}	


 loadLayers: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
	  ofType<mapAction.LoadLayersRequestAction>(mapAction.ActionTypes.LOAD_LAYERS_REQUEST),
      switchMap(() => {
	   return  this.httpClient.get<MyLayer[]>('../../assets/data/layers.json').pipe(
		switchMap((layers: MyLayer[]) => {
		
	  		return [new mapAction.LoadLayersSuccessAction({ layers: layers })];		
		})
   	 )
         
    }),
    	catchError(err =>{ console.log(err); return  of(new mapAction.LoadLayersFailureAction( { error: 'Error loading layers' } ))})
    ));

  loadVehicles: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
	  ofType<mapAction.LoadVehicleRequestAction>(mapAction.ActionTypes.LOAD_VEHILES_REQUEST),
      switchMap(() => {
	   return  this.httpClient.get<VehicleLayer>('http://localhost:8080/vehicle').pipe(
		switchMap((layer: VehicleLayer) => {
		
	  		return [new mapAction.LoadVehicleSuccessAction({ vehicleLayer: layer })];		
		})
   	 )
         
    }),
    	catchError(err =>{ console.log(err); return  of(new mapAction.LoadVehicleFailureAction( { error: 'Error loading vehicles' } ))})
    ));

  
}	