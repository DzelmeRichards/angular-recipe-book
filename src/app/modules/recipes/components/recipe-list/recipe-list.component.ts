import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

import type { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _recipeService: RecipeService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onNewRecipe(): void {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  recipeTrackBy(index: number, recipe: Recipe): string {
    return recipe.id;
  }

  private getRecipes(): void {
    this._loadingService.showLoading();

    this._recipeService
      .getRecipes()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;

          this._loadingService.hideLoading();
        },
      });
  }
}
