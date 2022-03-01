import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { I18nResolverService } from './core/services/i18n/i18n-resolver.service';
import { RoutesResolver } from './core/services/routes/routes.resolver';
import { LayoutComponent } from './layout/layout.component';

import { BookFlightResolver } from './modules/user/book-flight/services/book-flight.resolver';



const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

export const routes: Routes = [

  // Redirect empty path to '/'
  { path: '', pathMatch: 'full', redirectTo: '/bilete-avion' },

  // Landing routes
  { 
    path: '', 
    //resolve: [I18nResolverService, RoutesResolver],
    data: { layout: 'classic' } ,
    component: LayoutComponent,
    children: [
      {
        path: '', 
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
        resolve: [I18nResolverService, BookFlightResolver, RoutesResolver],
        data: {preload: true}
      },
      {
        path: 'book-flight',
        pathMatch: 'full',
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
        resolve: [I18nResolverService, BookFlightResolver, RoutesResolver],
        data: {preload: true}
      },
      {
        path: 'bilete-avion',
        pathMatch: 'full',
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
        resolve: [I18nResolverService, BookFlightResolver, RoutesResolver],
        data: {preload: true}
      },
      { 
        path: 'bilete-avion/selecteaza-plecare', 
        loadChildren: () => import('src/app/modules/user/select-departure/select-departure.module').then(m => m.SelectDepartureModule),
        resolve: [I18nResolverService, BookFlightResolver], 
      },
      { 
        path: 'book-flight/select-departure', 
        loadChildren: () => import('src/app/modules/user/select-departure/select-departure.module').then(m => m.SelectDepartureModule),
        resolve: [I18nResolverService, BookFlightResolver],
      }
    ]
  },
  //{path: '', component: BookFlightComponent,  resolve: [I18nResolverService] },
  // {
  //   path: 'book-flight',
  //   pathMatch: 'full',
  //   loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
  //   resolve: [I18nResolverService, BookFlightResolver],
    
  // },
  // {
  //   path: 'bilete-avion',
  //   pathMatch: 'full',
  //   loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
  //   resolve: [I18nResolverService, BookFlightResolver]
  // },
  // {path: '404', component: BookFlightComponent },
  // {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
