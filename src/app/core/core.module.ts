// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { ScullyLibModule } from '@scullyio/ng-lib';

// import { NgxTranslateRoutesModule } from 'ngx-translate-routes';
// import { HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { LoaderComponent } from './components/loader/loader.component';
// import { GdprComponent } from './components/gdpr/gdpr.component';
// import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
// import { I18nComponent } from '../shared/components/i18n/i18n.component';



// // export function createTranslateLoader(http: HttpClient) {
// //   return new TranslateHttpLoader(http, './assets/i18n/routes/', '.json');
// // }
// export function createTranslateLoader(http: HttpClient) {
//   //return new TranslateHttpLoader(http, './assets/i18n/book-flight/', '.json');
//   return new MultiTranslateHttpLoader(http, [
//     { prefix: './assets/i18n/routes/', suffix: '.json' },
//     { prefix: './assets/i18n/common/', suffix: '.json' },
//   ])
// }

// @NgModule({
//   declarations:[
//     LoaderComponent,
//     GdprComponent,
//     I18nComponent
//   ],
//   imports: [
//     CommonModule,
//     ScullyLibModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: createTranslateLoader,
//         deps: [HttpClient]
//       },
   
//     }),
//     // NgxTranslateRoutesModule.forRoot({
//     //   enableRouteTranslate: true,
//     //   enableTitleTranslate: true
//     // }),
    
//   ],
//   exports: [TranslateModule, NgxTranslateRoutesModule, LoaderComponent, GdprComponent],
//   providers: []
// })
//export class CoreModule { }


import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';    
// import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [],
  imports: [
    ScullyLibModule
    //AuthModule
  ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
