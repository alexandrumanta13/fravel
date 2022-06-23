import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, take, takeUntil, tap, } from 'rxjs/operators';
import { I18nService, LoaderService } from 'src/app/core/services';

import { CurrentRoute, Language } from 'src/app/core/types';
import { RoutesService } from 'src/app/core/services';
import { BookFlightService } from './services/book-flight.service';
import { Airport, Airports, GeoLocation, TopDestinations } from './types';
import { GdprService } from 'src/app/core/services/gdpr/gdpr.service';
import { Location } from '@angular/common';
import { BookFlightStorageService } from './services/book-flight-storage.service';
import { SelectDateService } from '../select-date/select-date.service';
import { SelectDateComponent } from '../select-date/select-date.component';
import { SelectPersonsService } from '../select-persons/select-persons.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],

})
export class BookFlightComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  language: string = '';
  routeURL: any
  defaultlanguage: Language = {} as Language
  cookieConsent$ = this._GdprService.cookieConsent$;
  tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  token: any;
  location: GeoLocation = {
    isoCountryCode: '',
    latitude: 0,
    longitude: 0
  };

  toggleMenuState: string = 'closed';
  airports: Airports = {
    locations: []
  };
  selectedAirport = new BehaviorSubject<any>('');
  //destinationAirport: any = '';
  destinationAirport = new BehaviorSubject<any>('');

  topDestinations: TopDestinations[] = [];
  selectedTopDestinations: any[] = [];
  selectedlanguage: Language = {} as Language;

  TOP_DESTINATIONS: any = [
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Londra"
        },
        {
          language_key: 'en',
          city_name: "London"
        }
      ]
    },
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Barcelona"
        },
        {
          language_key: 'en',
          city_name: "Barcelona"
        }
      ]
    },
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Milano"
        },
        {
          language_key: 'en',
          city_name: "Milan"
        }
      ]
    },
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Valencia"
        },
        {
          language_key: 'en',
          city_name: "Valencia"
        }
      ]
    },
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Roma"
        },
        {
          language_key: 'en',
          city_name: "Rome"
        }
      ]
    },
    {
      city: [
        {
          language_key: 'ro',
          city_name: "Dublin"
        },
        {
          language_key: 'en',
          city_name: "Dublin"
        }
      ]
    },
  ]
  routeSubscription: Subscription = new Subscription;
  departureMenuState: boolean = false;
  departuresState$ = new BehaviorSubject<boolean>(false)
  destinationState$ = new BehaviorSubject<boolean>(false);
  urlParam: string = 'null';

  
  selectDateState: boolean = false;
  selectDateState$ = new BehaviorSubject<boolean>(false);
  dateComponentState$ = new BehaviorSubject<boolean>(true);
  selectPersonsState$ = new BehaviorSubject<boolean>(false);
  personsComponentState$ = new BehaviorSubject<boolean>(true);

  constructor(
    public _translate: TranslateService,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService,
    private _BookFlightService: BookFlightService,
    private _LoaderService: LoaderService,
    private _GdprService: GdprService,
    private _UrlLocation: Location,
    private _BookFlightStorageService: BookFlightStorageService,
    private _SelectDateService: SelectDateService,
    private _SelectPersonsService: SelectPersonsService
  ) {

    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };


  }

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.urlParam = String(params.get('departure'))
    });

    this._SelectDateService.getSelectedDate$()
    .pipe(distinctUntilChanged())
    .subscribe(date => {
      console.log(date)
    })
    this._SelectDateService.getSelectedDateState$()
    .pipe(distinctUntilChanged())
    .subscribe(date => {
      
      this.selectDateState$.next(date)
    })
    this._SelectPersonsService.getSelectedPersonsState$()
    .pipe(distinctUntilChanged())
    .subscribe(date => {
      this.selectPersonsState$.next(date)
    })

    this._I18nService.defaultLanguageChanged$()
      .pipe(takeUntil(this._unsubscribeAll),
        tap((lang: any) => {
          this.defaultlanguage = lang
          this._translate.use(lang.key)
          this._translate.setDefaultLang(lang.key);
          this.changeTopDestinationsLanguage(lang.key);
          this.changeRouteLanguage(lang);
          this.changeApiLanguage(lang);
          this.dateComponentState$.next(false);
          
        })
      )
      .subscribe(lang => {
        setTimeout(() => {
          this.dateComponentState$.next(true);
        }, 10)
      });

    this._BookFlightService.getGeolocation$().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (location: GeoLocation) => {
          this.location = location
        }
      );

    this._BookFlightService.openSideMenu$().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (state) => {
          this.menuOpenState(state);
        }
      );

    this._BookFlightService.getGeolocation$().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (location: GeoLocation) => {
          this.location = location
        }
      );

    this._BookFlightService.getAirports$()
      .pipe(distinctUntilChanged())
      .subscribe((airports: any) => {
        this.airports = airports;
      });

    this._BookFlightService.getSelectedDeparture$()
      .pipe(distinctUntilChanged())
      .subscribe((airport: any) => {
        this.selectedAirport.next(airport);
      });

    this._BookFlightService.getTopDestinations$()
      .pipe(distinctUntilChanged())
      .subscribe(destinations => {

        this.topDestinations = destinations;
        this.topDestinations.map(destinations => {
          let destination = destinations.city.filter((city: any) => city.language_key === this.defaultlanguage.key)
          this.selectedTopDestinations.push(destination[0])
        })
      })

    this._BookFlightService.getSelectedDestination$()
      .pipe(distinctUntilChanged())
      .subscribe((destination: any) => {
        if (Array.isArray(destination)) {
          this.destinationAirport.next(destination[0][0]);
        } else {
          this.destinationAirport.next(destination);
        }
      })

    this._BookFlightService.toggleDeparture().pipe(
      distinctUntilChanged())
      .subscribe(state => {
        this.departuresState$.next(state);
      })
    this._BookFlightService.toggleDestination().pipe(
      distinctUntilChanged())
      .subscribe(state => {
        this.destinationState$.next(state);
      })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._LoaderService.loader$.next(false);
      this._GdprService.checkConsent();
      // this.routeSubscription = this._RoutesService.currentRoute$
      //   .subscribe((currentRoute: CurrentRoute) => {
      //     this._UrlLocation.replaceState(currentRoute.url);
      //   });

      if (this.urlParam != 'null') {
        let splitURL = this.urlParam.split('-');
        this._BookFlightService.getAirportsByURL(splitURL[0], 'departure')

        this.selectDestination(splitURL[1]);
      }
    }, 200)






    // this._BookFlightService.selectDestination$.next(airport);
    // this._BookFlightService.selectedDestination$.next(airport)
  }

  changeApiLanguage(language: Language) {
    this._BookFlightService.getNearbyAirports(language)
  }

  changeRouteLanguage(language: Language) {
    this._RoutesService.translateCurrentRoute(this._router.url, language)
  }

  menuOpenState(state: string) {
    this.toggleMenuState = state
  }

  changeTopDestinationsLanguage(defaultLanguage: Language) {
    this.selectedTopDestinations = [];
    this.topDestinations.map(destinations => {
      let destination = destinations.city.filter((city: any) => city.language_key === defaultLanguage)
      this.selectedTopDestinations.push(destination[0])
    })
  }


  toggleDeparture() {
    this._BookFlightService.departureMenuState$.next(true)
  }

  toggleDestination() {
    this._BookFlightService.destinationMenuState$.next(true)
  }

  selectDestination(iata_id: string) {
    this._BookFlightService.getAirportsByCity(iata_id, 'destination');
    if (Object.keys(this.selectedAirport.getValue()).length) {
      //  this._SelectDateService.dateSelectedState$.next(true)
       this._SelectPersonsService.personsSelectedState$.next(true)
    }
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    //this.routeSubscription.unsubscribe();
  }

}
