import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, timer } from 'rxjs';
import { distinctUntilChanged, take, takeUntil, tap, } from 'rxjs/operators';
import { I18nService, LoaderService } from 'src/app/core/services';

import { CurrentRoute, Language } from 'src/app/core/types';
import { RoutesService } from 'src/app/core/services';
import { BookFlightService } from './services/book-flight.service';
import { Airport, Airports, GeoLocation, TopDestinations } from './types';
import { GdprService } from 'src/app/core/services/gdpr/gdpr.service';
import { Location } from '@angular/common';
import { BookFlightStorageService } from './services/book-flight-storage.service';



declare var $: any;
@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFlightComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  language: string = '';
  routeURL: any
  defaultlanguage = this._I18nService.getDefaultLanguage();
  cookieConsent$ = this._GdprService.cookieConsent$;
  tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  token: any;
  location: GeoLocation = {
    isoCountryCode: '',
    latitude: 0,
    longitude: 0
  };

  toggleMenuState: string = '';
  airports: Airports = {
    locations: []
  };
  selectedAirport: Airport = {
    id: '',
    city: {
      name: ''
    }
  };

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




  constructor(
    public _translate: TranslateService,
    private _router: Router,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService,
    private _BookFlightService: BookFlightService,
    private _LoaderService: LoaderService,
    private _GdprService: GdprService,
    private _UrlLocation: Location,
    private _BookFlightStorageService: BookFlightStorageService
  ) {

    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };


  }

  ngOnInit() {
    //this._BookFlightStorageService.storeTopDestinatinos(this.TOP_DESTINATIONS)

    this._I18nService.defaultLanguageChanged$()
      .pipe(distinctUntilChanged())
      .subscribe((lang: any) => {
        this._translate.use(lang.key)
        this._translate.setDefaultLang(lang.key);
        this.changeTopDestinationsLanguage(lang.key);
        this.changeRouteLanguage(lang);
        this.changeApiLanguage(lang);
      });

    this._RoutesService.getCurrentRoute$()
      .pipe(distinctUntilChanged())
      .subscribe((currentRoute: any) => {
        this._UrlLocation.replaceState(currentRoute.url);
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
        this.selectedAirport = airports[0];
      });

    this._BookFlightService.getTopDestinations$()
      .pipe(distinctUntilChanged())
      .subscribe(destinations => {
        this.topDestinations = destinations; //this._BookFlightService.getTopDestinations();

        this.topDestinations.map(destinations => {
          let destination = destinations.city.filter((city: any) => city.language_key === this.defaultlanguage.key)
          this.selectedTopDestinations.push(destination[0])
        })

        console.log( this.selectedTopDestinations)
      })

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._LoaderService.loader$.next(false);
      this._GdprService.checkConsent();
    }, 200)
  }

  changeApiLanguage(language: Language) {
    this._BookFlightService.getNearbyAirports(this.location, language)
  }

  changeRouteLanguage(language: Language) {
    this._RoutesService.translateCurrentRoute(this._router.url, language)
  }

  menuOpenState(state: string) {
    this.toggleMenuState = state;
  }

  changeTopDestinationsLanguage(defaultLanguage: Language) {
    this.selectedTopDestinations = [];
    this.topDestinations.map(destinations => {
      let destination = destinations.city.filter((city: any) => city.language_key === defaultLanguage)
      this.selectedTopDestinations.push(destination[0])
    })
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
