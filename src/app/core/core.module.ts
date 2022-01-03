import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScullyLibModule } from '@scullyio/ng-lib';

import { NgxTranslateRoutesModule } from 'ngx-translate-routes';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/routes/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ScullyLibModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
   
    }),
    NgxTranslateRoutesModule.forRoot({
      enableRouteTranslate: true,
      enableTitleTranslate: true
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: ''
    // })
  ],
  exports: [TranslateModule, NgxTranslateRoutesModule],
  providers: []
})
export class CoreModule { }
