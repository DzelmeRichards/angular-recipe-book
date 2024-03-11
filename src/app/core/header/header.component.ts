import { Component } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }
}
