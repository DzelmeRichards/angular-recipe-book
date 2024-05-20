import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';

import { MockProvider } from 'ng-mocks';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(Database)],
    });

    service = TestBed.inject(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
