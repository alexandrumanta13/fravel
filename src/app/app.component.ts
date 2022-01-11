import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './core/services';
import { AppRoutes, Language } from './core/types';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  route: AppRoutes[] = [];

  constructor(public translate: TranslateService,
    private _I18nService: I18nService,
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

    //this.RoutesStorageService.storeRoutes(this.route)

  }

  changeLang(lang: string) {
    this.translate.use(lang)
    this.translate.setDefaultLang(lang);
  }
  ngOnDestroy() {

  }
}
