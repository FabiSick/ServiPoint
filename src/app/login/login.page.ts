import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../services/api.service';

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

  constructor(private apiService: ApiService,private router: Router, private storage: Storage) {
    //PERSISTENCIA
    this.init();
  }

  
//PERSISTENCIA
  async init() {
    await this.storage.create();  // Inicializa el almacenamiento
  }

  async onSubmit() {


    // Verificar si la contraseña cumple con los requisitos
    if (!new RegExp(this.passwordPattern).test(this.password)) {
      alert('La contraseña no cumple con los requisitos.');
      return;
    }

    // Validación de las credenciales
    if (this.username && this.password) {
      // Buscar el usuario por nombre de usuario
      this.apiService.getUserByUsername(this.username).subscribe(async (response: any) => {
        if (response.length > 0) {  // Si el usuario existe
          const user = response[0];  // Tomamos el primer usuario que coincida

          if (user.password === this.password) {  // Verificar la contraseña
            // Guardar el estado de sesión y el rol del usuario
            await this.storage.set('isLoggedIn', true);
            await this.storage.set('role', user.role);
            await this.storage.set('nombre_usuario', user.username);

            // Redirigir al usuario a la página de inicio
            this.router.navigate(['/home']);
          } else {
            alert('Contraseña incorrecta.');
          }
        } else {
          alert('Usuario no encontrado.');
        }
      }, error => {
        console.error('Error al buscar el usuario:', error);
        alert('Hubo un error al iniciar sesión.');
      });
    } else {
      alert('Por favor, ingresa tu nombre de usuario y contraseña.');
    }
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
