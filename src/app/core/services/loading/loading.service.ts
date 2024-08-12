import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this._loadingSubject.asObservable();

  showLoading(): void {
    this._loadingSubject.next(true);
  }

  hideLoading(): void {
    this._loadingSubject.next(false);
  }
}
