import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';

import { PopupMessageComponent } from 'src/app/core/popup-message/popup-message.component';
import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';

const popupMessageServiceMock = MockService(PopupMessageService, {
  removeMessage: () => <any>{},
});

describe('PopupMessageComponent', () => {
  let component: PopupMessageComponent;
  let fixture: ComponentFixture<PopupMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupMessageComponent],
      providers: [
        { provide: PopupMessageService, useValue: popupMessageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test close()', () => {
    it('should call popupMessageService removeMessage with correct index', () => {
      //Arrange
      const index = 1;
      const removeMessageSpy = spyOn(popupMessageServiceMock, 'removeMessage');

      //Act
      component.close(index);

      //Assert
      expect(removeMessageSpy).toHaveBeenCalledWith(index);
    });
  });
});
