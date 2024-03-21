import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';

import { ShoppingListService } from 'src/app/core/services/shopping-list/shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  let mockDatabase: jasmine.SpyObj<Database>; //??????????????

  beforeEach(() => {
    // mockDatabase = MockService(Database) as jasmine.SpyObj<Database>; //????????

    TestBed.configureTestingModule({
      providers: [

        { provide: Database, useValue: mockDatabase }
      ],
    });
    service = TestBed.inject(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
