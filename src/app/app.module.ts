import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { PopUpService } from './services/pop-up.service';
import { ShapeService } from './services/shape.service';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { rootEffects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 	HttpClientModule,
   StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(rootEffects),

  ],
  providers: [
	MarkerService,
	PopUpService,
	ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
