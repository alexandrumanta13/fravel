import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService, I18nStorageService } from './core/services';
import { AppRoutes, Language, Languages } from './core/types';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  route: AppRoutes[] = [];

  // languages: Languages[] = [
  //   {
  //     flag: "assets/images/flags/ro.svg",
  //     isDefault: false,
  //     key: "ro",
  //     language: "Romana",
  //     locale: "ro-RO",
  //     currency: [
  //       {
  //         value: "RON",
  //         isDefault: true
  //       },
  //       {
  //         value: "EUR",
  //         isDefault: false
  //       },
  //       {
  //         value: "GBP",
  //         isDefault: false
  //       },
  //       {
  //         value: "USD",
  //         isDefault: false
  //       },
  //     ]
  //   },
  //   {
  //     flag: "assets/images/flags/en.svg",
  //     isDefault: true,
  //     key: "en",
  //     language: "Engleza",
  //     locale: "en-US",
  //     currency: [
  //       {
  //         value: "EUR",
  //         isDefault: true
  //       },
  //       {
  //         value: "GBP",
  //         isDefault: false
  //       },
  //       {
  //         value: "USD",
  //         isDefault: false
  //       }
  //     ]
  //   }
  // ]





  constructor(
    public translate: TranslateService,
    private _I18nService: I18nService,
    private I18nStorageService: I18nStorageService
  ) {
    this.route = [{
      route: 'book_flight',
      translate_route: [
        {
          url: '/book-flight',
          language_key: 'en'
        },
        {
          url: '/bilete-avion',
          language_key: 'ro'
        },
      ]
    }]
  }

  ngOnInit() {

    this._I18nService.defaultLanguageChanged$()
      .pipe(distinctUntilChanged())
      .subscribe((lang: Language) => {
        this.translate.use(lang.key)
        this.translate.setDefaultLang(lang.key);

      });
    //this.I18nStorageService.storeLanguages(this.languages)
    //this.RoutesStorageService.storeRoutes(this.route)

  }

  changeLang(lang: string) {
    this.translate.use(lang)
    this.translate.setDefaultLang(lang);
  }
  ngOnDestroy() {

  }
}
