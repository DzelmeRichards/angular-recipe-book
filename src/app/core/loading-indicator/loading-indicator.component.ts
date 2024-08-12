import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private _loadingService: LoadingService) {}

  ngOnInit(): void {
    this.isLoading$ = this._loadingService.loading$;
  }
}
