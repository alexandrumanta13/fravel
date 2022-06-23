import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SelectDateService } from '../select-date/select-date.service';
import { SelectPersonsService } from './select-persons.service';

@Component({
  selector: 'app-select-persons',
  templateUrl: './select-persons.component.html',
  styleUrls: ['./select-persons.component.scss']
})
export class SelectPersonsComponent implements OnInit {



  flightType: boolean = true;
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
  noTotalPersons$ = new BehaviorSubject<Persons>({} as Persons)

  constructor(
    private _SelectPersonsService: SelectPersonsService,
    private _SelectDateService: SelectDateService
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
  }

  flightTypeChanged(event: Event) {
    this.flightType = !this.flightType;
    console.log(this.flightType)
    this._SelectDateService.oneWay$.next(!this.flightType ? true : false);
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
    if (this.noOfHandLuggage === 0) {
      return;
    }
    this.noOfHandLuggage -= 1;
    this.calculateTotalPersons();
  }

  toggleSelectPersons() {
    this._SelectPersonsService.personsSelectedState$.next(false)
  }

  selectDate() {
    //this._SelectPersonsService.personsSelectedState$.next(false);
    
   
  }

  changeDateState() {
    this._SelectDateService.dateSelectedState$.next(true);
    setTimeout(() => {
     
    }, 100);
    
  }

}

export interface Persons {
  total: number,
  noOfInfants: number,
  noOfAdults: number,
  noOfHandLuggage: number,
  noOfLuggage: number,
}