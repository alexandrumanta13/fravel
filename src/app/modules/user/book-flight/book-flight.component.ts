import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap, } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';

import { CurrentRoute, Language } from 'src/app/core/types';
import { RoutesService } from 'src/app/core/services';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookFlightService } from './services/book-flight.service';
import { Airports, GeoLocation } from './types';




declare var $: any;
@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
})
export class BookFlightComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  language: string = '';
  routeURL: any
  currentRoute: CurrentRoute;
  defaultlanguage = this._I18nService.defaultLanguage$;
  tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  token: any;
  location: GeoLocation = {
    isoCountryCode: '',
    latitude: 0,
    longitude: 0
  };


  constructor(
    public _translate: TranslateService,
    private _router: Router,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService,
    private _BookFlightService: BookFlightService
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.currentRoute = this._RoutesService.getCurrentRoute();
    //  this.I18nService.defaultLanguage.next(this.languages.slice().filter(language => language.key === this.currentRoute.language_key));
  }

  ngOnInit() {
    this._I18nService.defaultLanguageChanged$()
      .pipe(distinctUntilChanged())
      .subscribe((lang: any) => {

        this._translate.use(lang.key)
        this._translate.setDefaultLang(lang.key);

        this.changeApiLanguage(lang)
      });



    this._BookFlightService.getGeolocation$().pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (location: GeoLocation) => {
          console.log(location)
          this.location = location
        }
      );


    this._BookFlightService.airports$
      .pipe(distinctUntilChanged())
      .subscribe((airporst: Airports) => {

        console.log(airporst)
      });
  }

  changeApiLanguage(language: Language) {

    console.log('asdas')
    this._BookFlightService.getNearbyAirporst(this.location, language)
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
