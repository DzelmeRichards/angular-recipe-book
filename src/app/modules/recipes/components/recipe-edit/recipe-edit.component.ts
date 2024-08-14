import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subject, of, switchMap, takeUntil } from 'rxjs';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

import type { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;

  private _id: string;
  private _isEditMode = false;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _recipeService: RecipeService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.initComponentData();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onSubmit(): void {
    const formValue: Recipe = this.recipeForm.value;

    this._isEditMode
      ? this._recipeService.updateRecipe(this._id, formValue)
      : this._recipeService.addRecipe(formValue);

    this.onFinishEditing();
  }

  onAddIngredient(): void {
    this.ingredientFormArray.push(
      this._fb.group({
        ingredientName: ['', Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]],
      })
    );
  }

  onDeleteIngredient(index: number): void {
    this.ingredientFormArray.removeAt(index);
  }

  onFinishEditing(): void {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  get ingredientFormArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get name(): AbstractControl {
    return this.recipeForm.get('name');
  }

  get imagePath(): AbstractControl {
    return this.recipeForm.get('imagePath');
  }

  get description(): AbstractControl {
    return this.recipeForm.get('description');
  }

  private initComponentData(): void {
    this._loadingService.showLoading();

    this._route.params
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap((params: Params) => {
          this._id = params['id'];
          this._isEditMode = !!params['id'];

          return this._isEditMode
            ? this._recipeService.getRecipe(this._id)
            : of(null);
        })
      )
      .subscribe({
        next: (recipe: Recipe) => {
          if (recipe) this.populateFormOnEdit(recipe);

          this._loadingService.hideLoading();
        },
      });
  }

  private formInit(): void {
    this.recipeForm = this._fb.group({
      name: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this._fb.array([]),
    });
  }

  private populateFormOnEdit(recipe: Recipe): void {
    const { name, imagePath, description } = recipe;

    if (recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        this.ingredientFormArray.push(
          this._fb.group({
            ingredientName: [ingredient.ingredientName, Validators.required],
            amount: [
              ingredient.amount,
              [Validators.required, Validators.min(1)],
            ],
          })
        );
      }
    }

    this.recipeForm.patchValue({
      name: name,
      imagePath: imagePath,
      description: description,
    });
  }
}
