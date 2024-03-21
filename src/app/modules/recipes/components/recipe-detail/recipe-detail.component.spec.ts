import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
  getIngredients: () => <any>of({}),
  addIngredients: () => <any>of({}),
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
