import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
