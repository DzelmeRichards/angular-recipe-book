import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PopupMessageService } from 'src/app/core/services/popup-message/popup-message.service';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
})
export class PopupMessageComponent implements OnInit {
  messages$: Observable<string[]>;

  constructor(private _popupMessageService: PopupMessageService) {}

  ngOnInit(): void {
    this.messages$ = this._popupMessageService.messages$;
  }

  close(index: number): void {
    this._popupMessageService.removeMessage(index);
  }
}
