import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from 'src/app/modules/shopping-list/pages/shopping-list/shopping-list.component';

const routes: Routes = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
