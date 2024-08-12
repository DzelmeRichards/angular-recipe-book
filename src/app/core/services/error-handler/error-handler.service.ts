import { ErrorHandler, Injectable } from '@angular/core';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private _popupMessageService: PopupMessageService,
    private _loadingService: LoadingService
  ) {}

  handleError(error: any): void {
    this._popupMessageService.addMessage(error);

    this._loadingService.hideLoading();
  }
}