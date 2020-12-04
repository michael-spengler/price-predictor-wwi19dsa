import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  isDarkTheme: boolean = true;
  constructor() {
    const userPrefersLocal = localStorage.getItem('prefers-color-scheme'); //=== 'Light' ? false : true;
    const userPrefersLightBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (userPrefersLocal) {
      this.isDarkTheme = userPrefersLocal === 'light' ? false : true;
    } else {
      this.isDarkTheme = !userPrefersLightBrowser
    }
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.storeThemeSelection();
  }

  storeThemeSelection() {
    localStorage.setItem('prefers-color-scheme', this.isDarkTheme ? "dark" : "light")
  }
}
