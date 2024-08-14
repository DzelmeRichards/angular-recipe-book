import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Database,
  listVal,
  objectVal,
  ref,
  set,
  remove,
  push,
  child,
} from '@angular/fire/database';

import type { Recipe } from 'src/app/shared/models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private _db: Database) {}

  getRecipes(): Observable<Recipe[]> {
    return listVal<Recipe>(ref(this._db, 'recipes'), { keyField: 'id' });
  }

  getRecipe(id: string): Observable<Recipe | null> {
    return objectVal<Recipe>(ref(this._db, `recipes/${id}`));
  }

  addRecipe(recipe: Recipe): void {
    const newRef = push(child(ref(this._db), 'recipes'));
    set(newRef, recipe);
  }

  updateRecipe(id: string, recipe: Recipe): void {
    set(ref(this._db, `recipes/${id}`), recipe);
  }

  deleteRecipe(id: string): void {
    remove(ref(this._db, `recipes/${id}`));
  }
}
