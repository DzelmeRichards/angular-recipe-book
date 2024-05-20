import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { MockComponent, MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';
import { RecipeDetailComponent } from 'src/app/modules/recipes/components/recipe-detail/recipe-detail.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';

const recipeServiceMock = MockService(RecipeService, {
  getRecipe: () => <any>of({}),
  deleteRecipe: () => <any>of({}),
});

const shoppingListServiceMock = MockService(ShoppingListService, {
  getIngredients: () =>
    <any>of([{ ingredientName: 'Test', amount: 1, id: 'Test_id' }]),
  addIngredients: () => <any>of({}),
});

const activatedRouteMock = MockService(ActivatedRoute, {
  params: of({ id: '1' }),
});

const routerMock = MockService(Router, {
  navigate: () => <any>of({}),
});

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent, MockComponent(DropdownComponent)],
      imports: [RouterTestingModule],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test onExecuteAction()', () => {
    it('should call onAddToShoppingList()', () => {
      //Arrange
      const addToListSpy = spyOn<any>(component, 'onAddToShoppingList');

      //Act
      component.onExecuteAction('Add');

      //Assert
      expect(addToListSpy).toHaveBeenCalled();
    });

    it('should call onEditRecipe()', () => {
      //Arrange
      const editRecipeSpy = spyOn<any>(component, 'onEditRecipe');

      //Act
      component.onExecuteAction('Edit');

      //Assert
      expect(editRecipeSpy).toHaveBeenCalled();
    });

    it('should call onDeleteRecipe()', () => {
      //Arrange
      const deleteRecipeSpy = spyOn<any>(component, 'onDeleteRecipe');

      //Act
      component.onExecuteAction('Delete');

      //Assert
      expect(deleteRecipeSpy).toHaveBeenCalled();
    });

    it('should warn on console for unknown action', () => {
      //Arrange
      const warnSpy = spyOn(console, 'warn');

      //Act
      component.onExecuteAction('Test');

      //Assert
      expect(warnSpy).toHaveBeenCalled();
    });
  });

  describe('Test getRecipe()', () => {
    it('should set recipe', () => {
      //Arrange
      spyOn(recipeServiceMock, 'getRecipe').and.callThrough();
      component.recipe = undefined;

      //Act
      component['getRecipe']();

      //Assert
      expect(component.recipe).toBeDefined();
    });
  });

  describe('Test getShoppingList()', () => {
    it('should set ingredients', () => {
      //Arrange
      spyOn(shoppingListServiceMock, 'getIngredients').and.callThrough();
      component.ingredients = undefined;

      //Act
      component['getShoppingList']();

      //Assert
      expect(component.ingredients.length).toBeGreaterThan(0);
    });
  });

  describe('Test onAddToShoppingList()', () => {
    let addIngredientSpy: jasmine.Spy;

    beforeEach(() => {
      addIngredientSpy = spyOn(
        shoppingListServiceMock,
        'addIngredients'
      ).and.callThrough();
    });

    it('should test duplicate ingredient scenario', () => {
      //Arrange
      component.recipe = <any>{
        ingredients: [{ ingredientName: 'Test', amount: 1 }],
      };

      //Act
      component['onAddToShoppingList']();

      //Assert
      expect(addIngredientSpy).toHaveBeenCalledWith([
        {
          ingredientName: 'Test',
          amount: 2,
          id: 'Test_id',
        },
      ]);
    });

    it('should test no duplicate ingredient scenario', () => {
      //Arrange
      component.recipe = <any>{
        ingredients: [{ ingredientName: 'Test2', amount: 1 }],
      };

      //Act
      component['onAddToShoppingList']();

      //Assert
      expect(addIngredientSpy).toHaveBeenCalledWith([
        { ingredientName: 'Test2', amount: 1 },
      ]);
    });
  });

  describe('Test onEditRecipe()', () => {
    it('should navigate to the edit page', () => {
      //Arrange
      const navigateSpy = spyOn(routerMock, 'navigate');

      //Act
      component['onEditRecipe']();

      //Assert
      expect(navigateSpy).toHaveBeenCalledWith(['edit'], {
        relativeTo: component['_route'],
      });
    });
  });

  describe('Test onDeleteRecipe()', () => {
    it('should call deleteRecipe and navgate to recipes list', () => {
      //Arrange
      const navigateSpy = spyOn(routerMock, 'navigate');
      const deleteSpy = spyOn(recipeServiceMock, 'deleteRecipe');

      //Act
      component['onDeleteRecipe']();

      //Assert
      expect(navigateSpy).toHaveBeenCalledWith(['/recipes']);
      expect(recipeServiceMock.deleteRecipe).toHaveBeenCalled();
    });
  });
});
