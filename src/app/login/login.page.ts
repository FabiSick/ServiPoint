import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  username: string = '';  // Inicializa con una cadena vacía
  password: string = '';  // Inicializa con una cadena vacía
  
  // Expresión para validar la contraseña
  passwordPattern = '^(?=(.*\\d){4})(?=(.*[!@#$%^&*()_+\\-=\\[\\]{};\'":|,.<>/?]){3})(?=.*[A-Z]).*$';

  constructor(private router: Router, private storage: Storage) {
    //PERSISTENCIA
    this.init();
  }

  
//PERSISTENCIA
  async init() {
    await this.storage.create();  // Inicializa el almacenamiento
  }

  async onSubmit() {
    if (!new RegExp(this.passwordPattern).test(this.password)) {
      alert('La contraseña no cumple con los requisitos.');
      return;
    }
    
    // Aquí se haría la validación de negocio
    if (this.username && this.password) {
      // Guardar el nombre de usuario en el almacenamiento
      await this.storage.set('nombre_usuario', this.username);
      // Redirige a la página de inicio
      this.router.navigate(['/home'], { queryParams: { nombre_usuario: this.username } });
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
