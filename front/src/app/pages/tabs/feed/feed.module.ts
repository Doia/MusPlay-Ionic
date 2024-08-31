import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedPage } from './feed.page';
import { ComponentsModule } from '../../../components/components.module';

import { FeedPageRoutingModule } from './feed-routing.module';
import { TimeParser } from 'src/app/utils/TimeParser';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    FeedPageRoutingModule
  ],
  declarations: [FeedPage],
  providers: [
    TimeParser  // Aquí registramos TimeParser como proveedor
  ]
})
export class FeedPageModule {}
