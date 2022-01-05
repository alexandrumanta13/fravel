import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { Language } from 'src/app/core/types';
import { CurrentRoute } from 'src/app/core/services/routes/routes.types';
import { RoutesService } from 'src/app/core/services';
import { DOCUMENT } from '@angular/common';




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
  defaultlanguage = this._I18nService.defaultLanguage;




  constructor(
    public translate: TranslateService,
    private router: Router,
    private _I18nService: I18nService,
    private _RoutesService: RoutesService,
    private _renderer2: Renderer2,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.currentRoute = this._RoutesService.getCurrentRoute();
    //  this.I18nService.defaultLanguage.next(this.languages.slice().filter(language => language.key === this.currentRoute.language_key));
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

    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.dataset.affilid = `fravelfarvelbookflight`;
    script.src = `https://widgets.kiwi.com/scripts/widget-search-iframe.js`
    script.async = true

    this._renderer2.appendChild(this._document.head, script);
    
  }



  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }



}
