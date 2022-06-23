import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Language } from '../../types';
import { AppRoutes, CurrentRoute } from '../../types';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '..';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routesChanged$ = new Subject<AppRoutes[]>();
  currentRoute$ = new BehaviorSubject<CurrentRoute>({} as CurrentRoute);

  private routes: AppRoutes[] = [];
  private currentRouteSet: CurrentRoute = {
    url: '',
    language_key: ''
  }
  private currentLanguage: Language = {} as Language;

  constructor(
    private location: Location,
    private router: Router,
    public translate: TranslateService,
    private _UrlLocation: Location,
    private _I18nService: I18nService
  ) {

  }

  setRoutes(routes: AppRoutes[], url: string) {

    // check if has parameter in url
    let count = (url.match(/\/.*\//) || []).length;

    if (count > 0) {
      let pageURL = url.split('/').slice(1, 2);
      url = '/' + pageURL.join('/');
    }

    this.routes = routes;
    let getCurrentUrl: AppRoutes = {} as AppRoutes;
    this.routes.slice()
      .map(routes => {
        routes.translate_route
          .filter(route => {
            console.log(route.url)
            if (route.url.includes(url)) {
              console.log(routes)
            }
            if (route.url === url) {
              getCurrentUrl = { ...routes };
            }
          })
      })
    // .map(routes => routes.translate_route.filter(route => !route.url.includes(url)))

    console.log(getCurrentUrl)

    this._I18nService.defaultLanguageChanged$().pipe(
      distinctUntilChanged(),
      tap(defaultLanguage => {
        if (Object.keys(defaultLanguage).length > 0) {
          const checkIfURLisDefaultLang = getCurrentUrl.translate_route.filter(route => route.language_key === defaultLanguage.key)


          this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
          this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;
          this.currentLanguage.key = checkIfURLisDefaultLang[0].language_key;

          this.routesChanged$.next(this.routes.slice());
          this.currentRoute$.next(checkIfURLisDefaultLang[0]);

          if (this.currentRouteSet.url != url) {
            setTimeout(() => {
              this._UrlLocation.replaceState(this.currentRouteSet.url);
            }, 200)
          }
        }

      })
    ).subscribe();

  }


  translateCurrentRoute(url: string, defaultLanguage: Language) {

    // check if has parameter in url
    let count = (url.match(/\/.*\//) || []).length;

    if (count > 0) {
      let pageURL = url.split('/').slice(1, 2);
      url = '/' + pageURL.join('/');
    }

    let getCurrentUrl: AppRoutes = {} as AppRoutes;

    this.routes.slice()
      .map(routes => {
        routes.translate_route
          .filter(route => {
            if (route.url === url) {
              getCurrentUrl = { ...routes };
            }
          })
      })

    const checkIfURLisDefaultLang = getCurrentUrl.translate_route.filter(route => route.language_key === defaultLanguage.key);



    if (this.currentLanguage.key != defaultLanguage.key) {

      this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
      this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;

      this.routesChanged$.next(this.routes.slice());
      this.currentRoute$.next(checkIfURLisDefaultLang[0]);

      setTimeout(() => {
        this._UrlLocation.replaceState(this.currentRouteSet.url);
      }, 200)
    }

  }

  getRoutes() {
    return this.routes.slice();
  }

  getCurrentRoute() {
    return this.currentRouteSet;
  }

  getCurrentRoute$(): Observable<CurrentRoute> {
    return this.currentRoute$.asObservable()
  }
}
