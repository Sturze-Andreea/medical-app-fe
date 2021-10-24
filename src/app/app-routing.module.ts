import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './modules/application/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'platform',
        loadChildren: () =>
          import('./modules/platform/platform.module').then(
            (m) => m.PlatformModule
          ),
      },{
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
