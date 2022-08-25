import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuardService } from 'src/app/data/services/authorization-guard.service';
import { AllPacientsViewComponent } from './all-pacients-view/all-pacients-view.component';
import { PacientDetailsComponent } from './pacient-details/pacient-details.component';
import { PacientsComponent } from './pacients/pacients.component';
import { PlatformModuleComponent } from './platform.module.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { WardsViewComponent } from './wards-view/wards-view.component';

const routes: Routes = [
  {
    path: '',
    component: PlatformModuleComponent,
    children: [
      {
        path: '',
        component: WardsViewComponent,
      },
      {
        path: 'hospitalizations/:wardId',
        component: PacientsComponent,
        canActivate: [AuthorizationGuardService],
        data: {
          authorization: {
            roles: ['Doctor', 'Nurse'],
          },
        },
      },
      {
        path: 'all-pacients',
        component: AllPacientsViewComponent,
        canActivate: [AuthorizationGuardService],
        data: {
          authorization: {
            roles: ['Doctor', 'Nurse'],
          },
        },
      },
      {
        path: 'pacient-details/:hospitalizationId',
        component: PacientDetailsComponent,
        canActivate: [AuthorizationGuardService],
        data: {
          authorization: {
            roles: ['Doctor', 'Nurse'],
          },
        },
      },
      {
        path: 'users',
        component: UsersViewComponent,
        canActivate: [AuthorizationGuardService],
        data: {
          authorization: {
            roles: ['Admin'],
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
