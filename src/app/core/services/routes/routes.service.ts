import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Language } from '../../types';
import { AppRoutes, CurrentRoute } from '../../types';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private _UrlLocation: Location
  ) {

  }

  setRoutes(routes: AppRoutes[], url: string, defaultLanguage: Language) {
    this.routes = routes;

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

    const checkIfURLisDefaultLang = getCurrentUrl.translate_route.filter(route => route.language_key === defaultLanguage.key)

    this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
    this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;
    this.currentLanguage.key = checkIfURLisDefaultLang[0].language_key;

    this.routesChanged$.next(this.routes.slice());
    this.currentRoute$.next(checkIfURLisDefaultLang[0]);

  
    if(this.currentRouteSet.url != url) { 
      setTimeout(() => {
        this._UrlLocation.replaceState(this.currentRouteSet.url);
      }, 200)
    }

  }


  translateCurrentRoute(url: string, defaultLanguage: Language) {

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
