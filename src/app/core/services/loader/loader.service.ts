import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  loader$ = new BehaviorSubject<boolean>(true);

  setLoaderState(state: boolean) {
    this.loader$.next(state);
  }
}
