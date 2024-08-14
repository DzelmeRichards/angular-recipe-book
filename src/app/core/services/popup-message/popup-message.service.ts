import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import type { PopupMessage } from 'src/app/shared/models/popup-message.model';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  private messages = new BehaviorSubject<PopupMessage[]>([]);

  messages$: Observable<PopupMessage[]> = this.messages.asObservable();

  addMessage(message: PopupMessage): void {
    this.updateMessages([message, ...this.currentMessages]);
  }

  removeMessage(index: number): void {
    this.updateMessages(this.currentMessages.filter((_, i) => i !== index));
  }

  private get currentMessages(): PopupMessage[] {
    return this.messages.getValue();
  }

  private updateMessages(messages: PopupMessage[]): void {
    this.messages.next(messages);
  }
}
