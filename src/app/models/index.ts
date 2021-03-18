import { LatLngExpression,  Polygon,   tileLayer,  MarkerOptions, Marker } from 'leaflet';

export interface VehicleDto{
	id: string;
	name: string;
	x: number;
	y:number;
	marker: L.Marker;
	
}

export interface VehicleLayer{
	id: string;
	name: string;
	vehicles: VehicleDto[];
}
	


export class GeoZone extends Polygon{
	
	id: string;
	name: string;
	neighbors: GeoZone[];
	constructor(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], id: string, name: string ){
        super(latlngs);
		this.name = name;
		this.id = id;
		this.neighbors = [];
    }
	getId():string {
		return this.id;
	}
	getName(): string{
		return this.name;
	}
	addNeibor(value: GeoZone){
		this.neighbors.push(value);
	}
	removeNeigor(value: GeoZone){
		this.neighbors = this.neighbors.filter(f => f.id !== value.id);
	}
	
	
}
export class Vehicle extends Marker{

	name: string;
	constructor(latlng: LatLngExpression, name: string, options?: MarkerOptions){
        super(latlng, { title: name });
		this.name = name;
		
		this.options
		
    }

	getName(): string{
		return this.name;
	}
}
