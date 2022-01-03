import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Language } from '../../../core/types';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { I18nService } from '../../../core/services';
import { CurrentRoute } from '../../../core/services/routes/routes.types';
import { RoutesService } from '../../../core/services';



@Component({
  selector: 'app-langauge',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  languages: Language[];
  currentRoute: CurrentRoute

  constructor(
    public translate: TranslateService,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService
  ) {
    this.languages = this._I18nService.getLanguages();
    this.currentRoute = this._RoutesService.getCurrentRoute();
    this._I18nService.defaultLanguage.next(this.languages.slice().filter(language => language.key === this.currentRoute.language_key));
  }

  ngOnInit() {
    
    this._I18nService.languagesChanged.pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (languages: Language[]) => {
          this.languages = languages;
        }
      );

    this._I18nService.defaultLanguage.pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (language: Language[]) => {
          console.log(language)
          this.translate.setDefaultLang(language[0].key);
          this.translate.use(language[0].key)
        }
      );

  }

  setLanguage(language: Language) {
    let languageArr = [];
    languageArr.push(language)
    
    this.translate.setDefaultLang(language.key);
    this.translate.use(language.key)
     
    this._I18nService.defaultLanguage.next(languageArr);

  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}