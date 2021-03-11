import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './pop-up.service';






@Injectable({
	providedIn: 'root'
})
export class MarkerService {

	capitals: string = '/assets/data/us_capitals.geojson';

	constructor(private http: HttpClient, private popupService: PopUpService) { }

	static ScaledRadius(val: number, maxVal: number): number {
		return 20 * (val / maxVal);
	}

	makeCapitalCircleMarkers(map: L.map): void {
		this.http.get(this.capitals).subscribe((res: any) => {
			
			

			// Find the maximum population to scale the radii by.
			const maxVal = Math.max(...res.features.map(x => x.properties.population), 0);

			for (const c of res.features) {
				const lat = c.geometry.coordinates[0];
				const lon = c.geometry.coordinates[1];
				const circle = L.circleMarker([lon, lat], {
					radius: MarkerService.ScaledRadius(c.properties.population, maxVal)
				});
				circle.bindPopup(this.popupService.makeCapitalPopup(c));
        		circle.addTo(map);

			}
		});

	}
	makeCapitalMarkers(map: L.map): void {
		this.http.get(this.capitals).subscribe((res: any) => {
			for (const c of res.features) {
				const lat = c.geometry.coordinates[0];
				const lon = c.geometry.coordinates[1];
				const marker = L.marker([lon, lat]).addTo(map);
			}
		});



	}

}
