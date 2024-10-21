import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoporteTelefonicoPageRoutingModule } from './soporte-telefonico-routing.module';

import { SoporteTelefonicoPage } from './soporte-telefonico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoporteTelefonicoPageRoutingModule
  ],
  declarations: [SoporteTelefonicoPage]
})
export class SoporteTelefonicoPageModule {}
