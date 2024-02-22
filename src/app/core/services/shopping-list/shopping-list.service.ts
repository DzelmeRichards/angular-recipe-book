import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>(); //NAME???

  private _ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
  ];

  getIngredient(index: number): Ingredient {
    return this._ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  //JA ATKARTOJAS LAI PLUSO NEVIS PIEVIENO

  addIngredient(ingredient: Ingredient): void {
    this._ingredients.push(ingredient);

    this.ingredientsChanged.next(this._ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this._ingredients[index] = newIngredient;

    this.ingredientsChanged.next(this._ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1);

    this.ingredientsChanged.next(this._ingredients.slice());
  }

  // addIngredients(ingredients: Ingredient[]): void {
  //   this._ingredients.push(...ingredients);

  //   this.ingredientsChanged.next(this._ingredients.slice());
  // }

  addIngredients(newIngredients: Ingredient[]): void {
    for (const newIngredient of newIngredients) {
      const existingIngredientIndex = this._ingredients.findIndex(ing => ing.name === newIngredient.name);
      if (existingIngredientIndex !== -1) {
        // Ingredient exists, update the amount.
        this._ingredients[existingIngredientIndex].amount += newIngredient.amount;
      } else {
        // New ingredient, add to the list.
        this._ingredients.push(newIngredient);
      }
    }
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
