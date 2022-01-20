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

  constructor(
    private location: Location, 
    private router: Router, 
    public translate: TranslateService,
    private _UrlLocation: Location
    ) { 
   
  }

  setRoutes(routes: AppRoutes[], url: string, defaultLanguage: Language) {
    this.routes = routes;

    const getCurrentUrl = this.routes.slice()
      .map(route => {
        route.translate_route
          .filter(route => route.url === url)
        return route
      })

    const checkIfURLisDefaultLang = getCurrentUrl[0].translate_route.filter(route => route.language_key === defaultLanguage.key)


    this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
    this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;

    this.routesChanged$.next(this.routes.slice());
    this.currentRoute$.next(checkIfURLisDefaultLang[0]);

    // if (checkIfURLisDefaultLang[0].url != url) {
    //   this._UrlLocation.replaceState(checkIfURLisDefaultLang[0].url );
    // }
  }

  manageRoutesLanguage() {

  }

  translateCurrentRoute(url: string, defaultLanguage: Language) {

    const getCurrentUrl = this.routes.slice()
    .map(route => {
      route.translate_route
        .filter(route => route.url === url)
      return route
    })

    const checkIfURLisDefaultLang = getCurrentUrl[0].translate_route.filter(route => route.language_key === defaultLanguage.key);

    this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
    this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;

    this.routesChanged$.next(this.routes.slice());
    this.currentRoute$.next(checkIfURLisDefaultLang[0]);
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
