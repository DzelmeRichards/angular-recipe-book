import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/shared/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    {
      name: 'Big fat burger',
      description: 'Best burger in the world',
      imagePath:
        'https://d1ralsognjng37.cloudfront.net/5ba0e4cb-61aa-4786-9263-c5d0045a4c59.jpeg',
      ingredients: [
        { name: 'Burger bun', amount: 2 },
        { name: 'Patty', amount: 1 },
        { name: 'Salad', amount: 1 },
        { name: 'Tomato', amount: 1 },
      ],
    },
    {
      name: 'Pork snitzel',
      description: 'Authentic German Schnitzel',
      imagePath:
        'https://www.allrecipes.com/thmb/bu4s12dq2GNt-kgi9R8sZTrhQYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pork-Schnitzel-ddmfs-3x2-113-7c044e725d604cb0b2a3827b63a7f6f6.jpg',
      ingredients: [
        { name: 'Lemon', amount: 1 },
        { name: 'Pork meat', amount: 1 },
        { name: 'Egg', amount: 2 },
      ],
    },
  ];

  // constructor(private _shoppingListService: ShoppingListService) {}

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]): void {
  //   this._shoppingListService.addIngredients(ingredients);
  // }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);

    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;

    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);

    this.recipesChanged.next(this.recipes.slice());
  }
}
