import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario: string = ''; // Declarar la propiedad para almacenar el nombre de usuario
  
  constructor(private route: ActivatedRoute, private router: Router) { 
    // Recuperar el nombre de usuario de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.nombreUsuario = params['nombre_usuario'] || ''; // Asignar el valor recibido o una cadena vacía si no existe
    });
  }
  goTologin() {
    this.router.navigate(['/login']);
  }
}
