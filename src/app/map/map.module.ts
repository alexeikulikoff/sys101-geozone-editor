import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MapEffects } from "../store/effects/effects";
import * as fromReducers from "../store/reducers/reducers";

@NgModule({
  imports: [
    CommonModule,
	LeafletModule,
    StoreModule.forFeature(
      fromReducers.mapFeatureKey,
      fromReducers.mapReducer
    ),
    EffectsModule.forFeature([MapEffects]),
  ],
  declarations: [],
})
export class MapModule {}