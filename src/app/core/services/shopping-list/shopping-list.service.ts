import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngredientDto } from 'src/app/core/services/shopping-list/models/ingredient-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private _db: Database) {}

  getIngredients(): Observable<Ingredient[]> {
    return listVal<Ingredient>(ref(this._db, 'shopping-list'), {
      keyField: 'id',
    });
  }

  addIngredient(ingredient: Ingredient): void {
    const newRef = push(child(ref(this._db), 'shopping-list'));
    set(newRef, ingredient);
  }

  addIngredients(newIngredients: Ingredient[]): void {
    update(ref(this._db), this.buildUpdatelist(newIngredients));
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
