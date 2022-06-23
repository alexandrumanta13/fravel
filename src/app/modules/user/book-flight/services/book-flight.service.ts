import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import { Language } from 'src/app/core/types';
import { environment } from 'src/environments/environment.prod';
import { Airport, Airports, GeoLocation, TopDestinations } from '../types';

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
  departureMenuState$ = new BehaviorSubject<boolean>(false);
  destinationMenuState$ = new BehaviorSubject<boolean>(false);
  selectedDeparture$ = new BehaviorSubject<any>('');
  selectDestination$ = new BehaviorSubject<any>('');
  selectedDestination$ = new BehaviorSubject<any>('');

  locations: any[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _GeoLocationService: GeolocationService,
    private _I18nService: I18nService
  ) { }


  getNearbyAirports(defaultLanguage: Language): Observable<Airports> {

    this._GeoLocationService.getGeoLocation$().pipe(distinctUntilChanged()).subscribe(location => {
      if (Object.keys(location).length > 0) {
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
              this.departureLocation$.next(airports.locations);
              this.selectedDeparture$.next(airports.locations[0])
            }),
          ).subscribe()
      }

    })


    return this.airports$.asObservable();
  }


  getAirportsByCity(city_id: string, action: string) {

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'apikey': environment.KIWI_KEY,
    });

    const params = new HttpParams({
      fromObject: {
        term: city_id,
        locale: this._I18nService.defaultLanguage$.getValue().locale,
        location_types: "airport", // this can be dynamic
        limit: 20,
        active_only: "true",
      }
    })


    this._httpClient.get<Airports>("https://tequila-api.kiwi.com/locations/query", { headers: headers, params: params })

      .pipe(
        map((data) => {
          return data
        }
        ),
        tap(airports => {
          // some times api call returns country property outside city
          airports.locations.map(airport => {
            if (airport.country && !airport.city.country) {
              airport.city.country = airport.country
            }
            if (airport.continent && !airport.city.continent) {
              airport.city.continent = airport.continent
            }
          })

          // group by country
          const groups = airports.locations.reduce((groups, item) => ({
            ...groups,
            [item.city.country.name]: [...(groups[item.city.country.name] || []), item]
          }), []);


          // make array from groups
          let countries = [];

          for (let i in groups) {
            countries.push(groups[i])
          }

          // // groups[i].sort((a: any, b: any) => {
          // //   console.log( +(b.city.continent.id === "europe") - +(a.city.continent.id === "europe"))
          // // });


          // sort tem by europe to go first
          countries.sort((a: any, b: any) => {
            return +(b[0].city.continent.id === 'europe') - +(a[0].city.continent.id === 'europe');
          });
          
          this.locations = countries;

          if (action === 'destination') {
            this.selectDestination$.next(this.locations)
          }
        }),
      ).subscribe();

    return this.locations;
  }
  getAirportsByURL(city_id: string, action: string) {

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'apikey': environment.KIWI_KEY,
    });

    const params = new HttpParams({
      fromObject: {
        term: city_id,
        locale: this._I18nService.defaultLanguage$.getValue().locale,
        location_types: "airport", // this can be dynamic
        limit: 1,
        active_only: "true",
      }
    })


    this._httpClient.get<Airports>("https://tequila-api.kiwi.com/locations/query", { headers: headers, params: params })

      .pipe(
        map((data) => {
        
          return data
        }
        ),
        tap(airports => {
     
          
          //this.locations = airports.locations;

          if (action === 'destination') {
           this.selectDestination$.next(airports.locations[0])
          } else {
            this.selectedDeparture$.next(airports.locations[0])
          }
        }),
      ).subscribe();

    //return this.locations;
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

  getSelectedDeparture$(): Observable<Airport> {
    return this.selectedDeparture$.asObservable();
  }

  getSelectedDestination$(): Observable<Airports[]> {
    return this.selectDestination$.asObservable();
  }

  destination$(): Observable<Airports[]> {
    return this.selectedDestination$.asObservable();
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

  toggleDeparture(): Observable<boolean> {
    return this.departureMenuState$.asObservable()
  }
  toggleDestination(): Observable<boolean> {
    return this.destinationMenuState$.asObservable()
  }

}

