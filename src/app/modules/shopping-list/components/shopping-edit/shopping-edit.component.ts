import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() editedIngredient: Ingredient;
  @Output() addIngredient = new EventEmitter<Ingredient>();
  @Output() clearEditedIngredient = new EventEmitter<void>();

  shoppingListForm: FormGroup;
  isEditMode = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editedIngredient'] && this.editedIngredient) {
      this.isEditMode = true;

      this.shoppingListForm.patchValue({
        ingredientName: this.editedIngredient.ingredientName,
        amount: this.editedIngredient.amount,
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onClear(): void {
    this.shoppingListForm.reset();
    this.editedIngredient = null;
    if(this.isEditMode) this.clearEditedIngredient.emit();
    this.isEditMode = false;
  }

  onSubmit(): void {
    this.isEditMode
      ? this._shoppingListService.updateIngredient(
          this.editedIngredient.id,
          this.shoppingListForm.value
        )
      : this.addIngredient.emit(this.shoppingListForm.value);

    this.onClear();
  }

  onDelete(): void {
    this._shoppingListService.deleteIngredient(this.editedIngredient.id);

    this.onClear();
  }

  get name(): AbstractControl {
    return this.shoppingListForm.get('ingredientName');
  }

  get amount(): AbstractControl {
    return this.shoppingListForm.get('amount');
  }

  private formInit(): void {
    this.shoppingListForm = this._fb.group({
      ingredientName: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }
}
