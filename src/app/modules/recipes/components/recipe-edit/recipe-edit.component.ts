import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;

  id: number;
  isEditMode = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = !!params['id'];

      this.formInit();
    });
  }

  getRecipe(): Recipe {
    return this._recipeService.getRecipe(this.id);
  }

  formInit(): void {
    let recipeName = '';
    let imagePath = '';
    let recipeDescription = '';

    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.getRecipe();

      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this._fb.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.min(1)],
              ],
            })
          );
        }
      }
    }

    this.recipeForm = this._fb.group({
      name: [recipeName, Validators.required],
      imagePath: [imagePath, Validators.required],
      description: [recipeDescription, Validators.required],

      ingredients: recipeIngredients,
    });
  }

  onSubmit(): void {
    const formValue = this.recipeForm.value;

    this.isEditMode
      ? this._recipeService.updateRecipe(this.id, formValue)
      : this._recipeService.addRecipe(formValue);

    this.onFinishEditing();
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this._fb.group({
        name: ['', Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]],
      })
    );
  }

  onFinishEditing(): void {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get controls(): FormGroup[] {
    return (this.recipeForm.get('ingredients') as FormArray)
      .controls as FormGroup[];
  }
}
