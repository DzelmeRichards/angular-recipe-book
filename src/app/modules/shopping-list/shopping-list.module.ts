import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingListRoutingModule } from 'src/app/modules/shopping-list/shopping-list-routing.module';

import { ShoppingListComponent } from 'src/app/modules/shopping-list/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/modules/shopping-list/components/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [CommonModule, ShoppingListRoutingModule, ReactiveFormsModule],
})
export class ShoppingListModule {}
