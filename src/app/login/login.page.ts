import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../services/api.service';  // Importamos el servicio de API
import { SqliteService } from '../services/sqlite.service';  // Importamos el servicio de SQLite

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  hide = true; 
  username: string = '';  // Inicializa con una cadena vacía
  password: string = '';  // Inicializa con una cadena vacía
  
  // Expresión para validar la contraseña
  passwordPattern = '^(?=(.*\\d){4})(?=(.*[!@#$%^&*()_+\\-=\\[\\]{};\'":|,.<>/?]){3})(?=.*[A-Z]).*$';
  
  togglePasswordVisibility(event: Event) {
    event.preventDefault(); // Evita que el botón envíe el formulario
    this.hide = !this.hide;  // Alterna la visibilidad de la contraseña
  }

  constructor(
    private apiService: ApiService, 
    private sqliteService: SqliteService,  // Servicio SQLite
    private router: Router, 
    private storage: Storage
  ) {
    // PERSISTENCIA
    this.init();
  }

  // Inicialización del almacenamiento
  async init() {
    await this.storage.create();  // Inicializa el almacenamiento local
    await this.sqliteService.createDatabase();  // Inicializa SQLite para futuras operaciones
  }

  // Método que se ejecuta al enviar el formulario de inicio de sesión
  async onSubmit() {
    // Verificar si la contraseña cumple con los requisitos
    if (!new RegExp(this.passwordPattern).test(this.password)) {
      alert('La contraseña no cumple con los requisitos.');
      return;
    }

    // Validación de las credenciales
    if (this.username && this.password) {
      // Buscar el usuario por nombre de usuario a través de la API REST
      this.apiService.getUserByUsername(this.username).subscribe(async (response: any) => {
        if (response.length > 0) {  // Si el usuario existe en la API
          const user = response[0];  // Tomamos el primer usuario que coincida

          if (user.password === this.password) {  // Verificar la contraseña
            // Guardar el estado de sesión y el rol del usuario en local storage
            await this.storage.set('isLoggedIn', true);
            await this.storage.set('role', user.role);
            await this.storage.set('nombre_usuario', user.username);

            // Guardar los datos del usuario en la base de datos local SQLite
            await this.sqliteService.addUser(user.username, user.password, user.role);

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

  // Navegar a la página de restablecimiento de contraseña
  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  // Navegar a la página de registro
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
