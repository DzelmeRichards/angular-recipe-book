import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { RecipeEditComponent } from 'src/app/modules/recipes/components/recipe-edit/recipe-edit.component';

const recipeServiceMock = MockService(RecipeService, {
  updateRecipe: () => <any>of({}),
  addRecipe: () => <any>of({}),
  getRecipe: () => <any>of({ ingredients: [{}, {}] }),
});

const activatedRouteMock = MockService(ActivatedRoute, {
  params: of({ id: '1' }),
});

const routerMock = MockService(Router, {
  navigate: () => <any>of({}),
});

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    let finishEditSpy: jasmine.Spy;

    beforeEach(() => {
      finishEditSpy = spyOn(component, 'onFinishEditing');
    });

    it('should test isEditMode scenario', () => {
      //Arrange
      component['_isEditMode'] = true;
      const updateRecipeSpy = spyOn(recipeServiceMock, 'updateRecipe');

      //Act
      component.onSubmit();

      //Assert
      expect(updateRecipeSpy).toHaveBeenCalled();
      expect(finishEditSpy).toHaveBeenCalled();
    });

    it('should test !isEditMode scenario', () => {
      //Arrange
      component['_isEditMode'] = false;
      const addRecipeSpy = spyOn(recipeServiceMock, 'addRecipe');

      //Act
      component.onSubmit();

      //Assert
      expect(addRecipeSpy).toHaveBeenCalled();
      expect(finishEditSpy).toHaveBeenCalled();
    });
  });

  describe('Test onAddIngredient()', () => {
    it('should add a new ingredient FormGroup to the ingredientFormArray', () => {
      //Arrange
      const initialLength = component.ingredientFormArray.length;

      //Act
      component.onAddIngredient();

      //Assert
      expect(component.ingredientFormArray.length).toBe(initialLength + 1);
    });
  });

  describe('Test onDeleteIngredient()', () => {
    it('should remove ingredient FormGroup from ingredientFormArray by index', () => {
      //Arrange
      const initialLength = component.ingredientFormArray.length;

      //Act
      component.onDeleteIngredient(0);

      //Assert
      expect(component.ingredientFormArray.length).toBe(initialLength - 1);
    });
  });

  describe('Test onFinishEditing()', () => {
    it('should navigate one level up relative to the current route', () => {
      //Arrange
      const navigateSpy = spyOn(routerMock, 'navigate');

      //Act
      component.onFinishEditing();

      //Assert
      expect(navigateSpy).toHaveBeenCalledWith(['../'], {
        relativeTo: component['_route'],
      });
    });
  });

  describe('Test initComponentData()', () => {
    it('should test route params id scenario', () => {
      //Arrange
      const getRecipeSpy = spyOn(
        recipeServiceMock,
        'getRecipe'
      ).and.callThrough();
      const populateFormSpy = spyOn<any>(component, 'populateFormOnEdit');

      //Act
      component['initComponentData']();

      //Assert
      expect(getRecipeSpy).toHaveBeenCalled();
      expect(populateFormSpy).toHaveBeenCalled();
    });
  });

  describe('Test populateFormOnEdit()', () => {
    it('should push recipe ingredients into ingredientFormArray', () => {
      //Arrange
      const recipeMock = <any>{ ingredients: [{}, {}] };
      const initialLength = component.ingredientFormArray.length;

      //Act
      component['populateFormOnEdit'](recipeMock);

      //Assert
      expect(component.ingredientFormArray.length).toBe(initialLength + 2);
    });
  });
});
