import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { I18nComponent } from './components/i18n/i18n.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/common/', '.json');
  }
  

@NgModule({
    declarations: [
        HeaderComponent,
        I18nComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        I18nComponent,
    ],
    providers: []
})
export class SharedModule {
}
