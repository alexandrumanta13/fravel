import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { Language } from 'src/app/core/types';
import { SelectDateService } from './select-date.service';


@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
  providers: [
    I18nService,
    { provide: NgbDatepickerI18n, useClass: SelectDateService },
  ], // define custom NgbDatepickerI18n provider
})

export class SelectDateComponent implements OnInit {

  model!: NgbDateStruct;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  oneWay: boolean = false;

  minDate: { year: number; month: number; day: number; };
  isDisabledOutside: ((date: NgbDateStruct) => boolean) | undefined;

  json = {
    disable: [0],
    disabledDates: [

      // { year: 2021, month: 5, day: 30 },
      // { year: 2021, month: 5, day: 2 },
      // { year: 2021, month: 5, day: 3 },
      // { year: 2021, month: 5, day: 4 },
      { year: 2021, month: 12, day: 23 },
      { year: 2021, month: 12, day: 24 },
      { year: 2021, month: 12, day: 25 },
      { year: 2021, month: 12, day: 25 },
      { year: 2021, month: 12, day: 26 },
      { year: 2021, month: 12, day: 27 },
      { year: 2021, month: 12, day: 31 },
      { year: 2022, month: 1, day: 1 },
      { year: 2022, month: 1, day: 2 },
      { year: 2022, month: 1, day: 3 },
    ]
  };
  selectedDates: any[] = [];

  constructor(
    private calendar: NgbCalendar,
    @Inject(DOCUMENT) private _document: any,
    private _I18nService: I18nService,
    private _SelectDateService: SelectDateService
  ) {
    this.fromDate = this.calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {

    this._SelectDateService.oneWayState$()
      .pipe(distinctUntilChanged())
      .subscribe(oneWay => {

        this.toDate = (oneWay ? null : this.calendar.getNext(this.calendar.getToday(), 'd', 10));
        this.oneWay = oneWay;
        this.addStartAndEndDate();
      })

    this.disableDates();

  }

  addStartAndEndDate() {


    if (!this.oneWay) {
      this.selectedDates = [...this._document.querySelectorAll('.ngb-dp-day')];
      this.selectedDates.map(el => {
        el.classList.remove('start-date');
        el.classList.remove('start-date-only');
        el.classList.remove('end-date');

        if (el.getAttribute('aria-label') == this.fromDate.day + '-' + this.fromDate.month + '-' + this.fromDate.year && this.toDate != null) {
          el.classList.add('start-date')
        } else if (this.fromDate !== null && this.toDate === null) {
          el.classList.add('start-date-only')
        }

        if (this.toDate !== null && el.getAttribute('aria-label') == this.toDate!.day + '-' + this.toDate!.month + '-' + this.toDate!.year) {
          el.classList.add('end-date')
        }

      });
    } else {


      let parent = [...this._document.querySelectorAll('.ngb-dp-day')];
      parent.map(el => {
        el.classList.remove('start-date');
        el.classList.remove('start-date-only');
        el.classList.remove('end-date');
        el.classList.add('oneway');
      });

      let children = [...this._document.querySelectorAll('.custom-day')];
      children.map(el => {
        el.classList.remove('range');
        el.classList.remove('faded');

      });

    }


  }

  ngAfterViewInit() {
    this.addStartAndEndDate();
  }

  onDateSelection(date: NgbDate) {

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.addStartAndEndDate();
    this._SelectDateService.setSelectedDate(this.toDate, this.fromDate)
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  disableDates() {
    this.isDisabledOutside = (date: NgbDateStruct) => {
      return this.json.disabledDates.find(x => new NgbDate(x.year, x.month, x.day).equals(date))
        ? true
        : false;
    };
  }

  toggleSelectDate() {
    this._SelectDateService.dateSelectedState$.next(false)
  }

}


