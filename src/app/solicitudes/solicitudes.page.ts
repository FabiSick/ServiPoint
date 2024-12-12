import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {
  userId: number | undefined; // ID del usuario actual
  solicitudes: any[] = []; // Lista de solicitudes asociadas al usuario

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserAndRequests();
  }

  // Método para cargar el usuario actual y sus solicitudes
  loadUserAndRequests() {
    this.apiService.getCurrentUser().subscribe(
      (user: any) => {
        this.userId = user.id; // Obtén el ID del usuario actual
        this.loadSolicitudes(); // Carga las solicitudes del usuario
      },
      (error) => {
        console.error('Error al obtener el usuario actual:', error);
      }
    );
  }

  // Método para cargar las solicitudes del usuario actual
  loadSolicitudes() {
    if (!this.userId) {
      console.error('No se pudo obtener el userId');
      return;
    }

    this.apiService.getRequestsByUser(this.userId).subscribe(
      (requests: any[]) => {
        this.solicitudes = requests; // Asigna las solicitudes recibidas
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      (error) => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }
}