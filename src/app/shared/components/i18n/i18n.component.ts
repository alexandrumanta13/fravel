import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { CurrentRoute, Language, Languages } from '../../../core/types';
import { RoutesService, I18nService } from '../../../core/services';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';



@Component({
  selector: 'app-langauge',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss'],
  animations: [
    trigger('toggleLanguage', [
      state('closed', style({
        opacity: 0,
        transform: 'translate3d(0, 45vh, 0)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translate3d(0, 100vh, 0)'
      })),
      transition('* <=> *', [
        animate(300,)
      ])
    ]),
    trigger('toggleOverlay', [
      state('closed', style({
        opacity: 0,
      })),
      state('open', style({
        opacity: 1,

      })),
      transition('* <=> *', [
        animate(300)
      ], { params: { delay: 0 } })
    ]),
    trigger('close', [
      state('closed', style({
        transform: 'rotate(360deg)'
      })),
      transition('* <=> *', [
        animate('0.2s ease-out', style({ transform: 'rotate(180deg)' }))
      ])
    ]),
  ]
})
export class I18nComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  languages: Languages[];
  currentRoute: CurrentRoute;

  state: string = 'closed';
  selectedLanguage: Language;

  constructor(
    public _translate: TranslateService,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService
  ) {
    this.languages = this._I18nService.getLanguages();
    this.currentRoute = this._RoutesService.getCurrentRoute();

    const setDefaultLanguage = this.languages.slice().filter(language => language.key === this.currentRoute.language_key);
    this.selectedLanguage = setDefaultLanguage[0];
    this._I18nService.defaultLanguage$.next(setDefaultLanguage[0]);
  }

  ngOnInit() {

    this._translate.use(this.selectedLanguage.key)
    this._translate.setDefaultLang(this.selectedLanguage.key);

    // this._I18nService.languagesChanged$.pipe(
    //   takeUntil(this._unsubscribeAll))
    //   .subscribe(
    //     (languages: Languages[]) => {
    //       this.languages = languages;
    //     }
    //   );



    // this._I18nService.defaultLanguageChanged$()
    //   .pipe(distinctUntilChanged())
    //   .subscribe((lang: any) => {

    //     this._translate.use(lang.key)
    //     this._translate.setDefaultLang(lang.key);
    //   });

  }

  setLanguage(language: Language) {
    this._translate.setDefaultLang(language.key);
    this._translate.use(language.key)

    this.selectedLanguage = language;

    localStorage.setItem('_frvl_lng_dflt', JSON.stringify(language));

    this._I18nService.defaultLanguage$.next(language);

  }


  toggleLanguage() {
    this.state = (this.state === 'closed' ? 'open' : 'closed');
  }

  changeCurrency(currency: string) {
    this.selectedLanguage.defaultCurrency = currency
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}