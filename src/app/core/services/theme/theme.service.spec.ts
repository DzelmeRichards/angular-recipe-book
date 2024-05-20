import { TestBed } from '@angular/core/testing';

import { ThemeService } from 'src/app/core/services/theme/theme.service';

describe('DarkModeService', () => {
  let service: ThemeService;
  let getItemSpy: jasmine.Spy;
  let setItemSpy: jasmine.Spy;
  let matchMediaSpy: jasmine.Spy;
  let applyThemeSpy: jasmine.Spy;

  beforeEach(() => {
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake(() => null);
    setItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});

    matchMediaSpy = spyOn(window, 'matchMedia').and.callFake(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: jasmine.createSpy('addEventListener'),
          removeEventListener: jasmine.createSpy('removeEventListener'),
          dispatchEvent: jasmine.createSpy('dispatchEvent'),
          addListener: jasmine.createSpy('addListener'),
          removeListener: jasmine.createSpy('removeListener'),
        } as MediaQueryList)
    );

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);

    applyThemeSpy = spyOn<any>(service, 'applyTheme').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test toggleTheme()', () => {
    it('should toggle from light to dark mode', () => {
      // Arrange
      service.isDarkMode = false;

      // Act
      service.toggleTheme();

      // Assert
      expect(service.isDarkMode).toBeTrue();
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
      expect(document.body.classList.contains('dark')).toBeTrue();
      expect(applyThemeSpy).toHaveBeenCalled();
    });

    it('should toggle from dark to light mode', () => {
      // Arrange
      service.isDarkMode = true;

      // Act
      service.toggleTheme();

      // Assert
      expect(service.isDarkMode).toBeFalse();
      expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
      expect(document.body.classList.contains('dark')).toBeFalse();
      expect(applyThemeSpy).toHaveBeenCalled();
    });
  });

  describe('Test initializeTheme()', () => {
    it('should initialize with dark mode if localStorage is empty and device prefers dark mode', () => {
      //Arrange
      getItemSpy.and.returnValue(null);
      matchMediaSpy.and.returnValue({ matches: true });

      //Act
      service['initializeTheme']();

      //Assert
      expect(service.isDarkMode).toBeTrue();
      expect(applyThemeSpy).toHaveBeenCalled();
      expect(document.body.classList.contains('dark')).toBeTrue();
    });

    it('should initialize with light mode if localStorage is empty and device does not prefer dark mode', () => {
      getItemSpy.and.returnValue(null);
      matchMediaSpy.and.returnValue({ matches: false });

      service['initializeTheme']();

      expect(service.isDarkMode).toBeFalse();
      expect(applyThemeSpy).toHaveBeenCalled();
      expect(document.body.classList.contains('dark')).toBeFalse();
    });

    it('should initialize with dark mode if localStorage has dark mode', () => {
      getItemSpy.and.returnValue('dark');

      service['initializeTheme']();

      expect(service.isDarkMode).toBeTrue();
      expect(applyThemeSpy).toHaveBeenCalled();
      expect(document.body.classList.contains('dark')).toBeTrue();
    });

    it('should initialize with light mode if localStorage has light mode', () => {
      getItemSpy.and.returnValue('light');

      service['initializeTheme']();

      expect(service.isDarkMode).toBeFalse();
      expect(applyThemeSpy).toHaveBeenCalled();
      expect(document.body.classList.contains('dark')).toBeFalse();
    });
  });

  describe('Test applyTheme()', () => {
    it('should test isDarkMode scenario', () => {
      // Arrange
      service.isDarkMode = true;

      // Act
      service['applyTheme']();

      // Assert
      expect(document.body.classList.contains('dark')).toBeTrue();
    });

    it('should test !isDarkMode scenario', () => {
      // Arrange
      service.isDarkMode = false;

      // Act
      service['applyTheme']();

      // Assert
      expect(document.body.classList.contains('dark')).toBeFalse();
    });
  });
});
