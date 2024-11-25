import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usersApiUrl = 'http://localhost:3000/users';  // URL de la API REST para usuarios
  private productsApiUrl = 'http://localhost:3000/products';  // URL de la API REST para productos (subscripciones)

  constructor(private http: HttpClient) { }

  // =========================== Métodos para Usuarios ===========================
  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersApiUrl, user);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.usersApiUrl);
  }

  // Obtener un usuario específico por ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.usersApiUrl}/${userId}`);
  }

  // Obtener un usuario específico por nombre de usuario
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.usersApiUrl}?username=${username}`);
  }

  // Actualizar los datos de un usuario
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.usersApiUrl}/${id}`, user);
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersApiUrl}/${id}`);
  }

  // =========================== Métodos para Productos (Subscripciones) ===========================
  // Añadir un nuevo producto (subscripción)
  addProduct(product: any): Observable<any> {
    return this.http.post(this.productsApiUrl, product);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(this.productsApiUrl);
  }

  // Actualizar un producto existente
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.productsApiUrl}/${id}`, product);
  }

  // Eliminar un producto por ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.productsApiUrl}/${id}`);
  }

  // =========================== Métodos para Asociar Usuarios y Productos ===========================
  // Asociar un producto con un usuario (simulación de compra)
  purchaseProduct(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.usersApiUrl}/${userId}/products`, { productId });
  }

  // Obtener productos comprados por un usuario específico
  getUserProducts(userId: number): Observable<any> {
    return this.http.get(`${this.usersApiUrl}/${userId}/products`);
  }
}
