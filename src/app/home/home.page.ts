import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Browser } from '@capacitor/browser'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = ''; // Declarar la propiedad para almacenar el nombre de usuario
  
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,private storage: Storage) {
    this.checkAdminRole();
  }

  async  ngOnInit() {
    // Obtener el parámetro de nombre de usuario de los query params
    this.route.queryParams.subscribe(async params => {
      if (params['nombre_usuario']) {
        this.nombreUsuario = params['nombre_usuario'];
        // Guardar el nombre de usuario por si no se encuentra en el almacenamiento local
        await this.storage.set('nombre_usuario', this.nombreUsuario);
      } else {
        // Si no hay parámetro, carga el nombre de usuario desde el almacenamiento
        const nombreUsuarioAlmacenado = await this.storage.get('nombre_usuario');
        if (nombreUsuarioAlmacenado) {
          this.nombreUsuario = nombreUsuarioAlmacenado;
        }
      }
    });
  }

  // Función para verificar el rol del usuario
  async checkAdminRole() {
    const userRole = await this.storage.get('role');  // Obtén el rol almacenado
    if (userRole === 'admin') {
      this.isAdmin = true;  // Si el rol es "admin", activa isAdmin
    }
  }

  // Método para ir al perfil
  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  // Método para ir al historial de servicios
  goToSolicitudes() {
    this.router.navigate(['/solicitudes']);
  }

  goToSuscripciones() {
    this.router.navigate(['/misuscripcion']);
  }
  
  goToConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  // Método para cerrar session por medio de Persistencia/Storage
  async logout() {
    await this.storage.remove('nombre_usuario');
    this.router.navigate(['/login']);
  }
   // Función para hacer una llamada telefónica
   async makeCall() {
    await Browser.open({ url: 'tel:123456789' });  // Reemplaza con el número que desees
  }
  
}
