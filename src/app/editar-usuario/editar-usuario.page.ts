import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  userData: any = {}; // Variable para almacenar los datos del usuario
  private apiUrl = 'http://localhost:3000/users'; // URL de la API

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  // Método para cargar los datos del usuario
  loadUser() {
    // Obtener el id del usuario desde los parámetros de la URL
    const userId = this.route.snapshot.queryParamMap.get('id');
    if (userId) {
      this.http.get(`${this.apiUrl}/${userId}`).subscribe(
        (data: any) => {
          console.log('Datos recibidos del usuario:', data);
          this.userData = data; // Guardar los datos del usuario en la variable
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          alert('Usuario no encontrado');
        }
      );
    } else {
      alert('ID de usuario no especificado');
    }
  }
  

  // Método para guardar cambios
  saveChanges() {
    if (this.userData && this.userData.id) {
      this.http.put(`http://localhost:3000/users/${this.userData.id}`, this.userData)
        .subscribe(
          response => {
            console.log('Usuario actualizado:', response);
            alert('Usuario actualizado con éxito.');
            this.router.navigate(['/usuarios']); // Redirige de vuelta a la lista de usuarios
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
            alert('Hubo un error al actualizar el usuario.');
          }
        );
    } else {
      alert('No se pudo encontrar el usuario para actualizar.');
    }
  }

  // Método para cancelar la edición
  cancel() {
    this.router.navigate(['/usuarios']); // Redirigir a la página de usuarios o cualquier otra página
  }
}
