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
    resolve: [BookFlightResolver],
    data: { layout: 'classic' },
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
        data: { preload: true }
      },
      {
        path: 'book-flight',
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
       
        data: { preload: true }
      },
      {
        path: 'bilete-avion',
        loadChildren: () => import('src/app/modules/user/book-flight/book-flight.module').then(m => m.BookFlightModule),
        data: { preload: true }
      },
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
