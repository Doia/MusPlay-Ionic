import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { TimeParser } from 'src/app/utils/TimeParser';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage],
  providers: [
    TimeParser  // Aquí registramos TimeParser como proveedor
  ]
})
export class ProfilePageModule {}
