import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TimeParser } from 'src/app/utils/TimeParser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NotificationsPageRoutingModule
  ],
  declarations: [NotificationsPage],
  providers: [
    TimeParser  // Aquí registramos TimeParser como proveedor
  ]
})
export class NotificationsPageModule {}
