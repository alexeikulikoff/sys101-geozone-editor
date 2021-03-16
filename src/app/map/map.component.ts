import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers/reducers';
import * as mapActions from '../store/actions/actions';
import * as mapSelector from '../store/selectors/selectors';
import { Observable } from 'rxjs';
import { State } from '../store/reducers/reducers';
import { Layer, Point, Zone } from '../data/models';
import { circle, latLng, marker, polygon, tileLayer } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';


const myPolygon1Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[42.155037379840024, -101.97190689992182],[45.628795310387204, -103.3576613980916]];

const myPolygon2Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[38.26231978561517, -99.9394669692728],[45.628795310387204, -103.3576613980916]];

const p0: Point[] = myPolygon1Array.map(s=>{
	
	return {x: Number(s[0]), y: Number(s[1])};

}) ;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		],
		zoom: 5,
		center: latLng(46.879966, -121.726909)
	};
	layersControl = {
		baseLayers: {
			'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
			'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
		},
		overlays: {
			'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
			'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
	  }
   }

	customLayers = [
		circle([ 46.95, -122 ], { radius: 5000 }),
		polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
		marker([ 46.879966, -121.726909 ])
	];
    editMode$: Observable<boolean> = this.store.select(mapSelector.selectEditMode);
	layers$: Observable<Layer[]> = this.store.select(mapSelector.selectLayers); 

    editMode: boolean;
	layers: Layer[];
	private map;
	private states;

	constructor(  private store: Store<fromStore.State>) {
		this.store.dispatch(new mapActions.ToggleEditModeAction());
		
		const zone1: Zone = {name: 'zone1', position: myPolygon1Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const zone2: Zone = {name: 'zone1', position: myPolygon1Array.map(elem=> {
			return {x: elem[0], y: elem[1]}
		})  }	;
		const layer1: Layer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: Layer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: Layer[] = [layer1, layer2];
		
		console.log(JSON.stringify(layers));
	
		
	 }

	toggleEditMode(){
	   console.log('ttoggle');
	   this.store.dispatch(new mapActions.ToggleEditModeAction())	 ;
	} 
    changePolygon1(){
		this.store.dispatch(new mapActions.ChangePolygon());
	}
	changePolygon2(){
		this.store.dispatch(new mapActions.ChangePolygon2());
	}
	ngOnInit(): void {
		
		this.store.dispatch(new mapActions.LoadLayersRequestAction());
		
		this.editMode$.subscribe(res => {
			this.editMode = res; 
		});
		this.layers$.subscribe(res => {
			console.log(res);
			this.layers = res;
			
			if (this.layers.length > 0){
				
				this.customLayers = [
					polygon(this.layers.filter(f=>f.name === 'layer1')[0].zones.filter(z=>z.name === 'zone1')[0].position.map(p=>{
					return [p.x, p.y];
				})),
				]
			}
		});
	
	}
	ngAfterViewInit(): void {
	}

}
