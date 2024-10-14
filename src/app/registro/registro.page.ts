import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  // Importamos el servicio de API
import { SqliteService } from '../services/sqlite.service';  // Servicio de SQLite
import * as $ from 'jquery';
//Ocupar comando para declarar jquery'i --save-dev @types/jquery 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements AfterViewInit {

  constructor(
    private apiService: ApiService, // Inyectamos API
    private sqliteService: SqliteService,  // Inyectamos el servicio de SQLite
    private router: Router) { }  // Inyectamos Router


  async ngOnInit() {
      // Inicializamos la base de datos cuando el componente se monta
    await this.sqliteService.createDatabase();
  }
  
  ngAfterViewInit() {
    // Validaciones de jQuery después de que la vista se ha inicializado
    $('#submitBtn').click(async (event) => {
      event.preventDefault();
      let isValid = true;

      // Obtener los valores del formulario
      const name = $('#name').val()?.toString();
      const email = $('#email').val()?.toString();
      const password = $('#password').val()?.toString();
      const role = 'user';  // Aquí podrías hacer que el usuario seleccione un rol si lo deseas

      // Validar campo de Nombre
      if (!name) {
        alert('El nombre es requerido.');
        isValid = false;
      }

      // Validar campo de Correo Electrónico
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        alert('El correo electrónico es requerido.');
        isValid = false;
      } else if (!emailPattern.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Expresión regular para validar la contraseña
      const passwordPattern = /^(?=(.*\d){4})(?=(.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]){3})(?=.*[A-Z]).*$/;

      // Validar campo de Contraseña
      if (!password) {
        alert('La contraseña es requerida.');
        isValid = false;
      } else if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
      } else if (!passwordPattern.test(password)) {
        alert('La contraseña debe contener al menos 4 dígitos, 3 caracteres especiales y 1 letra mayúscula.');
        isValid = false;
      }

      // Si todas las validaciones son correctas
      if (isValid) {
        // Enviamos los datos a la API para registrar el usuario
        const newUser = {
          username: name,
          email: email,
          password: password,
          role: role
        };

        // Llamamos al servicio ApiService para registrar el usuario
        this.apiService.registerUser(newUser).subscribe(async response => {
          alert('Usuario registrado exitosamente.');
        // Después de registrar en la API, guardamos también el usuario en SQLite
          await this.sqliteService.addUser(name!, password!, role);
          alert('Usuario registrado exitosamente en la base de datos local.');

          console.log('Respuesta de la API:', response);
          this.router.navigate(['/login']);  // Redirigir al usuario a la página de inicio de sesión
        }, error => {
          console.error('Error al registrar el usuario:', error);
          alert('Hubo un error al registrar el usuario.');
        });
      }
    });
  }
}
