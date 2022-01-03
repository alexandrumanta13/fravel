import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Language } from './i18n.type';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  languagesChanged = new BehaviorSubject<Language[]>([]);
  defaultLanguage = new BehaviorSubject<Language[]>([]);
  items$ = this.defaultLanguage.asObservable();
  private languages: Language[] = [];

  constructor() { }

  setLanguages(languages: Language[]) {
    this.languages = languages;
    this.languagesChanged.next(this.languages.slice());
    this.defaultLanguage.next(this.languages.slice().filter(language => language.isDefault === true));
  }

  defaultLanguageChanged$(): Observable<any> {
    return this.defaultLanguage.asObservable();
  }

  getDefaultLanguage() {
    return this.languages.slice().filter(language => language.isDefault === true)
  }

  getLanguages() {
    return this.languages.slice();
  }
}
