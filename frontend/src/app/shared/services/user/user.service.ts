import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  SIGNUP_ENDPOINT = 'signup'
  USER_ENDPOINT = 'user';

  public createUser(user: User) {
    return this.httpClient.post(environment.apiEndpoint + this.SIGNUP_ENDPOINT, user, { observe: 'response' });
  }

  public getUserByUsername(username: String): Observable<User> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = { headers: headers };
    return this.httpClient.get(environment.apiEndpoint + this.USER_ENDPOINT + '/' + username, options=options).pipe(
      retry(2),
      map((data: any) => {
        return this.parseToUser(data.data);
      })
    );
  }

  public followUser(username: String) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = { headers: headers };
    return this.httpClient.get(environment.apiEndpoint + this.USER_ENDPOINT + '/' + username + '/follow', options=options);
  }

  public unfollowUser(username: String) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    let options = { headers: headers };
    return this.httpClient.get(environment.apiEndpoint + this.USER_ENDPOINT + '/' + username + '/unfollow', options=options);
  } 

  private parseToUser(data: any): User {
    data.join_date = this.parseToDate(data.join_date);
    data.birthdate = this.parseToDate(data.birthdate);
    data.links = [];
    return data;
  }  
  
  private parseToDate(dateString: any): Date {
    let date = new Date(dateString);
    date = date ? date : new Date();
    return date;
  }
}
