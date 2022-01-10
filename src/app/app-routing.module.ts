import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { I18nResolverService } from './core/services/i18n/i18n-resolver.service';
import { RoutesResolver } from './core/services/routes/routes.resolver';
import { BookFlightComponent } from './modules/user/book-flight/book-flight.component';
import { BookFlightResolver } from './modules/user/book-flight/services/book-flight.resolver';



const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

export const routes: Routes = [
  
  { path: '', pathMatch : 'full', redirectTo: 'bilete-avion', data: {title: 'titles.users.root'}},
  //{path: '', component: BookFlightComponent,  resolve: [I18nResolverService] },
  {
    path: 'book-flight',
    loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
    resolve: [I18nResolverService, BookFlightResolver]
  },
  {
    path: 'bilete-avion',
    loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
    resolve: [I18nResolverService, BookFlightResolver]
  },
  // {path: '404', component: BookFlightComponent },
  // {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
