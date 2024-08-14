import { ErrorHandler, Injectable } from '@angular/core';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

import type { PopupMessage } from 'src/app/shared/models/popup-message.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private _popupMessageService: PopupMessageService,
    private _loadingService: LoadingService
  ) {}

  handleError(error: any): void {
    const errorMessage: PopupMessage = {
      text: error,
      type: 'error',
    };

    this._popupMessageService.addMessage(errorMessage);

    this._loadingService.hideLoading();
  }
}
