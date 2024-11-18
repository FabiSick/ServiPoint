import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  // Importamos el servicio de la API
import { Router } from '@angular/router';  // Importar el Router

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  users: any[] = [];  // Arreglo para almacenar la lista de usuarios

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getUsers();  // Obtener la lista de usuarios al inicializar la página
  }

  // Obtener la lista de usuarios desde la API REST
  getUsers() {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data;  // Asignamos la lista de usuarios a la variable `users`
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  // Editar un usuario (redirigir a la página de edición)
  editUser(user: any) {
    console.log('Editar usuario:', user);
    // Redirigir a la página de edición pasando el ID del usuario como parámetro
    this.router.navigate(['/editar-usuario'], { queryParams: { id: user.id } });
  }

  // Eliminar un usuario por ID
  deleteUser(userId: number) {
    this.apiService.deleteUser(userId).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        this.getUsers();  // Actualizar la lista de usuarios después de la eliminación
      },
      (error) => {
        console.error('Error al eliminar usuario', error);
      }
    );
  }
}
