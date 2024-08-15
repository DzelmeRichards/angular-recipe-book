import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';

import { of, take } from 'rxjs';
import { MockComponent, MockService } from 'ng-mocks';

import { RecipesComponent } from 'src/app/modules/recipes/pages/recipes/recipes.component';
import { RecipeListComponent } from 'src/app/modules/recipes/components/recipe-list/recipe-list.component';

let urlMock: string = '';

const routerMock = MockService(Router, {
  events: of(new NavigationEnd(0, '/', '/')),
  get url() {
    return urlMock;
  },
  navigate: () => <any>of(true),
});

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipesComponent, MockComponent(RecipeListComponent)],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test ngOnit()', () => {
    beforeEach(() => {
      spyOn<any>(routerMock, 'navigate').and.callFake((commands: string[]) => {
        urlMock = commands.join('/');
        return of(true);
      });
    });

    it('should set observable true if URL ends with new', () => {
      // Arrange
      routerMock.navigate(['/test/new']);

      // Act
      fixture.detectChanges();

      // Assert
      component.isNewOrEdit$.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(true);
      });
    });

    it('should set observable true if URL ends with edit', () => {
      // Arrange
      routerMock.navigate(['/test/edit']);

      // Act
      fixture.detectChanges();

      // Assert
      component.isNewOrEdit$.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(true);
      });
    });

    it('should set observable false if URL does NOT end with new or edit', () => {
      // Arrange
      routerMock.navigate(['/test/view']);

      // Act
      fixture.detectChanges();

      // Assert
      component.isNewOrEdit$.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(false);
      });
    });
  });
});
