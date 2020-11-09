import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRoutePageRoutingModule } from './new-route-routing.module';

import { NewRoutePage } from './new-route.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRoutePageRoutingModule
  ],
  declarations: [NewRoutePage]
})
export class NewRoutePageModule {}
