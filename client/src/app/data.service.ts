import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _jsonObject: any[];

  private _currentDataObject = new BehaviorSubject<any[]>([]);
  private _errorProperty = new BehaviorSubject<string | null>(null);
  currentData$ = this._currentDataObject.asObservable();
  errorMessage$ = this._errorProperty.asObservable();
  constructor(private http: HttpClient) {
    this._jsonObject = [];
    this.fetchData();
  }

  //Sets available object or throws error message
  getObject(id: string): undefined | any {
    let objectId: number;
    switch (id) {
      case 'first':
        objectId = 0;
        break;
      case 'second':
        objectId = 1;
        break;
      case 'random':
        const availableItems = this._jsonObject.filter(
          (obj) => !this._currentDataObject.getValue().includes(obj)
        );
        if (availableItems.length === 0) {
          this.setErrorMessage('Brak kolejnych unikalnych treści');
          return undefined;
        }

        objectId = Math.floor(Math.random() * availableItems.length);
        return availableItems[objectId];
      default:
        this.setErrorMessage('Nie wybrano opcji');
        return undefined;
    }
    if (
      this._currentDataObject.getValue().includes(this._jsonObject[objectId])
    ) {
      this.setErrorMessage('Ta treść jest już wyświetlona');
      return undefined;
    } else return this._jsonObject[objectId];
  }

  setErrorMessage(message: string | null) {
    this._errorProperty.next(message);
  }

  replaceObject(id: string) {
    const object = this.getObject(id);
    if (object !== undefined) {
      const updatedObjects = this._currentDataObject.getValue();

      updatedObjects.length > 0
        ? (updatedObjects[updatedObjects.length - 1] = object)
        : (updatedObjects[0] = object);
      this._currentDataObject.next([...updatedObjects]);
      this.setErrorMessage(null);
    }
  }

  addDataObject(id: string) {
    const object = this.getObject(id);

    if (object !== undefined) {
      const updatedObjects = this._currentDataObject.getValue();
      updatedObjects.push(object);
      updatedObjects.sort(function (a, b) {
        if (a.body < b.body) {
          return -1;
        }
        if (a.body > b.body) {
          return 1;
        }
        return 0;
      });

      this._currentDataObject.next([...updatedObjects]);
      this.setErrorMessage(null);
    }
  }
  fetchData() {
    this.http.get<any[]>('../assets/data.json').subscribe((res) => {
      this._jsonObject = res;
    });
  }
  resetService() {
    this._jsonObject = [];
    this._currentDataObject.next([]);
    this._errorProperty.next(null);
    this.fetchData();
  }
}
