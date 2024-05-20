import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { MockComponent, MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { RecipeListComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-list.component';
import { RecipeItemComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-item/recipe-item.component';

const recipeServiceMock = MockService(RecipeService, {
  getRecipes: () => <any>of([{}]),
});

const routerMock = MockService(Router, {
  navigate: () => <any>of({}),
});

const activatedRouteMock = MockService(ActivatedRoute, {
  params: of({}),
});

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent, MockComponent(RecipeItemComponent)],
      imports: [RouterTestingModule],
      providers: [
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test onNewRecipe()', () => {
    it('should navigate to new recipe relative to current route', () => {
      //Arrange
      const navigateSpy = spyOn(routerMock, 'navigate');

      //Act
      component.onNewRecipe();

      //Assert
      expect(navigateSpy).toHaveBeenCalledWith(['new'], {
        relativeTo: component['_route'],
      });
    });
  });

  describe('Test getRecipes()', () => {
    it('should set recipes', () => {
      //Arrange
      component.recipes = [];

      //Act
      component['getRecipes']();

      //Assert
      expect(component.recipes.length).toBeGreaterThan(0);
    });
  });
});
