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
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chart', { accessTokenFactory: () => loginToken })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    console.log("Started data listener");
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public addChatMessageListener = (identifier: string) => {
    console.log("Started data listener");
    this.hubConnection.on('chatmessage', (message) => {
      console.log("Received chat message");
      this.chatMessage = message;
      console.log(this.chatMessage.sender + ' ' + this.chatMessage.receiver + ' ' + this.chatMessage.message + ' ' + this.chatMessage.timestamp);
    });
  }
}
