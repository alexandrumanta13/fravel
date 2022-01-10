import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutesStorageService } from '..';
import { I18nService } from '../../services';
import { AppRoutes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class RoutesResolver implements Resolve<AppRoutes[]> {

  constructor(
    private _RoutesStorageService: RoutesStorageService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppRoutes[] | Observable<AppRoutes[]> | Promise<AppRoutes[]> {
    return this._RoutesStorageService.fetchRoutes(state.url)
  }
}
