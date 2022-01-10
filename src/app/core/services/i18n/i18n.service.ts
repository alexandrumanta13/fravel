import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Language, Languages } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  languagesChanged$ = new BehaviorSubject<Languages[]>([]);
  defaultLanguage$ = new Subject<Language>();
  items$ = this.defaultLanguage$.asObservable();
  private languages: Languages[] = [];

  constructor() { }

  setLanguages(languages: Languages[]) {
    this.languages = languages;
    this.languagesChanged$.next(this.languages.slice());
    this.defaultLanguage$.next(this.languages.slice().find(language => language.isDefault === true));
  }

  defaultLanguageChanged$(): Observable<Language> {
    return this.defaultLanguage$.asObservable();
  }

  getDefaultLanguage() {
    const setDefaultLang = this.languages.slice().filter(language => language.isDefault === true);
    return setDefaultLang[0];
  }

  getLanguages() {
    return this.languages.slice();
  }
}
