import { Component } from '@angular/core';

import { ThemeService } from 'src/app/core/services/theme/theme.service';

import { navLinks } from 'src/app/core/header/config/navigation.config';
import { NavigationLink } from 'src/app/core/header/models/navigation-link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;

  navLinks: NavigationLink[] = navLinks;

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
