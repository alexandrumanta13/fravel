import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { GeoLocation } from '../types';
import { BookFlightService } from './book-flight.service';

@Injectable({
  providedIn: 'root'
})
export class BookFlightResolver implements Resolve<GeoLocation> {
  constructor(
    private _BookFlightService: BookFlightService,
    private _I18nService: I18nService,
    private _httpClient: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GeoLocation | Observable<GeoLocation> | Promise<GeoLocation> {

    return this._httpClient.get<GeoLocation>("https://geoip-api.skypicker.com/")
      .pipe(
        tap((location) => {
          this._BookFlightService.getNearbyAirporst(location, this._I18nService.getDefaultLanguage())
        })
      )
  }
}
