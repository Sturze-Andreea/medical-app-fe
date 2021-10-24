import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformModuleComponent } from './platform.module.component';


@NgModule({
  declarations: [
    PlatformModuleComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule
  ]
})
export class PlatformModule { }
