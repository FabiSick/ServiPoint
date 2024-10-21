import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importar módulos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PERSISTENCIA
import { IonicStorageModule } from '@ionic/storage-angular';
// Importar el modulo HTTP
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
// Importar Angular Material
import { MatIconModule } from '@angular/material/icon';  // Asegúrate de importar este módulo


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    //PERSISTENCIA
    IonicStorageModule.forRoot(),
    //Importar modulo API
    HttpClientModule,
    FormsModule,
    MatIconModule  // Asegúrate de añadirlo aquí

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
