import { NgModule } from '@angular/core';

import { BookFlightRoutingModule } from './book-flight-routing.module';
import { BookFlightComponent } from './book-flight.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SelectDepartureComponent } from '../select-departure/select-departure.component';
import { SelectDestinationComponent } from '../select-destination/select-destination.component';
import { SelectDateComponent } from '../select-date/select-date.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectPersonsComponent } from '../select-persons/select-persons.component';


export function createTranslateLoader(http: HttpClient) {
  //return new TranslateHttpLoader(http, './assets/i18n/book-flight/', '.json');
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/book-flight/', suffix: '.json' },
    { prefix: './assets/i18n/common/', suffix: '.json' },
  ])
}


@NgModule({
  declarations: [
    BookFlightComponent,
    SelectDepartureComponent,
    SelectDestinationComponent,
    SelectDateComponent,
    SelectPersonsComponent
  ],
  imports: [
    SharedModule,
    BookFlightRoutingModule,
    TranslateModule.forChild({
      //useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: true
    }),
    NgbModule
  ],
  providers: []
})
export class BookFlightModule { }
