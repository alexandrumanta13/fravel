import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { RoutesService } from '..';
import { Language } from '../../types';
import { AppRoutes } from './routes.types';

@Injectable({
  providedIn: 'root'
})
export class RoutesStorageService {

  constructor(private _httpClient: HttpClient, private _RoutesService: RoutesService) { }

  storeRoutes(routes: AppRoutes[]) {
    this._httpClient
      .put(
        environment.FIREBASE_ENDPOINT + 'routes.json',
        routes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRoutes(url: string, defaultLanguage: Language[]) {
    return this._httpClient
      .get<AppRoutes[]>(
        environment.FIREBASE_ENDPOINT + 'routes.json',
      )
      .pipe(
        tap(routes => {
          this._RoutesService.setRoutes(routes, url, defaultLanguage);
        })
      )
  }
}
