import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 11.0168;
  lng: number = 76.9558;

  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  draggable: true
	  }
  ]

}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	draggable: boolean;
}