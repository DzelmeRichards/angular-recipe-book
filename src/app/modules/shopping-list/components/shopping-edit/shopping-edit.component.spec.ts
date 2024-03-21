import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MockService } from 'ng-mocks';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

import { ShoppingEditComponent } from 'src/app/modules/shopping-list/components/shopping-edit/shopping-edit.component';

const shoppingListServiceMock = MockService(ShoppingListService, {
  updateIngredient: () => <any>{},
  deleteIngredient: () => <any>{},
});

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
