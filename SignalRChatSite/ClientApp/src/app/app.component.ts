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

    var token = this.login();

    this.signalRService.startConnection("");
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


  private login = () => {
    var user = {
      Username: "fred",
      Password: "123",
    };

    var result = this.http.post('http://localhost:5000/api/login', user).toPromise().then(this.extractData).catch(this.handleErrorPromise);

    return result;
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
