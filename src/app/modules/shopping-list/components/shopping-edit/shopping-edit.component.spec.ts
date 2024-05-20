import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MockService } from 'ng-mocks';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { ShoppingEditComponent } from 'src/app/modules/shopping-list/components/shopping-edit/shopping-edit.component';

const shoppingListServiceMock = MockService(ShoppingListService, {
  updateIngredient: () => <any>{},
  deleteIngredient: () => <any>{},
});

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let onClearSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    onClearSpy = spyOn(component, 'onClear').and.callThrough();
    component.editedIngredient = <any>{ id: 'test' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test ngOnChanges()', () => {
    let patchValueSpy: jasmine.Spy;

    beforeEach(() => {
      patchValueSpy = spyOn(component.shoppingListForm, 'patchValue');
    });

    it('should update form and mode on input change to defined value', () => {
      //Arrange
      component.isEditMode = false;

      const newIngredient = <any>{
        ingredientName: 'Tomatoes',
        amount: 10,
      };

      const changesObj: SimpleChanges = {
        editedIngredient: {
          currentValue: newIngredient,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      };

      //Act
      component.ngOnChanges(changesObj as SimpleChanges);

      //Assert
      expect(component.isEditMode).toBe(true);
      expect(patchValueSpy).toHaveBeenCalled();
    });

    it('should not call form patchValue if editedIngredient is undefined', () => {
      //Arrange
      component.editedIngredient = undefined;

      const changesObj: SimpleChanges = {};

      //Act
      component.ngOnChanges(changesObj as SimpleChanges);

      //Assert
      expect(component.isEditMode).toBe(false);
      expect(patchValueSpy).not.toHaveBeenCalled();
    });
  });

  describe('Test onClear()', () => {
    let clearEditedIngredientSpy: jasmine.Spy;
    let resetFormSpy: jasmine.Spy;

    beforeEach(() => {
      clearEditedIngredientSpy = spyOn(component.clearEditedIngredient, 'emit');
      resetFormSpy = spyOn(component.shoppingListForm, 'reset');
    });

    it('should test !isEditMode scenario', () => {
      //Arrange
      component.isEditMode = false;

      //Act
      component.onClear();

      //Assert
      expect(resetFormSpy).toHaveBeenCalled();
      expect(component.editedIngredient).toEqual(null);
      expect(clearEditedIngredientSpy).not.toHaveBeenCalled();
    });

    it('should test isEditMode scenario', () => {
      //Arrange
      component.isEditMode = true;

      //Act
      component.onClear();

      //Assert
      expect(resetFormSpy).toHaveBeenCalled();
      expect(component.editedIngredient).toEqual(null);
      expect(clearEditedIngredientSpy).toHaveBeenCalled();
      expect(component.isEditMode).toBe(false);
    });
  });

  describe('Test onSubmit()', () => {
    it('should test isEditMode scenario', () => {
      //Arrange
      component.isEditMode = true;

      const updateIngredientSpy = spyOn(
        shoppingListServiceMock,
        'updateIngredient'
      );

      //Act
      component.onSubmit();

      //Assert
      expect(updateIngredientSpy).toHaveBeenCalled();
      expect(onClearSpy).toHaveBeenCalled();
    });

    it('should test !isEditMode scenario', () => {
      //Arrange
      component.isEditMode = false;

      const addIngredientSpy = spyOn(component.addIngredient, 'emit');

      //Act
      component.onSubmit();

      //Assert
      expect(onClearSpy).toHaveBeenCalled();
      expect(addIngredientSpy).toHaveBeenCalled();
    });
  });

  describe('Test onDelete()', () => {
    it('should make expected calls', () => {
      //Arrange

      const deleteIngredientSpy = spyOn(
        shoppingListServiceMock,
        'deleteIngredient'
      );

      //Act
      component.onDelete();

      //Assert
      expect(deleteIngredientSpy).toHaveBeenCalled();
      expect(onClearSpy).toHaveBeenCalled();
    });
  });
});
