import { TestBed } from '@angular/core/testing';
import { Database } from '@angular/fire/database';

import { MockProvider } from 'ng-mocks';

import { RecipeService } from 'src/app/core/services/recipe/recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(Database)],
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
