import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();

    this.signalRService.addChatMessageListener('kristian');
    this.sendMessage();
  }


  private startHttpRequest = () => {
    this.http.get('http://localhost:5000/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }

  private sendMessage = () => {
    var senderChatMessage = {
      Sender: "Tom",
      Receiver: "Hanks",
      Message: "Message"
    };

    this.http.post('http://localhost:5000/api/chat/sendmessage', senderChatMessage).subscribe();
  }
}
