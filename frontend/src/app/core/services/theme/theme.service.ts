import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkTheme: boolean = true;
  constructor(public overlayContainer: OverlayContainer) {
    const userPrefersLocal = localStorage.getItem('prefers-color-scheme'); //=== 'Light' ? false : true;
    const userPrefersLightBrowser = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (userPrefersLocal) {
      this.isDarkTheme = userPrefersLocal === 'light' ? false : true;
    } else {
      this.isDarkTheme = !userPrefersLightBrowser
    }
    this.setOverlayContainer();
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.storeThemeSelection();
    this.setOverlayContainer();
  }

  storeThemeSelection() {
    localStorage.setItem('prefers-color-scheme', this.isDarkTheme ? "dark" : "light")
  }

  setOverlayContainer() {
    if (this.isDarkTheme) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme-mode');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme-mode');
    }
  }
}
