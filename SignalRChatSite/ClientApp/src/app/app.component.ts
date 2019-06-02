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
    var tokenPromise = this.login('fred', '123');
    tokenPromise.then(e => this.startConnection(e));
  }

  private startConnection = (loginToken: string) => {
    console.log('Found logintoken: ' + loginToken);

    this.signalRService.startConnection(loginToken);

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


  private login = (username: string, password: string) => {
    var user = {
      Username: username,
      Password: password,
    };

    return this.http.post<string>('http://localhost:5000/api/login', user, { responseType: 'text' as 'json' }).toPromise();
  }
}
