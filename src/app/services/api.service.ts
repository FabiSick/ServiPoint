import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/users';  // URL de la API REST
  private subscriptionsApiUrl = 'http://localhost:3000/products';  // URL de la API de Suscripciones

  constructor(private http: HttpClient) { }


  // =========================== Métodos para Usuarios ===========================
  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //LOGIN
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
  // =========================== Métodos para Productos (Subscripciones) ===========================

  // Crear un nuevo producto (subscripción)
  addProduct(product: any): Observable<any> {
    return this.http.post(this.subscriptionsApiUrl, product);
  }

  // Obtener todos los productos (subscripciones)
  getAllProducts(): Observable<any> {
    return this.http.get(this.subscriptionsApiUrl);
  }

  // Actualizar un producto (subscripción) por ID
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.subscriptionsApiUrl}/${id}`, product);
  }

  // Eliminar un producto (subscripción) por ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.subscriptionsApiUrl}/${id}`);
  }

  // =========================== Asociar Productos a Usuarios ===========================

  // Asociar un producto a un usuario (compra)
  purchaseProduct(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/products`, { productId });
  }

  // Obtener los productos comprados por un usuario
  getUserProducts(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/products`);
  }
}