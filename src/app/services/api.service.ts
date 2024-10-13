import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/users';  // URL de la API REST

  constructor(private http: HttpClient) { }

  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un usuario específico por nombre de usuario
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }

  // Actualizar los datos de un usuario
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
