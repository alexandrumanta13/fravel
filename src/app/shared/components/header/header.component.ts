import { style, trigger, state, transition, group, query, animate, animateChild } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { Language } from 'src/app/core/types';
import { BookFlightService } from 'src/app/modules/user/book-flight/services/book-flight.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  state: string = 'closed';
  languageState: string = 'closed';
  defaultFlag: Language = this._I18nService.getDefaultLanguage();

  constructor(
    private _I18nService: I18nService,
    private _BookFlightService: BookFlightService
  ) { }

  ngOnInit(): void {
    this._I18nService.defaultLanguageChanged$()
      .pipe(distinctUntilChanged())
      .subscribe((lang: Language) => {
        this.defaultFlag = (lang)
      });
  }

  toggleMenu() {
    this.state = (this.state === 'closed' ? 'open' : 'closed');
    this._BookFlightService.menuState$.next(this.state)
  }

  toggleLanguage() {
    console.log(this._BookFlightService.menuState$.getValue())
    if(this._BookFlightService.menuState$.getValue() === 'open') {
      this.state = 'closed';
      this._BookFlightService.menuState$.next(this.state)
    }
    this.languageState = (this.state === 'closed' ? 'open' : 'closed');
    this._I18nService.languageState$.next(this.languageState);
    
  }

}
