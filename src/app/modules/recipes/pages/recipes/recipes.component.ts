import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  isNewOrEdit$: Observable<boolean>;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.isNewOrEdit$ = this.createNewOrEditObservable();
  }

  private createNewOrEditObservable(): Observable<boolean> {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const lastSegment = this._router.url.split('/').pop();
        return lastSegment === 'new' || lastSegment === 'edit';
      })
    );
  }
}
