import { Injectable } from '@angular/core';
import { from, Observable, tap } from 'rxjs';
import {
  Database,
  listVal,
  ref,
  set,
  remove,
  push,
  child,
  update,
} from '@angular/fire/database';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';

import type { Ingredient } from 'src/app/shared/models/ingredient.model';
import type { IngredientDto } from 'src/app/core/services/shopping-list/models/ingredient-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(
    private _db: Database,
    private _popupMessageService: PopupMessageService
  ) {}

  getIngredients(): Observable<Ingredient[]> {
    return listVal<Ingredient>(ref(this._db, 'shopping-list'), {
      keyField: 'id',
    });
  }

  addIngredient(ingredient: Ingredient): void {
    const newRef = push(child(ref(this._db), 'shopping-list'));
    set(newRef, ingredient);
  }

  addIngredients(newIngredients: Ingredient[]): Observable<void> {
    return from(
      update(ref(this._db), this.buildUpdatelist(newIngredients))
    ).pipe(
      tap(() => {
        this._popupMessageService.addMessage({
          text: 'Success: Ingredients sent to shopping list',
          type: 'success',
        });
      })
    );
  }

  updateIngredient(id: string, newIngredient: Ingredient): void {
    set(ref(this._db, `shopping-list/${id}`), newIngredient);
  }

  deleteIngredient(id: string): void {
    remove(ref(this._db, `shopping-list/${id}`));
  }

  private buildUpdatelist(newIngredients: Ingredient[]): IngredientDto {
    let ingredientDto: IngredientDto = {};

    newIngredients.forEach((ingredient: Ingredient) => {
      if (ingredient.id) {
        ingredientDto['/shopping-list/' + ingredient.id] = ingredient;
      } else {
        const key = push(child(ref(this._db), 'shopping-list')).key;
        ingredientDto['/shopping-list/' + key] = ingredient;
      }
    });

    return ingredientDto;
  }
}
