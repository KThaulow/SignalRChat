import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../interfaces/chartmodel';
import { Chatmessage } from '../interfaces/chatmessage';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  public data: ChartModel[];
  public chatMessage: Chatmessage;
  private hubConnection: signalR.HubConnection

  public startConnection = (loginToken: string) => {
    console.log('Starting connection with token ' + loginToken);

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/chat', { accessTokenFactory: () => loginToken })
      .build();

    return this.hubConnection
      .start();
  }

  public registerClient = (clientIdentifier: string) => {
    console.log("Registering client");

    return this.hubConnection.send('RegisterClient', clientIdentifier);
  }

  public unregisterClient = (clientIdentifier: string) => {
    console.log("Unregistering client");

    this.hubConnection.send('UnregisterClient', clientIdentifier)
      .then(() => console.log('unregistered client'))
      .catch(err => console.error(err));
  }

  public addTransferChartDataListener = () => {
    console.log("Started data listener");
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public addScheduledDataListener = () => {
    console.log("Started scheduled data listener");
    this.hubConnection.on('scheduledDataProvider', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public addChatMessageListener = (identifier: string) => {
    console.log("Started chat message listener");

    this.hubConnection.on('chatmessage', (message) => {
      console.log("Received chat message");
      this.chatMessage = message;
      console.log(this.chatMessage.sender + ' ' + this.chatMessage.receiver + ' ' + this.chatMessage.message + ' ' + this.chatMessage.timestamp);
    });
  }
}
