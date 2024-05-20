import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent, MockService } from 'ng-mocks';

import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { NavigationComponent } from 'src/app/core/header/components/navigation/navigation.component';

const themeServiceMock = MockService(ThemeService, {
  toggleTheme: () => <any>{}
})

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockComponent(NavigationComponent)],
      providers: [{provide: ThemeService, useValue: themeServiceMock}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call themeService toggleTheme function', () => {
    //Arrange
    spyOn(themeServiceMock, 'toggleTheme');

    //Act
    component.toggleTheme();

    //Assert
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  })

  it('should toggle isMenuOpen boolean value', () => {
    //Arrange
    component.isMenuOpen = false;

    //Act
    component.toggleMenu();

    //Assert
    expect(component.isMenuOpen).toEqual(true);
  })
});
