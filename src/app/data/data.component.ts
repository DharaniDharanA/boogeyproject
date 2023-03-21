import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  dataLoaded = false;
  field1Data: any;
  field2Data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = 'https://api.thingspeak.com/channels/2074986/feeds.json?results=1';
    const apiKey = 'RX9EXFP2MR3D14MZ';

    this.http.get(url + '&api_key=' + apiKey).subscribe((data: any) => {
      this.field1Data = data.feeds[0].field1;
      this.field2Data = data.feeds[0].field2;
      this.dataLoaded = true;
    });
    this.field1Data = this.field1Data + this.field2Data;
  }
}
