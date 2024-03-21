import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHomeComponent } from 'src/app/modules/recipes/components/recipe-home/recipe-home.component';

describe('RecipeStartComponent', () => {
  let component: RecipeHomeComponent;
  let fixture: ComponentFixture<RecipeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
