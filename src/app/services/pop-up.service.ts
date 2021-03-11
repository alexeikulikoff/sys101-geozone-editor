import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {
	
	const {state, capital, population} = data.properties;
	
 	return '' + 
      `<div>Capital:${ capital }</div>
      <div>State: ${ state }</div>
      <div>Population: ${ population }</div>`
  	}

  
 
}
