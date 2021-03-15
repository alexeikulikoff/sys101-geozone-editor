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
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './store/effects/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MapModule } from './map/map.module';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 	HttpClientModule,
    EffectsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
	MapModule
  ],
  providers: [
	MarkerService,
	PopUpService,
	ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
