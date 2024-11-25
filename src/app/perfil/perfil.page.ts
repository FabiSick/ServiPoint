import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userData: any = {
    username: '',
    email: '',
    fullName: '',
    birthdate: '',
    phoneNumber: '',
    computerBrand: ''
  };

  isEditMode: boolean = false;  // Variable para controlar el modo de edición
  computerBrands: string[] = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Apple', 'MSI']; // Lista de marcas de computadoras

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.queryParamMap.get('id'));
    if (userId) {
      this.getUserProfile(userId);
    }
  }

  // Obtener el perfil del usuario por ID
  getUserProfile(userId: number) {
    this.apiService.getUserById(userId).subscribe(
      (data) => {
        this.userData = data; // Asignar datos del usuario a userData
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    );
  }

  // Activar el modo de edición
  editProfile() {
    this.isEditMode = true;
  }

  // Guardar cambios del perfil
  saveProfile() {
    if (this.userData.id) {
      this.apiService.updateUser(this.userData.id, this.userData).subscribe(
        (response) => {
          alert('Perfil actualizado exitosamente');
          this.isEditMode = false; // Salir del modo de edición después de guardar
        },
        (error) => {
          console.error('Error al actualizar el perfil del usuario', error);
        }
      );
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.isEditMode = false;
    this.getUserProfile(this.userData.id); // Recuperar los datos originales
  }
}