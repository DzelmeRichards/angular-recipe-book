import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeDropdownItem } from 'src/app/modules/recipes/models/dropdown-item.model';
import { dropdownItems } from 'src/app/modules/recipes/config/manage-shopping-list.config';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  dropdownItems: RecipeDropdownItem[] = dropdownItems;

  constructor(
    private _recipeService: RecipeService,
    private _shoppingListService: ShoppingListService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.recipe = this._recipeService.getRecipe(this.id);
      // this.recipe = this._recipeService.getRecipe(+params['id']);
    });
  }

  onAddToShoppingList(): void {
    this._shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  onDeleteRecipe(): void {
    this._recipeService.deleteRecipe(this.id);

    this._router.navigate(['/recipes']);
  }

  onExecuteAction(action: string): void {
    switch (action) {
      case 'Add':
        this.onAddToShoppingList();
        break;

      case 'Edit':
        this.onEditRecipe();
        break;

      case 'Delete':
        this.onDeleteRecipe();
        break;

      default:
        console.warn('Unknown action');
    }
  }
}
