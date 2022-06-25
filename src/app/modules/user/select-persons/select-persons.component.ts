import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { SelectDateService } from '../select-date/select-date.service';
import { SelectPersonsService } from './select-persons.service';

@Component({
  selector: 'app-select-persons',
  templateUrl: './select-persons.component.html',
  styleUrls: ['./select-persons.component.scss']
})
export class SelectPersonsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('scrollTop') private myScrollContainer!: ElementRef;

  classType: boolean = true;

  noOfAdults: number = 1;
  noOfChilds: number = 0;
  noOfInfants: number = 0;
  noOfHandLuggage: number = 0;
  noOfLuggage: number = 0;

  disabledAdd$ = new BehaviorSubject<boolean>(false);
  disabledAddHandLuggage$ = new BehaviorSubject<boolean>(false);
  disabledAddLuggage$ = new BehaviorSubject<boolean>(false);
  disabledAddInfant$ = new BehaviorSubject<boolean>(false);
  noTotalPersons$ = new BehaviorSubject<Persons>({} as Persons);

  toggleMenuState: string = 'closed';

  constructor(
    private _SelectPersonsService: SelectPersonsService,
    private _SelectDateService: SelectDateService,
    private _BookFlightService: BookFlightService,
    @Inject(DOCUMENT) private _document: any,
  ) { }

  ngOnInit(): void {
    this.noTotalPersons$
      .pipe(distinctUntilChanged())
      .subscribe((noTotalPersons: Persons) => {

        (noTotalPersons.total >= 9 ? this.disabledAdd$.next(true) : this.disabledAdd$.next(false));

        if (noTotalPersons.noOfInfants >= this.noOfAdults) {
          this.disabledAddInfant$.next(true);
          this.noOfInfants = this.noOfAdults;
        } else {
          this.disabledAddInfant$.next(false);
        }

        if (noTotalPersons.noOfHandLuggage >= (this.noOfAdults + this.noOfChilds)) {
          this.disabledAddHandLuggage$.next(true);
          this.noOfHandLuggage = (this.noOfAdults + this.noOfChilds);
        } else {
          this.disabledAddHandLuggage$.next(false);
        }

        if (noTotalPersons.noOfLuggage >= ((this.noOfAdults + this.noOfChilds) * 2)) {
          this.disabledAddLuggage$.next(true);
          this.noOfLuggage = ((this.noOfAdults + this.noOfChilds) * 2);
        } else {
          this.disabledAddLuggage$.next(false);
        }

      });

    this._BookFlightService.openSideMenu$().pipe(
      distinctUntilChanged())
      .subscribe(
        (state) => {
          this.menuOpenState(state);
        }
      );
  }

  

  classTypeChanged(event: Event) {
    this.classType = !this.classType;
  }

  calculateTotalPersons() {
    this.noTotalPersons$.next(
      {
        'total': this.noOfAdults + this.noOfChilds + this.noOfInfants,
        'noOfInfants': this.noOfInfants,
        'noOfAdults': this.noOfAdults,
        'noOfHandLuggage': this.noOfHandLuggage,
        'noOfLuggage': this.noOfLuggage
      })
  }

  addOneAdult() {
    this.noOfAdults += 1;
    this.calculateTotalPersons();
  }

  removeOneAdult() {
    if (this.noOfAdults === 1) {
      return;
    }
    this.noOfAdults -= 1;
    this.calculateTotalPersons();
  }

  addOneChild() {
    this.noOfChilds += 1;
    this.calculateTotalPersons();
  }

  removeOneChild() {
    if (this.noOfChilds === 0) {
      return;
    }
    this.noOfChilds -= 1;
    this.calculateTotalPersons();
  }
  addOneInfant() {
    this.noOfInfants += 1;
    this.calculateTotalPersons();
  }

  removeOneInfant() {
    if (this.noOfInfants === 0) {
      return;
    }
    this.noOfInfants -= 1;
    this.calculateTotalPersons();
  }

  addOneHandLuggage() {
    this.noOfHandLuggage += 1;
    this.calculateTotalPersons();
  }

  removeOneHandLuggage() {
    if (this.noOfHandLuggage === 0) {
      return;
    }
    this.noOfHandLuggage -= 1;
    this.calculateTotalPersons();
  }

  addOneLuggage() {
    this.noOfLuggage += 1;
    this.calculateTotalPersons();
  }

  removeOneLuggage() {
    if (this.noOfLuggage === 0) {
      return;
    }
    this.noOfLuggage -= 1;
    this.calculateTotalPersons();
  }

  toggleSelectPersons() {
    this._SelectPersonsService.personsSelectedState$.next(false);
  }

  selectDate() {
    this._SelectPersonsService.personsSelectedState$.next(false);
    setTimeout(() => {
      this.scrollToTop();
    }, 500);
    
  }

  changeDateState() {
    this._SelectDateService.dateSelectedState$.next(true);
  }

  menuOpenState(state: string) {
    this.toggleMenuState = state
  }

  scrollToTop() {
    console.log(this.myScrollContainer.nativeElement)
    try {
      this.myScrollContainer.nativeElement.scrollTop = 0;
    } catch (err) { }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

export interface Persons {
  total: number,
  noOfInfants: number,
  noOfAdults: number,
  noOfHandLuggage: number,
  noOfLuggage: number,
}

function takeUntil(_unsubscribeAll: any): import("rxjs").OperatorFunction<string, unknown> {
  throw new Error('Function not implemented.');
}
