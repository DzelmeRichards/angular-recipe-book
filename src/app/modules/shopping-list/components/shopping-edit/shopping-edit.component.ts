import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup;

  isEditMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  unsubscribe$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.formInit();

    this.editInit();
  }

  editInit(): void {
    this._shoppingListService.startedEditing
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (index: number) => {
          this.editedItemIndex = index;
          this.isEditMode = true;
          this.editedItem = this._shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        },
      });
  }

  formInit(): void {
    this.shoppingListForm = this._fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this._shoppingListService.updateIngredient(
        this.editedItemIndex,
        this.shoppingListForm.value
      );
    } else {
      this._shoppingListService.addIngredient(this.shoppingListForm.value);
    }

    this.onClear();
  }

  onClear(): void {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onDelete(): void {
    this._shoppingListService.deleteIngredient(this.editedItemIndex);
    
    this.onClear();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
