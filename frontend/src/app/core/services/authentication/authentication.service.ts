import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  async login(email: string, password: string) {
    const body = {"email": email, "password": password};
    const response = await this.httpClient.post('http://127.0.0.1:5000/' + 'signin', body).toPromise();
    return response;
  } 
}
