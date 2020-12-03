import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public isDarkTheme: boolean = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    const userPrefersLocal = localStorage.getItem('prefers-color-scheme'); //=== 'Light' ? false : true;
    const userPrefersLightBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (userPrefersLocal) {
      this.isDarkTheme = userPrefersLocal === 'light' ? false : true;
    } else {
      this.isDarkTheme = !userPrefersLightBrowser
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.storeThemeSelection();
  }

  storeThemeSelection() {
    localStorage.setItem('prefers-color-scheme', this.isDarkTheme ? "dark" : "light")
  }

  login(){
    alert("ASd");
  }
}
