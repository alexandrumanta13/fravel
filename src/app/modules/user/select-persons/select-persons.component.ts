import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BookFlightService } from '../book-flight/services/book-flight.service';
import { SelectDateService } from '../select-date/select-date.service';
import { SelectPersonsService } from './select-persons.service';
import { BagsQueryType, BagsType, IBagsOptions, Persons } from './select-persons.type';

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
  noOfTotalHandLuggage: number = 0;
  noOfTotalHoldLuggage: number = 0;

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

        console.log(noTotalPersons)

        if (noTotalPersons.noOfInfants >= this.noOfAdults) {
          this.disabledAddInfant$.next(true);
          this.noOfInfants = this.noOfAdults;
        } else {
          this.disabledAddInfant$.next(false);
        }

        if (noTotalPersons.noOfTotalHandLuggage >= (this.noOfAdults + this.noOfChilds)) {
          this.disabledAddHandLuggage$.next(true);
          this.noOfTotalHandLuggage = (this.noOfAdults + this.noOfChilds);
        } else {
          this.disabledAddHandLuggage$.next(false);
        }

        if (noTotalPersons.noOfTotalHoldLuggage >= ((this.noOfAdults + this.noOfChilds) * 2)) {
          this.disabledAddLuggage$.next(true);
          this.noOfTotalHoldLuggage = ((this.noOfAdults + this.noOfChilds) * 2);
        } else {
          this.disabledAddLuggage$.next(false);
        }

        const bagOptionsAdultQuery : IBagsOptions = {
          selectedAdults: this.noOfAdults,
          bagsQueryType: BagsQueryType.adult,
          bagsSelected: noTotalPersons.noOfTotalHandLuggage,
          bagsType: BagsType.hand
        }

        const bagOptionsChildrenQuery : IBagsOptions = {
          selectedChildren: this.noOfChilds,
          bagsSelected: noTotalPersons.noOfTotalHandLuggage,
          bagsQueryType: BagsQueryType.children,
          bagsType: BagsType.hand
        }

        console.log(this._SelectPersonsService.generateKiwiSerializedBags(bagOptionsChildrenQuery));
        console.log(this._SelectPersonsService.generateKiwiSerializedBags(bagOptionsAdultQuery));
        // generateKiwiSerializedBags(bagOptionsAdultQuery);

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
        'noOfTotalHandLuggage': this.noOfTotalHandLuggage,
        'noOfTotalHoldLuggage': this.noOfTotalHoldLuggage
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
    this.noOfTotalHandLuggage += 1;
    this.calculateTotalPersons();
  }

  removeOneHandLuggage() {
    if (this.noOfTotalHandLuggage === 0) {
      return;
    }
    this.noOfTotalHandLuggage -= 1;
    this.calculateTotalPersons();
  }

  addOneLuggage() {
    this.noOfTotalHoldLuggage += 1;
    this.calculateTotalPersons();
  }

  removeOneLuggage() {
    if (this.noOfTotalHoldLuggage === 0) {
      return;
    }
    this.noOfTotalHoldLuggage -= 1;
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




