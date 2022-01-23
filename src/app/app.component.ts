import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService, I18nStorageService, LoaderService } from './core/services';
import { AppRoutes, Language, Languages } from './core/types';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { GdprService } from './core/services/gdpr/gdpr.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  route: AppRoutes[] = [];
  loading: boolean = true;
  isLoaded: boolean = false;
  cookieConsent$ = this._GdprService.cookieConsent$
  loader$ = this._LoaderService.loader$
  showGdpr = new BehaviorSubject(false);

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
    private I18nStorageService: I18nStorageService,
    private _LoaderService: LoaderService,
    private _GdprService: GdprService,
    private router: Router
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
    this._GdprService.getConsent()
      .pipe(distinctUntilChanged())
      .subscribe((lang: any) => {
        timer(1000).subscribe(x => {
          this.showGdpr.next(true);
        });

      });

    // this._LoaderService.loader$
    //   .pipe(distinctUntilChanged())
    //   .subscribe((state: boolean) => {
    //     // this is for animation only
    //     this.loading = state;
    // 
    //     if (state == false) {

    //   
    //       this.isLoaded = true;
    //   
          

    //     }

    //   });
    //this.I18nStorageService.storeLanguages(this.languages)
    //this.RoutesStorageService.storeRoutes(this.route)

  }

  ngAfterViewInit() {

    // timer(1000).subscribe(x => {
    //   this._LoaderService.setLoaderState(false);
    //   this._GdprService.checkConsent();
    //   //this.router.navigate(['/bilete-avion']);
    // });

   
  }


  changeLang(lang: string) {
    this.translate.use(lang)
    this.translate.setDefaultLang(lang);
  }
  ngOnDestroy() {

  }
}
