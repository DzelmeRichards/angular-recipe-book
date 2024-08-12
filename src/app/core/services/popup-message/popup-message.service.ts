import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  private messages = new BehaviorSubject<string[]>([]);

  messages$: Observable<string[]> = this.messages.asObservable();

  addMessage(message: string): void {
    this.updateMessages([message, ...this.currentMessages]);
  }

  removeMessage(index: number): void {
    this.updateMessages(this.currentMessages.filter((_, i) => i !== index));
  }

  private get currentMessages(): string[] {
    return this.messages.getValue();
  }

  private updateMessages(messages: string[]): void {
    this.messages.next(messages);
  }
}
