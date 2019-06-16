import { Component } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { DataproviderService } from './services/dataprovider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public signalRService: SignalRService, public loginService: LoginService, public dataproviderService: DataproviderService, private http: HttpClient) { }

  ngOnInit() {
    var tokenPromise = this.loginService.login('fred', '123');
    tokenPromise.then(e => {
      localStorage.setItem('access_token', e); // Save JWT in local storage
      this.startConnection(e)
    });
  }

  private startConnection = (loginToken: string) => {
    console.log('Found logintoken: ' + loginToken);

    this.signalRService.startConnection(loginToken)
      .then(e => {
        console.log('Started connection');
        this.registerClient();

        // this.signalRService.addTransferChartDataListener();
        // this.signalRService.addChatMessageListener('kristian1');
        // this.sendMessage();
      })
      .catch(err => console.log('Could not start connection: ' + err));
  }

  private registerClient() {
    this.signalRService.registerClient('clientIdentifier')
      .then(() => {
        console.log('Registered client');
        this.signalRService.addScheduledDataListener();
        this.dataproviderService.startDataProvider('clientIdentifier');
      })
      .catch(err => console.error(err));
  }





}
