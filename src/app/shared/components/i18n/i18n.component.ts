import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { CurrentRoute, Language, Languages } from '../../../core/types';
import { RoutesService, I18nService } from '../../../core/services';



@Component({
  selector: 'app-langauge',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  languages: Languages[];
  currentRoute: CurrentRoute

  constructor(
    public translate: TranslateService,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService
  ) {
    this.languages = this._I18nService.getLanguages();
    this.currentRoute = this._RoutesService.getCurrentRoute();

    const setDefaultLanguage = this.languages.slice().filter(language => language.key === this.currentRoute.language_key);
    this._I18nService.defaultLanguage$.next(setDefaultLanguage[0]);
  }

  ngOnInit() {
    
    this._I18nService.languagesChanged$.pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (languages: Languages[]) => {
          this.languages = languages;
        }
      );

    this._I18nService.defaultLanguage$.pipe(
      takeUntil(this._unsubscribeAll))
      .subscribe(
        (language: Language) => {

          this.translate.setDefaultLang(language.key);
          this.translate.use(language.key)
        }
      );

  }

  setLanguage(language: Language) {  
    this.translate.setDefaultLang(language.key);
    this.translate.use(language.key)

    localStorage.setItem('FravelDefaultLanguage', JSON.stringify(language));
     
    this._I18nService.defaultLanguage$.next(language);
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}