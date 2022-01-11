import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, concatMap, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { Language } from 'src/app/core/types';
import { environment } from 'src/environments/environment.prod';
import { Airports, GeoLocation } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {
  geolocation$ = new BehaviorSubject<GeoLocation>({} as GeoLocation);
  airports$ = new BehaviorSubject<any>({})

  constructor(
    private _httpClient: HttpClient
  ) { }


  getNearbyAirporst(location: GeoLocation, defaultLanguage: Language): Observable<Airports> {
    this.geolocation$.next(location);

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'apikey': environment.KIWI_KEY,
    });

    const params = new HttpParams({
      fromObject: {
        lat: location.latitude,
        lon: location.longitude,
        radius: "250", // this can be dynamic
        locale: defaultLanguage.locale,
        location_types: "airport", // this can be dynamic
        limit: "20",
        active_only: "true",
      }
    });

    this._httpClient.get<Airports>("https://tequila-api.kiwi.com/locations/radius", { headers: headers, params: params })
      .pipe(
        catchError(error => {
          // Log the error
          console.error(error);
          // Throw an error
          return throwError(error);
        })
      ).subscribe(airports => {
        this.airports$.next(airports.locations)
      })
    return this.airports$.asObservable();
  }

  getGeolocation$(): Observable<GeoLocation> {
    return this.geolocation$.asObservable();
  }

}

