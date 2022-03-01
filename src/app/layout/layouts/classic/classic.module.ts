import { NgModule } from '@angular/core';
import { ClassicLayoutComponent } from './classic.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { I18nComponent } from 'src/app/shared/components/i18n/i18n.component';
import { LoaderComponent } from 'src/app/core/components/loader/loader.component';
import { GdprComponent } from 'src/app/core/components/gdpr/gdpr.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/common/', '.json');
}


@NgModule({
  declarations: [
    ClassicLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    I18nComponent,
    LoaderComponent,
    GdprComponent,
  ],
  imports: [
    RouterModule,
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
  ],
  exports: [
    ClassicLayoutComponent
  ]
})
export class ClassicModule { }
