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
  health:string = 'Good condition';
  imgsrc:string = 'https://media.tenor.com/v7BEN7B1EJYAAAAM/cow-cute.gif';
  constructor(private http: HttpClient) {
    const url = 'https://api.thingspeak.com/channels/2076194/feeds.json?results=2';
    const apiKey = '02LUXCKNKF02Z267';
    setInterval(() => {
    this.http.get(url + '&api_key=' + apiKey).subscribe((data: any) => {
      if(data.feeds[0].field1 != null){
        this.temperature = data.feeds[0].field1;
      }
      if(data.feeds[1].field1 != null){
        this.temperature = data.feeds[1].field1;
      }
      if(data.feeds[0].field2 != null){
        this.humidity = data.feeds[0].field2;
      }
      if(data.feeds[1].field2 != null){
        this.humidity = data.feeds[1].field2;
      }
      this.dewpoint = this.temperature - ((100 - this.humidity) / 5);
      if(this.humidity < 61.0 || this.temperature > 35.0){
        this.health = 'Bad condition';
        this.imgsrc = 'https://media.tenor.com/buvJxgoU8nAAAAAM/amiga-cow.gif';
      }
      else{
        this.health = 'Good condition';
        this.imgsrc = 'https://media.tenor.com/v7BEN7B1EJYAAAAM/cow-cute.gif'
      }

      this.dataLoaded = true;

    });
    }, 2000);
  }

  ngOnInit() {
  }
}
