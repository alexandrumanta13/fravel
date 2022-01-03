import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesResolver } from 'src/app/core/services/routes/routes.resolver';
import { BookFlightComponent } from './book-flight.component';

const routes: Routes = [

  { path: '', component: BookFlightComponent, data: { title: 'BOOK-FILGHT.TITLE' }, resolve: [RoutesResolver] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookFlightRoutingModule { }
