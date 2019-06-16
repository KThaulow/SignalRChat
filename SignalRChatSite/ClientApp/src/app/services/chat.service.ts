import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private sendMessage = () => {
    console.log('Sending message');

    var senderChatMessage = {
      Sender: "Tom",
      Receiver: "Hanks",
      Message: "Message"
    };

    this.http.post('https://localhost:5001/api/chat/sendmessage', senderChatMessage).subscribe();
  }
}
