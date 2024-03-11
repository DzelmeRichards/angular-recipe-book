import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from 'src/app/core/header/header.component';
import { NavigationComponent } from 'src/app/core/header/components/navigation/navigation.component';
import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
