import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/app/shared/models/access-token.model';


const ACCESS_TOKEN = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  public async login(email: string, password: string) {
    const body = { 'email': email, 'password': password };
    const response = await this.httpClient.post(environment.apiEndpoint + 'signin', body, { observe: 'response' }).toPromise();
    const token = response.headers.get(ACCESS_TOKEN);
    this.setAccessToken(token);
    this.isLoggedIn.next(true);
    return response;
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.isLoggedIn.next(false);
  }

  public getToken(): string {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token == null) {
      throw new Error('No Token Found');
    } else {
      return token;
    }
  }

  public checkAuthentication(): boolean {
    try {
      const currentTime = Math.floor((new Date).getTime() / 1000)
      if (currentTime <= this.getExpiration()) {
        this.isLoggedIn.next(true);
        return true;
      } else {
        this.isLoggedIn.next(false);
        return false;
      }
    } catch (error) {
      this.isLoggedIn.next(false);
      return false;
    }
  }

  private getExpiration(): number {
    return this.getTokenPayload().exp;
  }

  private getTokenPayload(): AccessToken {
    const token = this.getToken();
    return jwt_decode(token);
  }

  private setAccessToken(token: string | null) {
    if (token == null) {
      throw new Error('No Token Found');
    } else {
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }
}
