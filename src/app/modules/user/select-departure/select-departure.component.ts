import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { LoaderService, RoutesService } from 'src/app/core/services';
import { CurrentRoute } from 'src/app/core/types';
import { Location } from '@angular/common';
import { GdprService } from 'src/app/core/services/gdpr/gdpr.service';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-select-departure',
  templateUrl: './select-departure.component.html',
  styleUrls: ['./select-departure.component.scss']
})
export class SelectDepartureComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  routeSubscription: Subscription = new Subscription;

  constructor(
    private _router: Router,
    private _RoutesService: RoutesService,
    private _LoaderService: LoaderService,
    private _GdprService: GdprService,
    private _BookFlightService: BookFlightService
  ) { }

  ngOnInit(): void {

    this._BookFlightService.getDepartureLocation$()
      .pipe(distinctUntilChanged())
      .subscribe((airport: any) => {
        //console.log(airport)
      });
  }




  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
