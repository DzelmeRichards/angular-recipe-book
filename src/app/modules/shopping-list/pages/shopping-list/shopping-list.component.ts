import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

import type { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  editedIngredient: Ingredient = null;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _shoppingListService: ShoppingListService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getIngredients();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onEditIngredient(ingredient: Ingredient): void {
    this.editedIngredient = { ...ingredient };
  }

  onClearEditedIngredient(): void {
    this.editedIngredient = null;
  }

  onUpdateOrAddIngredient(addedIngredient: Ingredient): void {
    const duplicate: Ingredient = this.ingredients.find(
      (ingredient: Ingredient) =>
        ingredient.ingredientName === addedIngredient.ingredientName
    );

    if (duplicate) {
      const ingredientUpdate: Ingredient = {
        ...duplicate,
        amount: duplicate.amount + addedIngredient.amount,
      };

      this._shoppingListService.updateIngredient(
        duplicate.id,
        ingredientUpdate
      );
    } else {
      this._shoppingListService.addIngredient(addedIngredient);
    }
  }

  private getIngredients(): void {
    this._loadingService.showLoading();

    this._shoppingListService
      .getIngredients()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;

          this._loadingService.hideLoading();
        },
      });
  }
}
