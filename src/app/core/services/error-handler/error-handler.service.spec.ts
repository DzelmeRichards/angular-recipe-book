import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';

import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

const popupMessageServiceMock = MockService(PopupMessageService, {
  addMessage: () => <any>{},
});

const loadingServiceMock = MockService(LoadingService, {
  hideLoading: () => <any>{},
});

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PopupMessageService, useValue: popupMessageServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test handleError()', () => {
    it('should mke expected calls', () => {
      //Arrange
      const error = 'Error';
      const addMessageSpy = spyOn(popupMessageServiceMock, 'addMessage');
      const hideLoadingSpy = spyOn(loadingServiceMock, 'hideLoading');

      //Act
      service.handleError(error);

      //Assert
      expect(addMessageSpy).toHaveBeenCalledWith(error);
      expect(hideLoadingSpy).toHaveBeenCalled();
    });
  });
});
