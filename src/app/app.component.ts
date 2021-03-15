import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as mapActions from './store/actions/actions';
import * as fromStore from './store/reducers/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	
  title = 'sys101-geozone-editor';	

  constructor( private store: Store<fromStore.State>){
	
  }

  ngOnInit(): void {
    
  }
  
}
