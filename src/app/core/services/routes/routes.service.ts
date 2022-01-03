import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Language } from '../../types';
import { AppRoutes, CurrentRoute } from './routes.types';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  routesChanged = new Subject<AppRoutes[]>();
  currentRoute = new Subject<CurrentRoute>();

  private routes: AppRoutes[] = [];
  private currentRouteSet: CurrentRoute = {
    url: '',
    language_key: ''
  }

  constructor(private location: Location, private router: Router) { }

  setRoutes(routes: AppRoutes[], url: string, defaultLanguage: Language[]) {
    this.routes = routes;


    const getCurrentUrl = this.routes.slice()
      .map(route => {
        route.translate_route
          .filter(route => route.url === url)
        return route
      })

    const checkIfURLisDefaultLang = getCurrentUrl[0].translate_route.filter(route => route.language_key === defaultLanguage[0].key)


    this.currentRouteSet.url = checkIfURLisDefaultLang[0].url;
    this.currentRouteSet.language_key = checkIfURLisDefaultLang[0].language_key;

    this.routesChanged.next(this.routes.slice());
    this.currentRoute.next(checkIfURLisDefaultLang[0]);

    if (checkIfURLisDefaultLang[0].url != url) {
      this.router.navigate([`${checkIfURLisDefaultLang[0].url}`])
    }
  }

  getRoutes() {
    return this.routes.slice();
  }

  getCurrentRoute() {
    return this.currentRouteSet;
  }
}
