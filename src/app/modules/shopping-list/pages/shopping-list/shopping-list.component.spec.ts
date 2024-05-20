import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MockComponent, MockService } from 'ng-mocks';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { ShoppingListComponent } from 'src/app/modules/shopping-list/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/modules/shopping-list/components/shopping-edit/shopping-edit.component';

const shoppingListServiceMock = MockService(ShoppingListService, {
  updateIngredient: () => <any>{},
  addIngredient: () => <any>{},
  getIngredients: () => <any>of([{ ingredientName: 'test' }]),
});

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShoppingListComponent,
        MockComponent(ShoppingEditComponent),
      ],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test onEditIngredient()', () => {
    it('should set editedIngredient', () => {
      //Arrange
      component.editedIngredient = undefined;

      const ingredient = <any>{ ingredientName: 'test' };

      //Act
      component.onEditIngredient(ingredient);

      //Assert
      expect(component.editedIngredient).toEqual(ingredient);
    });
  });

  describe('Test onClearEditedIngredient()', () => {
    it('should clear editedIngredient', () => {
      //Arrange
      component.editedIngredient = <any>{ ingredientName: 'test' };

      //Act
      component.onClearEditedIngredient();

      //Assert
      expect(component.editedIngredient).toEqual(null);
    });
  });

  describe('Test onUpdateOrAddIngredient()', () => {
    let updateIngredientSpy: jasmine.Spy;
    let addIngredientSpy: jasmine.Spy;

    beforeEach(() => {
      updateIngredientSpy = spyOn(shoppingListServiceMock, 'updateIngredient');
      addIngredientSpy = spyOn(shoppingListServiceMock, 'addIngredient');
    });

    it('should test duplicate scenario', () => {
      //Arrange
      const addedIngredient = <any>{ ingredientName: 'test' };

      //Act
      component.onUpdateOrAddIngredient(addedIngredient);

      //Assert
      expect(updateIngredientSpy).toHaveBeenCalled();
      expect(addIngredientSpy).not.toHaveBeenCalled();
    });

    it('should test no duplicate scenario', () => {
      //Arrange
      const addedIngredient = <any>{ ingredientName: 'test2' };

      //Act
      component.onUpdateOrAddIngredient(addedIngredient);

      //Assert
      expect(updateIngredientSpy).not.toHaveBeenCalled();
      expect(addIngredientSpy).toHaveBeenCalled();
    });
  });

  describe('Test getIngredients()', () => {
    it('should test success scenario', () => {
      //Arrange
      component.ingredients = undefined;

      const getIngredientsSpy = spyOn(
        shoppingListServiceMock,
        'getIngredients'
      ).and.callThrough();

      //Act
      component['getIngredients']();

      //Assert
      expect(getIngredientsSpy).toHaveBeenCalled();
      expect(component.ingredients).toEqual([<any>{ ingredientName: 'test' }]);
    });
  });
});
