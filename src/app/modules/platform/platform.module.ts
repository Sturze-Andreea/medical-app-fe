import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformModuleComponent } from './platform.module.component';
import { WardsViewComponent } from './wards-view/wards-view.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PacientsComponent } from './pacients/pacients.component';
import { PacientDetailsComponent } from './pacient-details/pacient-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { WardModalComponent } from './modals/ward-modal/ward-modal.component';
import { AllPacientsViewComponent } from './modals/all-pacients-view/all-pacients-view.component';
import { PacientModalComponent } from './modals/pacient-modal/pacient-modal.component';
import { HospitalizationModalComponent } from './modals/hospitalization-modal/hospitalization-modal.component';
import { DetailsHospitalizationComponent } from './details-hospitalization/details-hospitalization.component';
import { TempModalComponent } from './modals/temp-modal/temp-modal.component';
import { PulseModalComponent } from './modals/pulse-modal/pulse-modal.component';
import { BreathModalComponent } from './modals/breaths-modal/breaths-modal.component';
import { TaModalComponent } from './modals/ta-modal/ta-modal.component';
import { AnamnesisModalComponent } from './modals/anamnesis-modal/anamnesis-modal.component';
import { ClinicalExaminationModalComponent } from './modals/clinical-examination-modal/clinical-examination-modal.component';
import { AllTemperaturesComponent } from './modals/all-temperatures/all-temperatures.component';
import { AllPulsesComponent } from './modals/all-pulses/all-pulses.component';
import { AllBreathsComponent } from './modals/all-breaths/all-breaths.component';
import { AllTasComponent } from './modals/all-tas/all-tas.component';
import { AllEvolutionsComponent } from './modals/all-evolutions/all-evolutions.component';
import { EvolutionModalComponent } from './modals/evolution-modal/evolution-modal.component';
import { AllOthersComponent } from './modals/all-others/all-others.component';
import { OthersModalComponent } from './modals/others-modal/others-modal.component';


@NgModule({
  declarations: [
    PlatformModuleComponent,
    WardsViewComponent,
    PacientsComponent,
    PacientDetailsComponent,
    UsersViewComponent,
    UserModalComponent,
    DeleteModalComponent,
    WardModalComponent,
    AllPacientsViewComponent,
    PacientModalComponent,
    HospitalizationModalComponent,
    DetailsHospitalizationComponent,
    TempModalComponent,
    PulseModalComponent,
    BreathModalComponent,
    TaModalComponent,
    AnamnesisModalComponent,
    ClinicalExaminationModalComponent,
    AllTemperaturesComponent,
    AllPulsesComponent,
    AllBreathsComponent,
    AllTasComponent,
    AllEvolutionsComponent,
    EvolutionModalComponent,
    AllOthersComponent,
    OthersModalComponent,
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class PlatformModule { }
