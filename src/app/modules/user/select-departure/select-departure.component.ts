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
  isSearching: boolean = false;

  toggleMenuState: string = 'closed';


  constructor(
    private _BookFlightService: BookFlightService,
  ) { }

  ngOnInit(): void {

    this._BookFlightService.openSideMenu$().pipe(
      distinctUntilChanged())
      .subscribe(
        (state) => {
          this.menuOpenState(state);
        }
      );

    this._BookFlightService.getAirports$()
      .pipe(distinctUntilChanged())
      .subscribe((airports: any) => {
        console.log(airports)
        this.airports.next(airports);
      });

    this._BookFlightService.getSelectedDeparture$()
      .pipe(distinctUntilChanged())
      .subscribe((airport: any) => {
        this.selectedAirport.next(airport);
      });

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }


  searchDeparture($event: KeyboardEvent) {
    this.selectedAirport.next('');
    this.airports.next('');
    this.isSearching = true;
    this.airports.next(this._BookFlightService.getAirportsByCity(this.departure, 'departure'));

  }

  selectDeparture(airport: Airport) {
    this._BookFlightService.selectedDeparture$.next(airport);
    this.toggleDeparture();
  }

  toggleDeparture() {
    this._BookFlightService.departureState$.next(false)
  }

  menuOpenState(state: string) {
    if (this._BookFlightService.departureState$.getValue()) {
      this.toggleMenuState = state;
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
