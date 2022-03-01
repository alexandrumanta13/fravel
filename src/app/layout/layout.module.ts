import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { ClassicModule } from './layouts/classic/classic.module';
import { AdminModule } from './layouts/admin/admin.module';

const layoutModules: any = [
  ClassicModule,
  AdminModule
];

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    SharedModule,
    ...layoutModules
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule { }
