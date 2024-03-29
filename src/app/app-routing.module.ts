import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from './data/services/authentication-guard.service';
import { AppLayoutComponent } from './modules/application/app-layout/app-layout.component';
import { HelpComponent } from './modules/application/help/help.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      // {
      //   path: 'help',
      //   component: HelpComponent,
      // },
      {
        path: '',
        loadChildren: () =>
          import('./modules/platform/platform.module').then(
            (m) => m.PlatformModule
          ),
      }
    ],
  },{
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
