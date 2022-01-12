import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { I18nService } from '../../services';

import { environment } from '../../../../environments/environment.prod'
import { Language, Languages } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class I18nStorageService {

  constructor(private _httpClient: HttpClient, private _I18nService: I18nService) { }

  storeLanguages(languages: Language[]) {
    this._httpClient
      .put(
        environment.FIREBASE_ENDPOINT + 'languages.json',
        languages
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchLanguages() {
    return this._httpClient
      .get<Languages[]>(
        environment.FIREBASE_ENDPOINT + 'languages.json',
      )
      .pipe(
        tap(languages => {
          console.log(languages)
          this._I18nService.setLanguages(languages);
        })
      )
  }
}
