import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPersonsComponent } from './select-persons.component';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/book-flight/', suffix: '.json' },
    { prefix: './assets/i18n/common/', suffix: '.json' },
  ])
}


@NgModule({
  declarations: [
    SelectPersonsComponent
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
  ]
})
export class SelectPersonsModule { }
