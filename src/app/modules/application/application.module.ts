import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from 'src/app/material/material.module';
import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [
    AppLayoutComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    MatToolbarModule
  ]
})
export class ApplicationModule { }
