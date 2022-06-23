import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectPersonsService {
  personsSelectedState$ = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  getSelectedPersonsState$(): Observable<any> {
    return this.personsSelectedState$.asObservable();
  }
}
