import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutesStorageService } from '..';
import { I18nService } from '../../services';
import { AppRoutes } from './routes.types';

@Injectable({
  providedIn: 'root'
})
export class RoutesResolver implements Resolve<AppRoutes[]> {

  constructor(
    private _RoutesStorageService: RoutesStorageService,
    private _I18nService: I18nService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppRoutes[] | Observable<AppRoutes[]> | Promise<AppRoutes[]> {
    return this._RoutesStorageService.fetchRoutes(state.url, this._I18nService.getDefaultLanguage())
  }
}
