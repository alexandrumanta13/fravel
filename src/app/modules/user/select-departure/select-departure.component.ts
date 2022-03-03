import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Airport, Airports } from '../book-flight/types';



@Component({
  selector: 'app-select-departure',
  templateUrl: './select-departure.component.html',
  styleUrls: ['./select-departure.component.scss']
})
export class SelectDepartureComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  routeSubscription: Subscription = new Subscription;
  departure: any = '';

  airports = new BehaviorSubject<any>('')
  selectedAirport = new BehaviorSubject<any>(this._BookFlightService.departureLocation$.getValue())
  screenHeight: number = 0;
  screenWidth: number = 0;


  constructor(
    private _BookFlightService: BookFlightService,
  ) { }

  ngOnInit(): void {

    this._BookFlightService.getAirports$()
      .pipe(distinctUntilChanged())
      .subscribe((airports: any) => {
        console.log(airports)
        this.airports.next(airports);
      });

    this._BookFlightService.getSelectedDeparture$()
      .pipe(distinctUntilChanged())
      .subscribe((airport: any) => {
        console.log(airport)
        this.selectedAirport.next(airport);
      });

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }


  searchDeparture($event: KeyboardEvent) {
    this.selectedAirport.next('');
    this.airports.next('');
    this.airports.next(this._BookFlightService.getAirportsByCity(this.departure, 'departure'));
  }

  selectDeparture(airport: Airport) {
    this._BookFlightService.selectedDeparture$.next(airport)
  }

  toggleDeparture() {
    this._BookFlightService.departureMenuState$.next(false)
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
