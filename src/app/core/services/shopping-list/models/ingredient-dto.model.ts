import { Ingredient } from "src/app/shared/models/ingredient.model";

export interface IngredientDto {
  [key: string]: Ingredient;
}