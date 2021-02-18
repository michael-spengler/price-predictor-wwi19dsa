import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { AccessToken } from 'src/app/shared/models/access-token.model';
import { User } from '../../models/user.model'; 
import { MatSnackBar } from '@angular/material/snack-bar';



const ACCESS_TOKEN = 'Authorization';
const USER = 'Username'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);



  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
  ) { 
  }

  public async login(email: string, password: string) {
    this.httpLogin(email, password).subscribe(resp => {
      const token = resp.headers.get(ACCESS_TOKEN);
      this.setAccessToken(token);
      this.setUser(resp.body.data)
      this.isLoggedIn.next(true);
    });
  }

  public httpLogin(email: string, password: string) {
    const body = { 'email': email, 'password': password };
    return this.httpClient.post(environment.apiEndpoint + 'signin', body, { observe: 'response' }).pipe(retry(2), map((resp: any) => {
      const user = {'username': resp.body.username} as User | null;
      resp.body.data = user;
      return resp
    }));
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
    this.isLoggedIn.next(false);
  }

  private setUser(user: User | null) {
    if (user == null) {
      throw new Error('No Token Found');
    } else {
      console.log(user.username)
      localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  public verifyToken() {
    const token = this.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = { 
      headers: headers,
    };
    let body = {
      'token': token
    };

    this.httpClient.post(environment.apiEndpoint + 'verify-token', body, options).subscribe((result: any) => {
      this.isLoggedIn.next(true);
    }, error => {
      this._snackBar.open('Error with the token. Please login again.', 'Close');
      this.isLoggedIn.next(false);
    });
  }

  public getUser(): User {
    const user = localStorage.getItem(USER);
    if (user == null) {
      throw new Error('No Token Found');
    } else {
      return JSON.parse(user) as User;
    }
  }

  public isAuthenticated(): boolean {
    try {
      const currentTime = Math.floor((new Date).getTime() / 1000);
      if (currentTime <= this.getExpiration()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public checkAuthentication() {
    if (this.isAuthenticated()) {
      this.verifyToken();
    } else {
      this.isLoggedIn.next(false);
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

  public getToken(): string {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token == null) {
      throw new Error('No Token Found');
    } else {
      return token;
    }
  }
}
