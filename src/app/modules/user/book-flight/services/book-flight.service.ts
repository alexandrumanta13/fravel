import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import { Language } from 'src/app/core/types';
import { environment } from 'src/environments/environment.prod';
import { Airports, GeoLocation, TopDestinations } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {
  geolocation$ = new BehaviorSubject<GeoLocation>({} as GeoLocation);
  airports$ = new BehaviorSubject<any>([]);
  menuState$ = new BehaviorSubject<string>('closed');

  departureLocation$ = new BehaviorSubject<any>([]);
  airports: Airports[] = [];

  destinationsChanged$ = new BehaviorSubject<TopDestinations[]>([]);
  destinations$ = new BehaviorSubject<TopDestinations[]>([]);
  private destinations: TopDestinations[] = [];


  constructor(
    private _httpClient: HttpClient,
    private _GeoLocationService: GeolocationService,
    private _I18nService: I18nService
  ) { }


  getNearbyAirports(defaultLanguage: Language): Observable<Airports> {

    this._GeoLocationService.getGeoLocation$().pipe(distinctUntilChanged()).subscribe(location => {
      if(Object.keys(location).length > 0) {
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
            tap(airports => {
              this.airports = airports.locations;
              this.airports$.next(airports.locations)
              this.departureLocation$.next(airports.locations)
            }),
          ).subscribe()
      }
     
    })
    
  
    return this.airports$.asObservable();
  }

  getGeolocation$(): Observable<GeoLocation> {
    return this.geolocation$.asObservable();
  }

  getAirports() {
    return this.airports.slice();
  }

  getAirports$(): Observable<Airports> {
    return this.airports$.asObservable();
  }

  getDepartureLocation$(): Observable<Airports> {
    return this.departureLocation$.asObservable();
  }

  openSideMenu$(): Observable<string> {
    return this.menuState$.asObservable();
  }

  setTopDestinations(destinations: TopDestinations[]) {
    this.destinations = destinations;
    this.destinationsChanged$.next(this.destinations.slice());
    this.destinations$.next(this.destinations);
  }

  getTopDestinations$(): Observable<TopDestinations[]> {
    return this.destinations$.asObservable();
  }

  getTopDestinations() {
    return this.destinations.slice();
  }

}

