import { Ingredient } from "src/app/shared/models/ingredient.model";

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  id?: string;

  ingredients: Ingredient[];
}