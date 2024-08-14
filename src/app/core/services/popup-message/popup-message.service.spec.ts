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
      const popupMessage = <any>{ type: 'error', text: 'Error' };

      //Act
      service.addMessage(popupMessage);

      //Assert
      service.messages$.pipe(take(1)).subscribe((messages) => {
        expect(messages).toEqual([popupMessage]);
      });
    });
  });

  describe('test removeMessage()', () => {
    it('should remove message from the list by index', () => {
      //Arrange
      const initialMessages = <any>[
        { text: 'Test 1', type: 'error' },
        { text: 'Test 2', type: 'success' },
        { text: 'Test 3', type: 'error' },
      ];

      initialMessages.forEach((message) => service.addMessage(message));
      const index: number = 1;

      //Act
      service.removeMessage(index);

      //Assert
      service.messages$.pipe(take(1)).subscribe((messages) => {
        expect(messages).toEqual(<any>[
          { text: 'Test 3', type: 'error' },
          { text: 'Test 1', type: 'error' },
        ]);
      });
    });
  });
});
