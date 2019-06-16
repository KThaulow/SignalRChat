import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login = (username: string, password: string) => {
    var user = {
      Username: username,
      Password: password,
    };

    return this.http.post<string>('https://localhost:5001/api/login', user, { responseType: 'text' as 'json' }).toPromise();
  }
}
