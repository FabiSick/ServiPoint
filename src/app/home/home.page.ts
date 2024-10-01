import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = ''; // Declarar la propiedad para almacenar el nombre de usuario
  
  constructor(private route: ActivatedRoute, private router: Router,private storage: Storage) {}

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
  async logout() {
    await this.storage.remove('nombre_usuario');
    this.router.navigate(['/login']);
  }
  
}
