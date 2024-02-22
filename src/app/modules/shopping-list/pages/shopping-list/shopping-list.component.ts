import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this._shoppingListService.getIngredients();

    this._shoppingListService.ingredientsChanged
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        },
      });
  }

  onEditItem(index: number): void {
    this._shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
