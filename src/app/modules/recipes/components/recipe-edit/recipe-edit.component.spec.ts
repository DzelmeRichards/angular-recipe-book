import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';
import { RecipeEditComponent } from 'src/app/modules/recipes/components/recipe-edit/recipe-edit.component';

const recipeServiceMock = MockService(RecipeService, {
  updateRecipe: () => <any>of({}),
  addRecipe: () => <any>of({}),
  getRecipe: () => <any>of({}),
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
