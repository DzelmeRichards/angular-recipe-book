import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  private themeKey = 'theme';
  private darkClassName = 'dark';
  private lightClassName = 'light';

  constructor() {
    this.initializeTheme();
  }

  isDarkTheme(): boolean {
    return this.isDarkMode;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    localStorage.setItem(
      this.themeKey,
      this.isDarkMode ? this.darkClassName : this.lightClassName
    );

    this.applyTheme();
  }

  private initializeTheme(): void {
    const localstorageTheme = localStorage.getItem(this.themeKey);

    const isDeviceDarkmode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (!localstorageTheme && isDeviceDarkmode) {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = localstorageTheme === this.darkClassName;
    }

    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle(this.darkClassName, this.isDarkMode);
  }
}
