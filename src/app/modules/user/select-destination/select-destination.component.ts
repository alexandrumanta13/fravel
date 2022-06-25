import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { Airport } from '../book-flight/types';
import { SelectPersonsService } from '../select-persons/select-persons.service';

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
  departureAirportSelected: any;
  destinationAirportSelected: any;

  toggleMenuState: string = 'closed';


  constructor(
    private _BookFlightService: BookFlightService,
    private _SelectPersonsService: SelectPersonsService,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this._BookFlightService.getSelectedDeparture$()
      .pipe(distinctUntilChanged())
      .subscribe((airport: any) => {
        this.departureAirportSelected = airport;
      });

    this._BookFlightService.destination$()
      .pipe(distinctUntilChanged())
      .subscribe((destination: any) => {
        console.log(destination)

        if (Array.isArray(destination)) {
          this.destinationAirportSelected = destination[0][0];
        } else {
          this.destinationAirportSelected = destination;
        }

      })

    this._BookFlightService.openSideMenu$().pipe(
      distinctUntilChanged())
      .subscribe(
        (state) => {
          this.menuOpenState(state);
        }
      );
  }


  searchDestination() {
    this.selectedAirport.next('');
    this.airports.next('');
    this.airports.next(this._BookFlightService.getAirportsByCity(this.destination, 'destination'));
  }

  selectDestination(airport: Airport) {
    this.selectedAirport.next(airport);
    this._BookFlightService.selectDestination$.next(airport);
    this._BookFlightService.selectedDestination$.next(airport)
    this.toggleDestination();
    if (Object.keys(this.departureAirportSelected).length) {
      // setTimeout(() => {
      //   this.route.navigate(['/alege-data'])
      // }, 800)
      this._SelectPersonsService.personsSelectedState$.next(true)
    }
  }

  toggleDestination() {
    this._BookFlightService.destinationMenuState$.next(false)
  }

  menuOpenState(state: string) {
    this.toggleMenuState = state
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
