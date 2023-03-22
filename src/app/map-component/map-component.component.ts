import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {

  lat = 0;
  lng = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLatLong().subscribe((data) => {
      const feed = data.feeds[0];
      this.lat = Number(feed.field3);
      this.lng = Number(feed.field4);
    });
  }

  getLatLong(): Observable<any> {
    const url = 'https://api.thingspeak.com/channels/2074986/feeds.json?api_key=RX9EXFP2MR3D14MZ&results=2';
    return this.http.get<any>(url);
  }
  // google maps zoom level
  zoom: number = 20;
  
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

function ngOnInit(): ((error: any) => void) | null | undefined {
  throw new Error('Function not implemented.');
}
