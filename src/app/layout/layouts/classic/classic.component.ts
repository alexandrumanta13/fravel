import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { I18nService, LoaderService } from 'src/app/core/services';
import { GdprService } from 'src/app/core/services/gdpr/gdpr.service';
import { Language } from 'src/app/core/types';
import { BookFlightService } from 'src/app/modules/user/book-flight/services/book-flight.service';


@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  styleUrls: ['./classic.component.scss']
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  isLoaded: boolean = false;
  cookieConsent$ = this._GdprService.cookieConsent$
  loader$ = this._LoaderService.loader$
  showGdpr = new BehaviorSubject(false);
  toggleMenuState: string = '';
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    public translate: TranslateService,
    private _I18nService: I18nService,
    private _LoaderService: LoaderService,
    private _GdprService: GdprService,
    private _BookFlightService: BookFlightService
  ) { }

  ngOnInit(): void {

    this._I18nService.defaultLanguageChanged$()
      .pipe(distinctUntilChanged())
      .subscribe((lang: Language) => {
        this.translate.use(lang.key)
        this.translate.setDefaultLang(lang.key);
      });
      this._BookFlightService.openSideMenu$().pipe(
        takeUntil(this._unsubscribeAll))
        .subscribe(
          (state) => {
            this.menuOpenState(state);
          }
        );
    this._GdprService.getConsent()
      .pipe(distinctUntilChanged())
      .subscribe((lang: any) => {
        timer(1000).subscribe(x => {
          this.showGdpr.next(true);
        });

      });
  }

  menuOpenState(state: string) {
    this.toggleMenuState = state;
    console.log(this.toggleMenuState)
  }

  changeLang(lang: string) {
    this.translate.use(lang)
    this.translate.setDefaultLang(lang);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._LoaderService.loader$.next(false);
      this._GdprService.checkConsent();
      // this.routeSubscription = this._RoutesService.currentRoute$
      //   .subscribe((currentRoute: CurrentRoute) => {
      //     this._UrlLocation.replaceState(currentRoute.url);
      //   });
    }, 200)
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
