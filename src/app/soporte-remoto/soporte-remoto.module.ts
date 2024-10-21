import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoporteRemotoPageRoutingModule } from './soporte-remoto-routing.module';

import { SoporteRemotoPage } from './soporte-remoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoporteRemotoPageRoutingModule
  ],
  declarations: [SoporteRemotoPage]
})
export class SoporteRemotoPageModule {}
