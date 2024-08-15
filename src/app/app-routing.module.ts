import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';
import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('src/app/modules/recipes/recipes.module').then(
        (m) => m.RecipesModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('src/app/modules/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
