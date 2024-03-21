import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';

import { MockService } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let mockDatabase: jasmine.SpyObj<Database>; //??????????????

  beforeEach(() => {
    // mockDatabase = MockService(Database) as jasmine.SpyObj<Database>; //????????

    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: Database, useValue: mockDatabase }
      ],
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
