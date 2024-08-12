import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';

describe('PopupMessageService', () => {
  let service: PopupMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test addMessage()', () => {
    it('should add a new message to the list', () => {
      //Arrange
      const message = 'Test';

      //Act
      service.addMessage(message);

      //Assert
      service.messages$.pipe(take(1)).subscribe((messages) => {
        expect(messages).toEqual([message]);
      });
    });
  });

  describe('test removeMessage()', () => {
    it('should remove message from the list by index', () => {
      //Arrange
      const initialMessages = ['Test 1', 'Test 2', 'Test 3'];
      initialMessages.forEach((message) => service.addMessage(message));

      //Act
      service.removeMessage(1);

      //Assert
      service.messages$.pipe(take(1)).subscribe((messages) => {
        expect(messages).toEqual(['Test 3', 'Test 1']);
      });
    });
  });
});
