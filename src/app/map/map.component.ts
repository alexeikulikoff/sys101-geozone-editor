import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { ShapeService } from '../services/shape.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../store/reducers';
import * as mapActions from '../store/actions/map.actions';
import * as mapSelector from '../store/selectors/map.selectors';
import { Observable } from 'rxjs';
import { IState } from '../store/reducers';
import { Layer, Point, Zone } from '../data/models';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

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

    editMode$: Observable<boolean> = this.store.select(mapSelector.editModeSelector);
	layers$: Observable<Layer[]> = this.store.select(mapSelector.selectLayers); 

    editMode: boolean;
	layers: Layer[];
	private map;
	private states;

	constructor(private markerService: MarkerService, private shapeService: ShapeService,  private store: Store<fromStore.IState>) {
		this.store.dispatch(mapActions.toggleEditMode())
		
		const zone1: Zone = {name: 'zone1', position: [{x:100, y:200},{x:120, y:200},{x:100, y:220}]}	;
		const zone2: Zone = {name: 'zone2', position: [{x:100, y:200},{x:120, y:200},{x:100, y:220}]}	;
		const layer1: Layer = {name: 'layer1', zones: [zone1, zone2]};
		const layer2: Layer = {name: 'layer1', zones: [zone1, zone2]};
		
		const layers: Layer[] = [layer1, layer2];
		
		console.log(JSON.stringify(layers));
	//	this.store.dispatch(mapActions.createLayer({layerName: 'layer1'}));
	//	this.store.dispatch(mapActions.createZone({layerName: 'layer1', zoneName: 'zone1'}));
	//	this.store.dispatch(mapActions.updateZone({layerName: 'layer1', zoneName: 'zone1', position: p0}));
		
		this.layers$.subscribe(res => {
			console.log(res);
			this.layers = res;
		});
		
	 }

	toggleEditMode(){
	   console.log('ttoggle');
	   this.store.dispatch(mapActions.toggleEditMode())	 ;
	} 

	ngOnInit(): void {
		
		this.editMode$.subscribe(res => {
			this.editMode = res; 
			
		});
	
	}
	ngAfterViewInit(): void {
		this.initMap();
		
		this.shapeService.getStateShapes().subscribe(states => {
			this.states = states;
			this.initStatesLayer();
		});
		this.markerService.makeCapitalCircleMarkers(this.map);
	}
	private initStatesLayer() {
		const stateLayer = L.geoJSON(this.states, {
			style: (feature) => ({
				weight: 3,
				opacity: 0.5,
				color: '#008f68',
				fillOpacity: 0.8,
				fillColor: '#6DB65B'
			}),
			onEachFeature: (feature, layer) => (
				layer.on({
					mouseover: (e) => (this.highlightFeature(e)),
					mouseout: (e) => (this.resetFeature(e)),
				})
			)
		});

		this.map.addLayer(stateLayer);
		stateLayer.bringToBack();
	}
	private highlightFeature(e) {
		const layer = e.target;
		layer.setStyle({
			weight: 10,
			opacity: 1.0,
			color: '#DFA612',
			fillOpacity: 1.0,
			fillColor: '#FAE042',
		});
	}

	private resetFeature(e) {
		const layer = e.target;
		layer.setStyle({
			weight: 3,
			opacity: 0.5,
			color: '#008f68',
			fillOpacity: 0.8,
			fillColor: '#6DB65B'
		});
	}
	private initMap(): void {
		this.map = L.map('map', {
			center: [39.8282, -98.5795],
			zoom: 3
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		
		var latlngs = [
		    [45.51, -122.68],
		    [37.77, -122.43],
		    [34.04, -118.2]
		];

		var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
		
		console.log(this.layers);
		
	//	const polyginArr1 = this.layers.filter(f=>f.name === 'layer1')[0].zones.filter(z=>z.name === 'zone1')[0].position.map(p=>{
	//		return [p.x, p.y];
	//	})
		var polygon1 = L.polygon(myPolygon1Array, {color: 'red'}).addTo(this.map);
		
		
		var polygon2 = L.polygon(myPolygon2Array, {color: '#5eff33'}).addTo(this.map);
		
		
	//	this.map.fitBounds(polygon1.getBounds());
		this.map.on('click', function(ev) {
    		console.log(ev); // ev is an event object (MouseEvent in this case)
		});
		
		tiles.addTo(this.map);

	}

}
