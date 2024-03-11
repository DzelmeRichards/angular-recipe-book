import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeDropdownItem } from 'src/app/modules/recipes/components/recipe-detail/models/dropdown-item.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { dropdownItems } from 'src/app/modules/recipes/components/recipe-detail/config/manage-shopping-list.config';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  ingredients: Ingredient[];
  dropdownItems: RecipeDropdownItem[] = dropdownItems;

  private _id: string;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _recipeService: RecipeService,
    private _shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
    this.getShoppingList();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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

  private getRecipe(): void {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap((params: Params) => {
          this._id = params['id'];
          return this._recipeService.getRecipe(this._id);
        })
      )
      .subscribe({
        next: (recipe: Recipe) => {
          this.recipe = recipe;
        },

        error: (err: Error) => {
          //TODO: Implement global error handling
          console.log('ERROR', err);
        },
      });
  }

  private getShoppingList(): void {
    this._shoppingListService
      .getIngredients()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        },
        error: (err: Error) => {
          //TODO: Implement global error handling
          console.log('ERROR recipe detail', err);
        },
      });
  }

  private onAddToShoppingList(): void {
    let preparedIngredients = this.recipe.ingredients.map(
      (recipeIngredient: Ingredient) => {
        const duplicateIngredient: Ingredient = this.ingredients.find(
          (shoppingListIngredient: Ingredient) =>
            shoppingListIngredient.ingredientName ===
            recipeIngredient.ingredientName
        );

        if (duplicateIngredient) {
          return {
            ...recipeIngredient,
            amount: recipeIngredient.amount + duplicateIngredient.amount,
            id: duplicateIngredient.id,
          };
        } else {
          return recipeIngredient;
        }
      }
    );

    this._shoppingListService.addIngredients(preparedIngredients);
  }

  private onEditRecipe(): void {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  private onDeleteRecipe(): void {
    this._recipeService.deleteRecipe(this._id);

    this._router.navigate(['/recipes']);
  }
}
