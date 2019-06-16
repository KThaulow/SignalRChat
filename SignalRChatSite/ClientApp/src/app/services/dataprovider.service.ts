import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataproviderService {

  constructor(private http: HttpClient) { }

  private startDataProvider(clientIdentifier: string) {
    console.log('Starting data provider');

    var accessToken = localStorage.getItem('access_token');
    console.log(accessToken);

    var client = {
      ClientIdentifier: clientIdentifier,
    };

    this.http.post('https://localhost:5001/api/scheduleddata', client).subscribe();
  }
}
