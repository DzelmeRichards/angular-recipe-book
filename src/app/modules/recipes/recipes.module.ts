import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from 'src/app/modules/recipes/recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { RecipesComponent } from 'src/app/modules/recipes/pages/recipes/recipes.component';
import { RecipeListComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from 'src/app/modules/recipes/components/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from 'src/app/modules/recipes/components/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/app/modules/recipes/components/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
