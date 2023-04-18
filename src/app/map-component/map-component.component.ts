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
  status:String = 'yet to be known';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    setInterval(() => {
      this.getLatLong().subscribe((data) => {
        const feed = data.feeds[1];
        this.lat = Number(feed.field3);
        this.lng = Number(feed.field4);
      });
    }, 10000);
  }

  getLatLong(): Observable<any> {
    const url = 'https://api.thingspeak.com/channels/2074986/feeds.json?api_key=RX9EXFP2MR3D14MZ&results=2';
    return this.http.get<any>(url);
  }
  // google maps zoom level
  zoom: number = 15;
  latitudeinput1: number = 0;
  longitudeinput1: number = 0;
  radiusinput1: number = 0;
  latitude1: number = 0;
  longitude1: number = 0;
  radius1: number = 0;
  distancebetween: number = 0;
  printValues1() {
    this.latitude1 = Number(this.latitudeinput1);
    this.longitude1 = Number(this.longitudeinput1);
    this.radius1 = Number(this.radiusinput1);
  }
  distance() {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(this.lat - this.latitude1);
    const dLon = this.deg2rad(this.lng - this.longitude1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.latitude1)) * Math.cos(this.deg2rad(this.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    this.distancebetween = (d*1000.0);
    if(this.distancebetween > this.radius1){
      this.status = 'Out';
    }
    else{
      this.status = 'In';
    }
    return (d*1000.0);
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}