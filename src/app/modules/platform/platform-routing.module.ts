import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPacientsViewComponent } from './modals/all-pacients-view/all-pacients-view.component';
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
      },
      {
        path: 'all-pacients',
        component: AllPacientsViewComponent,
      },
      {
        path: 'pacient-details/:hospitalizationId',
        component: PacientDetailsComponent,
      },
      {
        path: 'users',
        component: UsersViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
