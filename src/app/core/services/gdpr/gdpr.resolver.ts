import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GdprService } from './gdpr.service';

@Injectable({
  providedIn: 'root'
})
export class GdprResolver implements Resolve<boolean> {
  constructor(
    private _GdprService: GdprService
) { }
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this._GdprService.checkConsent();
  }
}
