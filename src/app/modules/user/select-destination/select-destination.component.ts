import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { Airport } from '../book-flight/types';

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.scss']
})
export class SelectDestinationComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  routeSubscription: Subscription = new Subscription;
  destination: string = '';

  airports = new BehaviorSubject<any>('')
  selectedAirport = new BehaviorSubject<any>('')
  screenHeight: number = 0;
  screenWidth: number = 0;


  constructor(
    private _BookFlightService: BookFlightService,
  ) { }

  ngOnInit(): void {

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }


  searchDestination() {
    this.selectedAirport.next('');
    this.airports.next('');
    this.airports.next(this._BookFlightService.getAirportsByCity(this.destination, 'destination'));
  }

  selectDestination(airport: Airport) {
    this.selectedAirport.next(airport);
    this._BookFlightService.selectDestination$.next(airport);
  }

  toggleDestination() {
    this._BookFlightService.destinationMenuState$.next(false)
  }


  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
