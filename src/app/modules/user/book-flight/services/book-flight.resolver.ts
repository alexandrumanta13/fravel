import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { I18nService, I18nStorageService, RoutesStorageService } from 'src/app/core/services';
import { GeolocationStorageService } from 'src/app/core/services/geolocation/geolocation-storage.service';
import { BookFlightStorageService } from './book-flight-storage.service';
import { BookFlightService } from './book-flight.service';

@Injectable({
  providedIn: 'root'
})
export class BookFlightResolver implements Resolve<any> {
  constructor(
    private _BookFlightStorageService: BookFlightStorageService,
    private _I18nStorageService: I18nStorageService,
    private _RoutesStorageService: RoutesStorageService,
    private _GeoLocationService: GeolocationStorageService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
    return forkJoin([
      this._I18nStorageService.fetchLanguages(),
      this._GeoLocationService.fetchLocation(),
      this._BookFlightStorageService.fetchTopDestinations(),
      this._RoutesStorageService.fetchRoutes(state.url),
     // this._BookFlightService.getNearbyAirports()
    ])
  }
}
