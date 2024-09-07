import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  username: string = '';  // Inicializa con una cadena vacía
  password: string = '';  // Inicializa con una cadena vacía
  
  // Expresión regular para validar la contraseña
  passwordPattern = '^(?=(.*\\d){4})(?=(.*[!@#$%^&*()_+\\-=\\[\\]{};\'":|,.<>/?]){3})(?=.*[A-Z]).*$';

  constructor(private router: Router) {}

  onSubmit() {
    if (!new RegExp(this.passwordPattern).test(this.password)) {
      alert('La contraseña no cumple con los requisitos.');
      return;
    }
    
    // Aquí se haría la validación de negocio
    if (this.username && this.password) {
      // Redirige a la página de inicio
      this.router.navigate(['/home'], { queryParams: { nombre_usuario: this.username } });
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}