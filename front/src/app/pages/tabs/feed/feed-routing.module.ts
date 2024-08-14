import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPage } from './feed.page';
import { ComponentsModule } from '../../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FeedPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [RouterModule]
})
export class FeedPageRoutingModule {}
