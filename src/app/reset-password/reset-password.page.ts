import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = ''; 

  constructor(private router: Router) {}

  onRecoverPassword() {
    if (this.email) {
      // Aquí puedes simular el proceso de recuperación de contraseña
      alert('Un enlace de recuperación ha sido enviado a tu correo.');
      this.router.navigate(['/login']); // Redirige a la página de Login
    } else {
      alert('Por favor, ingresa un correo válido.');
    }
  }
}