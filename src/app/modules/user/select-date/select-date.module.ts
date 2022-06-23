import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { SelectDateComponent } from './select-date.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {
  //return new TranslateHttpLoader(http, './assets/i18n/book-flight/', '.json');
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/book-flight/', suffix: '.json' },
    { prefix: './assets/i18n/common/', suffix: '.json' },
  ])
}
@NgModule({
  declarations: [
    SelectDateComponent
  ],
  imports: [
    SharedModule,
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
  ]
})
export class SelectDateModule { }
