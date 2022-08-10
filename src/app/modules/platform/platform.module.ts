import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformModuleComponent } from './platform.module.component';
import { WardsViewComponent } from './wards-view/wards-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PacientsComponent } from './pacients/pacients.component';
import { PacientDetailsComponent } from './pacient-details/pacient-details.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { WardModalComponent } from './ward-modal/ward-modal.component';
import { AllPacientsViewComponent } from './all-pacients-view/all-pacients-view.component';
import { PacientModalComponent } from './pacient-modal/pacient-modal.component';
import { HospitalizationModalComponent } from './hospitalization-modal/hospitalization-modal.component';
import { DetailsHospitalizationComponent } from './details-hospitalization/details-hospitalization.component';


@NgModule({
  declarations: [
    PlatformModuleComponent,
    WardsViewComponent,
    PacientsComponent,
    PacientDetailsComponent,
    DialogComponent,
    UsersViewComponent,
    UserModalComponent,
    DeleteModalComponent,
    WardModalComponent,
    AllPacientsViewComponent,
    PacientModalComponent,
    HospitalizationModalComponent,
    DetailsHospitalizationComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class PlatformModule { }
