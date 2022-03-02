import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { I18nService, RoutesService } from '..';
import { AppRoutes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class RoutesStorageService {

  constructor(
    private _httpClient: HttpClient,
    private _RoutesService: RoutesService,
    private _I18nService: I18nService
  ) { }

  storeRoutes(routes: AppRoutes[]) {
    this._httpClient
      .put(
        environment.FIREBASE_ENDPOINT + 'routes.json',
        routes
      )
      .subscribe();
  }

  fetchRoutes(url: string) {
    return this._httpClient
      .get<AppRoutes[]>(
        environment.FIREBASE_ENDPOINT + 'routes.json',
      )
      .pipe(
        tap(routes => {
          this._RoutesService.setRoutes(routes, url);
        })
      )
  }
}
