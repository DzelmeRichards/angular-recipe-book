import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from 'src/app/modules/recipes/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/app/modules/recipes/components/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from 'src/app/modules/recipes/components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'src/app/modules/recipes/components/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
