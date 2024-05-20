import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let elementRef: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    elementRef = (component as any).elementRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test toggleDropdown()', () => {
    it('should toggle isOpen boolean variable', () => {
      //Arrange
      component.isOpen = false;

      //Act
      component.toggleDropdown();

      //Assert
      expect(component.isOpen).toBe(true);
    });
  });

  describe('Test closeDropdown()', () => {
    it('should set isOpen boolean variable false', () => {
      //Arrange
      component.isOpen = true;

      //Act
      component.closeDropdown();

      //Assert
      expect(component.isOpen).toBe(false);
    });
  });

  describe('Test @HostListener clickout', () => {
    it('should close dropdown if clicked outside', () => {
      //Arrange
      component.isOpen = true;

      //Act
      const event = new MouseEvent('click');
      document.dispatchEvent(event);

      //Assert
      expect(component.isOpen).toBe(false);
    });

    it('should not close dropdown if clicked inside', () => {
      //Arrange
      component.isOpen = true;

      //Act
      const event = new MouseEvent('click');
      elementRef.nativeElement.dispatchEvent(event);

      //Assert
      expect(component.isOpen).toBe(true);
    });
  });
});
