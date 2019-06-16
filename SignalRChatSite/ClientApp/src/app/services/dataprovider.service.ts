import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataproviderService {

  constructor(private http: HttpClient) { }

  public startDataProvider(clientIdentifier: string) {
    console.log('Starting data provider');

    var client = {
      ClientIdentifier: clientIdentifier,
    };

    this.http.post('https://localhost:5001/api/scheduleddata', client).subscribe();
  }
}
