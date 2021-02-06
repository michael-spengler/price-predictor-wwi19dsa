import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormControl } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],   
})

export class SidenavComponent implements OnInit{
  isLoggedIn: boolean = false;
  langs = [
    {
      "code": "en-US",
      "label": "English"
    },
    {
      "code": "de",
      "label": "Deutsch"
    }
  ];
  usernames: string[] = [];
  control1: FormControl = new FormControl('');
  userFound: Boolean = false;
  visibleSearch: Boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themesService: ThemeService,
    public authService: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.onUpdate();
    this.authService.checkAuthentication();
    this.authService.isLoggedIn.subscribe((data) => this.isLoggedIn = data);

    let headers;
    try {
      const token = this.authService.getToken();
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });
    }catch {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }

    let options = { headers: headers };
    this.httpClient.get(environment.apiEndpoint + 'users', options).subscribe((result: any) => {
      try {
        this.usernames = result.data;  
      } catch {
        this._snackBar.open('Error. There are some troubles with loading the users. Please try again!', 'Close');
      }
    }, error => {
      this._snackBar.open('Error. There are some troubles with reaching the server. Please contact our Admin!', 'Close');
    });
  }

  openSearch() {
    this.visibleSearch = true;
    this.control1.setValue("");
  }

  closeSearch(){
    this.visibleSearch = false;
    this.control1.setValue("");
  }

  usernamesFilteredOptions: Observable<string[]> = this.control1.valueChanges
  .pipe(
    startWith(''),
    map(value => this.usernamesFilter(value))
  );

  private usernamesFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    var userList = this.usernames.filter(option => option.toLowerCase().includes(filterValue)).slice(0, 5);
    if (value = "") {
      return userList;
    }
    return userList.length ? userList : ['No User was found'];
  }

  _allowSelection(option: string): { [className: string]: boolean } {
    return {
      'no-data': option === 'No User was found',
    }
  }

  private onUpdate() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authService.checkAuthentication();
      }
    });
  }

  public userClicked(user: string) {
    console.log(user); //router
  }
}