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
  animations: [
    trigger('toggleMenu', [
      state('closed', style({
        transform: 'rotate(0deg)'
      })),
      state('open', style({
        transform: 'rotate( 45deg)'
      })),
      transition('* <=> *', [
        group([
          query('@toggleCircle', animateChild()),
          query('@toggleLineOne', animateChild()),
          query('@toggleLineTwo', animateChild()),
          query('@toggleLineThree', animateChild()),
          animate(300),
        ]),
      ]),
    ]),

    trigger('toggleCircle', [
      state('closed', style({
        opacity: 0
      })),
      state('open', style({
        opacity: 1
      })),
      transition('* <=> *', [
        animate(300)
      ])
    ]),
    trigger('toggleLineOne', [
      state('closed', style({
        transform: 'translateY(0)'
      })),
      state('open', style({
        transform: 'translateY(1rem)'
      })),
      transition('* <=> *', [
        animate(300)
      ])
    ]),
    trigger('toggleLineTwo', [
      state('closed', style({
        opacity: 1
      })),
      state('open', style({
        opacity: 0
      })),
      transition('* <=> *', [
        animate(300)
      ])
    ]),
    trigger('toggleLineThree', [
      state('closed', style({
        transform: 'translateY(0) rotate(0)'
      })),
      state('open', style({
        transform: 'translateY(-.8rem) rotate(90deg)'
      })),
      transition('* <=> *', [
        animate(300)
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  state: string = 'closed';
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

}
