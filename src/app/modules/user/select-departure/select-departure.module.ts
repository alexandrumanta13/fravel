import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SelectDepartureComponent } from './select-departure.component';
import { SelectDepartureRoutingModule } from './select-departure-routing.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/select-departure/', '.json');
}

@NgModule({
    declarations: [
        SelectDepartureComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SelectDepartureRoutingModule,
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
export class SelectDepartureModule { }
