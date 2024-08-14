import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedPage } from './feed.page';
import { ComponentsModule } from '../../../components/components.module';

import { FeedPageRoutingModule } from './feed-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    FeedPageRoutingModule
  ],
  declarations: [FeedPage]
})
export class FeedPageModule {}
