import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookFlightRoutingModule } from './book-flight-routing.module';
import { BookFlightComponent } from './book-flight.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';


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

  ],
  providers: []
})
export class BookFlightModule { }
