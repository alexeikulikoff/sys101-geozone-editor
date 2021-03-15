import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { Layer } from 'src/app/data/models';
import * as mapAction from '../actions/map.actions';

@Injectable()
export class MapEffects {

 constructor( private actions$: Actions, private httpClient: HttpClient, ) {}	


 loadLayers: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
	  ofType(mapAction.loadLayers),
      switchMap(() => {
	   return  this.httpClient.get<Layer[]>('../../assets/data/layers.json').pipe(
		switchMap((layers: Layer[]) => {
	  		return [mapAction.loadLayersSuccess({layers: layers})];		
		})
   	 )
         
    }),
    catchError(err =>{ console.log(err); return  of(mapAction.loadLayersFail())})
    ));

  
}	