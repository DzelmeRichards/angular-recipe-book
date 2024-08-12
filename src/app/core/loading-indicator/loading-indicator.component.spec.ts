import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from 'src/app/core/loading-indicator/loading-indicator.component';

describe('GlobalSpinnerComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
