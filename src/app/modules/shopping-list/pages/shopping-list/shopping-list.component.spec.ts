import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MockComponent, MockService } from 'ng-mocks';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { ShoppingListComponent } from 'src/app/modules/shopping-list/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/modules/shopping-list/components/shopping-edit/shopping-edit.component';

const shoppingListServiceMock = MockService(ShoppingListService, {
  updateIngredient: () => <any>{},
  addIngredient: () => <any>{},
  getIngredients: () => <any>of([{}]),
});

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent, MockComponent(ShoppingEditComponent)],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
