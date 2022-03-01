import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Language, Languages } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  languagesChanged$ = new BehaviorSubject<Languages[]>([]);
  defaultLanguage$ = new BehaviorSubject<Languages>({} as Language);
  items$ = this.defaultLanguage$.asObservable();
  private languages: Languages[] = [];
  existingDefaultLangauge: Language = JSON.parse(localStorage.getItem('_frvl_lng_dflt') || '{}');
  languageState$ = new BehaviorSubject<string>('');
  defaultLanguage: any;

  constructor() { }

  setLanguages(languages: Languages[]) {
    this.languages = languages;
    this.languagesChanged$.next(this.languages.slice());

    if (Object.keys(this.existingDefaultLangauge).length) {
      this.defaultLanguage$.next(this.existingDefaultLangauge);
    } else {
      let language: Language = this.languages.slice().find(language => language.isDefault === true) || {} as Language;
      this.defaultLanguage$.next(language);
    }

    this.getDefaultLanguage();
  }

  defaultLanguageChanged$(): Observable<Language> {
    return this.defaultLanguage$.asObservable();
  }

  getDefaultLanguage() {
    if (Object.keys(this.existingDefaultLangauge).length) {
      return this.existingDefaultLangauge
    } else {
      const setDefaultLang = this.languages.slice().filter(language => language.isDefault === true);
      return setDefaultLang[0];
    }
  }

  getLanguages() {
    return this.languages.slice();
  }
  

  toogleState$(): Observable<string> {
    return this.languageState$.asObservable();
  }
}
