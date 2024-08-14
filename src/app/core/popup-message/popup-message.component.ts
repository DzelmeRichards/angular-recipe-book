import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';

import type { PopupMessage } from 'src/app/shared/models/popup-message.model';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
})
export class PopupMessageComponent implements OnInit {
  messages$: Observable<PopupMessage[]>;

  constructor(private _popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.messages$ = this._popupMessageService.messages$;
  }

  close(index: number): void {
    this._popupMessageService.removeMessage(index);
  }
}
