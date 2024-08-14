import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [    
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
