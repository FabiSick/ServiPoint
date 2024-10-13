import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
//Ocupar comando para declarar jquery'i --save-dev @types/jquery 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    // Validaciones de jQuery después de que la vista se ha inicializado
    $('#submitBtn').click((event) => {
      event.preventDefault();
      let isValid = true;

      // Validar campo de Nombre
      const name = $('#name').val();
      if (!name) {
        alert('El nombre es requerido.');
        isValid = false;
      }

      // Validar campo de Correo Electrónico
      const email = $('#email').val();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        alert('El correo electrónico es requerido.');
        isValid = false;
      } else if (!emailPattern.test(email.toString())) {
        alert('Por favor, ingresa un correo electrónico válido.');
        isValid = false;
      }
      // Expresión regular para validar la contraseña
      // Patrón para validar la contraseña
      const passwordPattern = /^(?=(.*\d){4})(?=(.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]){3})(?=.*[A-Z]).*$/;

      // Validar campo de Contraseña
      const password = $('#password').val();
      if (!password) {
        alert('La contraseña es requerida.');
        isValid = false;
      } else if (password.toString().length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
      } else if (!passwordPattern.test(password.toString())) {
        alert('La contraseña debe contener al menos 4 dígitos, 3 caracteres especiales y 1 letra mayúscula.');
        isValid = false;
      }

      // Si todas las validaciones son correctas
      if (isValid) {
        alert('Formulario válido. Procesando registro...');
        // Aquí puedes realizar la lógica de negocio, como enviar los datos a un servidor
      }
    });
  }
}