import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
// Importar MatIconModule de Angular Material
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule, // Asegúrate de importar estos módulos
    MatIconModule  // Asegúrate de que esté importado aquí también
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
