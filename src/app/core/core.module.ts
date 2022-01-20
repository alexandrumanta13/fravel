import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScullyLibModule } from '@scullyio/ng-lib';

import { NgxTranslateRoutesModule } from 'ngx-translate-routes';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderComponent } from './components/loader/loader.component';
import { GdprComponent } from './components/gdpr/gdpr.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';



// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/routes/', '.json');
// }
export function createTranslateLoader(http: HttpClient) {
  //return new TranslateHttpLoader(http, './assets/i18n/book-flight/', '.json');
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/routes/', suffix: '.json' },
    { prefix: './assets/i18n/common/', suffix: '.json' },
  ])
}

@NgModule({
  declarations:[
    LoaderComponent,
    GdprComponent
  ],
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
    // NgxTranslateRoutesModule.forRoot({
    //   enableRouteTranslate: true,
    //   enableTitleTranslate: true
    // }),
    
  ],
  exports: [TranslateModule, NgxTranslateRoutesModule, LoaderComponent, GdprComponent],
  providers: []
})
export class CoreModule { }
