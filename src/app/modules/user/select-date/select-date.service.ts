import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { I18nService } from 'src/app/core/services';
import { Language } from 'src/app/core/types';
import { DateValues } from './select-date.type';


@Injectable({
  providedIn: 'root'
})
export class SelectDateService extends NgbDatepickerI18n {
  defaultlanguage: Language = this._I18nService.getDefaultLanguage()
  i18nDates: DateValues[];

  dateSelected$ = new BehaviorSubject<any>('');
  dateSelectedState$ = new BehaviorSubject<boolean>(false);
  oneWay$ = new BehaviorSubject<boolean>(false);
  constructor(private _I18nService: I18nService) {
    super();
    console.log(this.defaultlanguage)
    
    this.i18nDates = [
      {
        key: 'ro',
        weekdays: ['Lu', 'Ma', 'Mie', 'Joi', 'Vi', 'Sa', 'Du'],
        months: [
          'Ianuarie',
          'Februarie',
          'Martie',
          'Aprilie',
          'Mai',
          'Iunie',
          'Iulie',
          'August',
          'Septembrie',
          'Octombrie',
          'Noiembrie',
          'Decembrie',
        ],
        //weekLabel: 'sem'
      },
      {
        key: 'en',
        weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        //weekLabel: 'sem'
      }
    ];
    
  }

  ngOnInit() {
    console.log('asdasd11111')
  }

  getWeekdayLabel(weekday: number): string {
    const weekdays = this.i18nDates.filter(lang => lang.key == 'ro').map(week => week.weekdays)
    return weekdays[0][weekday - 1];

  }
  // getWeekLabel(): string {
  //   return I18N_VALUES[this._i18n.language].weekLabel;
  // }
  getMonthShortName(month: number): string {
    const months = this.i18nDates.filter(lang => lang.key == 'ro').map(month => month.months)
    return months[0][month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);

  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  setSelectedDate(toDate: any, fromDate: any) {
    this.dateSelected$.next({'fromDate': fromDate, 'toDate': toDate});
  }

  getSelectedDate$(): Observable<any> {
    return this.dateSelected$.asObservable();
  }
  getSelectedDateState$(): Observable<any> {
    return this.dateSelectedState$.asObservable();
  }

  oneWayState$(): Observable<any> {
    return this.oneWay$.asObservable();
  }
}
