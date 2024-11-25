import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  // Método para cambiar notificaciones
  cambiarNotificaciones() {
    console.log('Cambio de notificaciones');
  }

  // Método para cambiar idioma
  cambiarIdioma() {
    console.log('Cambio de idioma');
  }

  // Método para actualizar datos personales del usuario
  actualizarDatosPersonales() {
    console.log('Actualizar datos personales');
    this.router.navigate(['/perfil']); // Navegar a la página de perfil para actualizar los datos personales
  }

  // Método para cambiar la contraseña
  cambiarContrasena() {
    console.log('Cambio de contraseña');
    // Lógica para redirigir a una página o modal de cambio de contraseña
  }

  // Método para contactar soporte técnico
  soporteTecnico() {
    console.log('Contacto con soporte técnico');
    // Lógica para contactar al soporte técnico, podría ser un modal o redirigir a otra vista
  }

  // Método para activar o desactivar el modo oscuro
  modoOscuro(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
  }

  // Método para cerrar la sesión
  logout() {
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Navegar a la página de inicio de sesión
  }
}