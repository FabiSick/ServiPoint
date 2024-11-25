import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisuscripcionPageRoutingModule } from './misuscripcion-routing.module';

import { MisuscripcionPage } from './misuscripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisuscripcionPageRoutingModule
  ],
  declarations: [MisuscripcionPage]
})
export class MisuscripcionPageModule {}
