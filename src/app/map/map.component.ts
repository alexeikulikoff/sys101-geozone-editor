import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { ShapeService } from '../services/shape.service';

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


@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	private map;
	private states;

	constructor(private markerService: MarkerService, private shapeService: ShapeService) { }

	ngOnInit(): void {
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
		
		this.map.on('click', function(ev) {
    		console.log(ev); // ev is an event object (MouseEvent in this case)
		});
		
		tiles.addTo(this.map);

	}

}
