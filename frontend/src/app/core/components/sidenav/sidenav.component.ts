import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public themesService: ThemeService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onUpdate();
    this.authenticationService.isLoggedIn.subscribe((data) => this.isLoggedIn = data);
  }

  private onUpdate() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authenticationService.checkAuthentication();
      }
    });
  }

}
