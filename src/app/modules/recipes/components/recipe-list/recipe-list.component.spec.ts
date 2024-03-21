import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MockComponent, MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

import { RecipeListComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-list.component';
import { RecipeItemComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-item/recipe-item.component';

const recipeServiceMock = MockService(RecipeService, {
  getRecipes: () => <any>of([{}])
})

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent, MockComponent(RecipeItemComponent)],
      imports: [RouterTestingModule],
      providers: [{provide: RecipeService, useValue: recipeServiceMock}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
