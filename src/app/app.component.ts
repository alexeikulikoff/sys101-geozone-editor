import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapActions from './store/actions/map.actions';
import * as fromStore from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	
  title = 'sys101-geozone-editor';	

  constructor( private store: Store<fromStore.IState>){
	
  }

  ngOnInit(): void {
     this.store.dispatch(mapActions.loadLayers());
  }
  
}
