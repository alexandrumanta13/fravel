import { style, trigger, state, transition, group, query, animate, animateChild } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.state = ( this.state === 'closed' ? 'open' : 'closed' );
  }

}
