import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformModuleComponent } from './platform.module.component';
import { WardsViewComponent } from './wards-view/wards-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PacientsComponent } from './pacients/pacients.component';
import { PacientDetailsComponent } from './pacient-details/pacient-details.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PlatformModuleComponent,
    WardsViewComponent,
    PacientsComponent,
    PacientDetailsComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class PlatformModule { }
