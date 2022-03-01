import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { I18nService, I18nStorageService, RoutesStorageService } from 'src/app/core/services';
import { GeoLocation } from '../types';
import { BookFlightStorageService } from './book-flight-storage.service';
import { BookFlightService } from './book-flight.service';

@Injectable({
  providedIn: 'root'
})
export class BookFlightResolver implements Resolve<any> {
  constructor(
    private _BookFlightService: BookFlightService,
    private _BookFlightStorageService: BookFlightStorageService,
    private _I18nService: I18nService,
    private _httpClient: HttpClient,
    private _I18nStorageService: I18nStorageService,
    private _RoutesStorageService: RoutesStorageService
  ) { }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {

    return forkJoin([
      this._I18nStorageService.fetchLanguages(),
      this._httpClient.get<GeoLocation>("https://geoip-api.skypicker.com/")
      .pipe(
        catchError(this.handleError),
        tap((location) => {
         
          if (location) {
            this._BookFlightService.getNearbyAirports(location, this._I18nService.getDefaultLanguage())
          }
        })
      ),
      this._BookFlightStorageService.fetchTopDestinations(),
      this._RoutesStorageService.fetchRoutes(state.url)
    ])
  }
}
