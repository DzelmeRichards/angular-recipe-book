import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeItemComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-item/recipe-item.component';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeItemComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;

    component.recipe = <any>{id: '1'};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
