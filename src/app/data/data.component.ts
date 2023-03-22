import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  dataLoaded = false;
  temperature: number = 0.0;
  humidity: number = 0.0;
  dewpoint: number = 0.0;
  constructor(private http: HttpClient) {
    const url = 'https://api.thingspeak.com/channels/2074986/feeds.json?results=1';
    const apiKey = 'RX9EXFP2MR3D14MZ';
    setInterval(() => {
    this.http.get(url + '&api_key=' + apiKey).subscribe((data: any) => {
      this.temperature = data.feeds[0].field1;
      this.humidity = data.feeds[0].field2;
      this.dewpoint = this.temperature - ((100 - this.humidity) / 5);
      this.dataLoaded = true;

    });
    }, 10000);
  }

  ngOnInit() {
  }
}
