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

    this.signalRService.startConnection(loginToken)
      .then(e => {
        console.log('Started connection');

        this.signalRService.addTransferChartDataListener();

        this.signalRService.addChatMessageListener('kristian1');
        this.sendMessage();
      })
      .catch(err => console.log('Could not start connection: ' + err));
  }

  private sendMessage = () => {
    console.log('Sending message');

    var senderChatMessage = {
      Sender: "Tom",
      Receiver: "Hanks",
      Message: "Message"
    };

    this.http.post('https://localhost:5001/api/chat/sendmessage', senderChatMessage).subscribe();
  }


  private login = (username: string, password: string) => {
    var user = {
      Username: username,
      Password: password,
    };

    return this.http.post<string>('https://localhost:5001/api/login', user, { responseType: 'text' as 'json' }).toPromise();
  }
}
