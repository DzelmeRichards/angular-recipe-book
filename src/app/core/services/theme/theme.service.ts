import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = false;

  private themeKey = 'theme';
  private darkClassName = 'dark';
  private lightClassName = 'light';

  constructor() {
    this.initializeTheme();
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
    const localstorageTheme: string | null = localStorage.getItem(
      this.themeKey
    );

    const isDeviceDarkmode: boolean = window.matchMedia(
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
