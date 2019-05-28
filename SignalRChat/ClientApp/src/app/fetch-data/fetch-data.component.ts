import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../signal-r.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [SignalRService]
})
export class FetchDataComponent {
  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    console.log("startHttpRequest");
    this.http.get('https://localhost:5001/api/chat')
      .subscribe(res => {
        console.log("startHttpRequest " + res);
      })
  }
}
