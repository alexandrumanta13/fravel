import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GdprResolver } from 'src/app/core/services/gdpr/gdpr.resolver';
import { I18nResolverService } from 'src/app/core/services/i18n/i18n-resolver.service';
import { RoutesResolver } from 'src/app/core/services/routes/routes.resolver';
import { BookFlightComponent } from './book-flight.component';

const routes: Routes = [

  { path: '', component: BookFlightComponent, data: { title: 'asdad' } },
  { path: 'bilete-avion/:departure', component: BookFlightComponent, data: { title: 'departure' } },
  { path: 'book-flight/:departure', component: BookFlightComponent, data: { title: 'departure' } },
  // { path: 'book-flight', component: BookFlightComponent, data: { title: 'BOOK-FILGHT.TITLE' }, resolve: [I18nResolverService, RoutesResolver] },
  // { path: 'bilete-avion', component: BookFlightComponent, data: { title: 'BOOK-FILGHT.TITLE' }, resolve: [I18nResolverService, RoutesResolver] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookFlightRoutingModule { }
