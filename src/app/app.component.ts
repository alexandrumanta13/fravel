import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './core/services';
import { AppRoutes } from './core/services/routes/routes.types';
import { distinctUntilChanged } from 'rxjs/operators';


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
      .subscribe((lang: any) => {
        // Manipulate the updated language
        if (lang && lang.length > 0) {
          this.translate.use(lang[0].key)
          this.translate.setDefaultLang(lang[0].key);
        }
      });

    //this.RoutesStorageService.storeRoutes(this.route)

  }

  ngOnDestroy() { }
}
