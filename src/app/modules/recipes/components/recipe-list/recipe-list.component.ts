import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._recipeService.recipesChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (recipes: Recipe[]) => {
          this.recipes = recipes;
        },
      });

    // this.recipes = this._recipeService.getRecipes();
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipes = this._recipeService.getRecipes();
  }

  onNewRecipe(): void {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
