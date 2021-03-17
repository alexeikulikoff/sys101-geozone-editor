import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers/reducers';
import * as mapActions from '../store/actions/actions';
import * as mapSelector from '../store/selectors/selectors';
import { Observable } from 'rxjs';
import { State } from '../store/reducers/reducers';
import { MyLayer, Point, Zone } from '../data/models';
import { circle, Class, latLng, LatLngExpression, marker, Polygon, polygon, PolylineOptions, tileLayer, Layer, MarkerOptions, Marker, LatLng } from 'leaflet';
import { VehicleDto, VehicleLayer } from '../models';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';


const myPolygon1Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[42.155037379840024, -101.97190689992182],[45.628795310387204, -103.3576613980916]];

const myPolygon2Array = [[44.546103590247625, -108.93763284405529],[42.30552917724857, -108.16161032508022],[38.26231978561517, -99.9394669692728],[45.628795310387204, -103.3576613980916]];

const p0: Point[] = myPolygon1Array.map(s=>{
	
	return {x: Number(s[0]), y: Number(s[1])};

}) ;

export class PolyG extends Polygon{
	
	id: string;
	name: string;
	constructor(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], id: string, name: string ){
        super(latlngs);
		this.name = name;
		this.id = id;
    }
	getId():string {
		return this.id;
	}
	getName(): string{
		return this.name;
	}
}
export class Vehicle extends Marker{
	
	name: string;
	constructor(latlng: LatLngExpression,  name: string, options?: MarkerOptions){
        super(latlng, { title: name });
		this.name = name;
		
		this.options
		
    }
	
	getName(): string{
		return this.name;
	}
}

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
			circle([ 46.95, -126 ], { radius: 18000 })
		],
		zoom: 5,
		center: latLng(46.879966, -121.726909)
	};
	

	customLayers: Layer[] = [];

	
    editMode$: Observable<boolean> = this.store.select(mapSelector.selectEditMode);
	layers$: Observable<MyLayer[]> = this.store.select(mapSelector.selectLayers); 
	vehicleLayer$: Observable<VehicleLayer> = this.store.select(mapSelector.selectVehicleLayer);
    customLayers$: Observable<Layer[]> = this.store.select(mapSelector.selectCustomLayer);

    editMode: boolean;
	layers: MyLayer[];
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
		const layer1: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: MyLayer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: MyLayer[] = [layer1, layer2];
		
	//	console.log(JSON.stringify(layers));
		
	//	const v1: Vehicle = new Vehicle([ 46.95, -126 ],'v1','veh1');
	//	const v2: Vehicle = new Vehicle([ 47.95, -125 ],'v2','veh2');
	//	const v0  = [v1, v2]; 
		//console.log(JSON.stringify(v0));
		
	 }

	toggleEditMode(){
	   console.log('ttoggle');
	   this.store.dispatch(new mapActions.ToggleEditModeAction())	 ;
	} 
    reloadVehicle(){
		//this.store.dispatch(new mapActions.ChangePolygon());
		this.store.dispatch(new mapActions.LoadVehicleRequestAction());
	}
	updateVehicle(){
		this.store.dispatch(new mapActions.UpdateVehicleSuccessAction());
	}
	filter1(){
		
		const ZZ = this.customLayers.filter((f: PolyG | Vehicle) => f.name !== 'name2');
		ZZ.forEach((s: PolyG)=> {
			console.log(s.getName());
		});
	}
	ngOnInit(): void {
		
		this.store.dispatch(new mapActions.LoadLayersRequestAction());
		this.store.dispatch(new mapActions.LoadVehicleRequestAction());
		const tmp1 = marker([ 46.879966, -121.726909 ]);
		const tmp2 = marker([ 44.879966, -121.726909 ]);
	
	    const tmp0 = [tmp1, tmp2];

	   //this.customLayers = tmp0;

		this.customLayers$.subscribe(res=>{
			console.log(res);
			this.customLayers = res;
			res.forEach(s=>{
				
			})
			//this.customLayers = res;
		})	
			//this.customLayers = layer;
		
		//const pol1 = new PolyG(myPolygon1Array.map(s => latLng(s[0], s[1])), '1' ,'ploy1');
	//	const pol2 = new PolyG(myPolygon1Array.map(s => latLng(s[0] + 1,s[1] + 1)), '1' ,'ploy1');
		
	//	this.customLayers.push(pol1);
	//	this.customLayers.push(pol2);
	
	//    this.customLayers$.subscribe(s=>{
	//		console.log(s);
	//		this.customLayers.push(s);
	//	});
	
	//	this.vehicleLayer$.subscribe((layer: VehicleLayer) => {
		//	this.customLayers.length = 0;
	//		layer.vehicles.forEach((dto: VehicleDto) => {
			
	//	      const vehicle: Vehicle =  new Vehicle(latLng(dto.x, dto.y), dto.id ,dto.name);
	//		  const index =  this.customLayers.findIndex((s: Vehicle)  => s.name === dto.name);
			//  if ( index < 0 ){
				 
	//			  this.customLayers.push(vehicle);
		 		 
			//  }else{

			//	this.customLayers = [...this.customLayers.slice(0,index), vehicle, ...this.customLayers.slice(index+1) ];
					
			//   } 
			
				
	//		});
	//	});
		
		this.editMode$.subscribe(res => {
			this.editMode = res; 
		});
/*		
		var i= 0;
		this.layers$.subscribe(res => {
			this.layers = res;
			
			if (this.layers.length > 0){
				i++;
				
				const polygone = new PolyG(this.layers.filter(f=>f.name === 'layer1')[0].zones.filter(z=>z.name === 'zone1')[0].position.map(p=>{
						return [p.x + i, p.y + i]	
				}), i + '' ,'name' + i);
					
				polygone.bindTooltip(polygone.getName(), { permanent: true, direction:"center" });
				
				this.customLayers.push(polygone);
				
				this.customLayers.push(new Vehicle([ 46.879966 + i, -121.726909 + i ], i + '' ,'vehicle' + i));
				
				
				this.customLayers.forEach((s: PolyG | Vehicle) => {
					
					  console.log(s.getName());	
					
				});
				
		
			}
			
	
			//this.customLayers.forEach(s  => console.log(s));
		});
*/	
	}



}
