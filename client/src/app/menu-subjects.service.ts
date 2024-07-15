import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class MenuSubjectsService {
  private _nameVisibility = new BehaviorSubject<boolean>(false);
  nameVisible$ = this._nameVisibility.asObservable();

  changeNameVisibility(isVisible: boolean) {
    this._nameVisibility.next(isVisible);
  }
}
