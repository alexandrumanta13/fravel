import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GdprService {

  cookieConsent$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  getConsent(): Observable<boolean> {
    return this.cookieConsent$.asObservable();
  }

  setConsent(state: boolean) {
    
    this.cookieConsent$.next(state);
  }

  checkConsent() {
    const consent = localStorage.getItem('_fvrl_ckie_cnst');
    
    if(consent) {
      this.cookieConsent$.next(true);
    } else {
      this.cookieConsent$.next(false);
    }

    return this.cookieConsent$.pipe(
      tap(consent => {
        this.setConsent(consent)
      })
    )    
    
  }

  acceptAll() {
    localStorage.setItem('_fvrl_ckie_cnst', JSON.stringify(true));
    this.setConsent(true)
  }
}
