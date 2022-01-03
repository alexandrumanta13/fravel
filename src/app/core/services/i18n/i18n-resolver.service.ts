import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { I18nStorageService } from '..';

import { Language } from './i18n.type';

@Injectable({
  providedIn: 'root'
})
export class I18nResolverService implements Resolve<Language[]> {

  constructor(
      private I18nStorageService: I18nStorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Language[] | Observable<Language[]> | Promise<Language[]> {
    return this.I18nStorageService.fetchLanguages();
  }
}
