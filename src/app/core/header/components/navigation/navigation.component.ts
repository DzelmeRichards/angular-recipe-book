import { Component, Input } from '@angular/core';

import { NavigationLink } from 'src/app/core/header/components/navigation/models/navigation-link.model';
import { navLinks } from 'src/app/core/header/components/navigation/config/navigation.config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @Input() direction: 'row' | 'column'
  
  navLinks: NavigationLink[] = navLinks;

}
