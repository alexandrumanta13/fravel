import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { I18nStorageService } from '..';


import { Language, Languages } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class I18nResolverService implements Resolve<Languages[]> {

  constructor(
      private _I18nStorageService: I18nStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Languages[] | Observable<Languages[]> | Promise<Languages[]> {
    return this._I18nStorageService.fetchLanguages();
  }
}
