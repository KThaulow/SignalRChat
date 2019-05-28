import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable()
export class SignalRService {

  public data: string;

  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chat')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferDataListener = () => {
    console.log("addTransferDataListener");
    this.hubConnection.on('transferdata', (data) => {
      this.data = data;
      console.log("addTransferDataListener " + data);
    });
  }
}
