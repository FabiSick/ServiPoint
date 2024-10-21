import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const userRole = await this.storage.get('role');  // Obtener el rol almacenado en local storage

    if (userRole === 'admin') {
      return true;  // Si el usuario es administrador, permite el acceso
    } else {
      this.router.navigate(['/home']);  // Redirigir a la página principal si no es administrador
      return false;
    }
  }
}
