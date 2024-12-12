import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private localhost = 'http://localhost:3000'; // URL base para la API REST
  private usersApiUrl = `${this.localhost}/users`; // URL para usuarios
  private productsApiUrl = `${this.localhost}/products`; // URL para productos
  private requestsApiUrl = `${this.localhost}/requests`; // URL para solicitudes

  constructor(private http: HttpClient) {}

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
    return this.http.get(`${this.usersApiUrl}/${userId}`).pipe(
      map((user: any) => {
        if (user && user.products) {
          return user.products; // Devuelve los productos comprados por el usuario
        } else {
          return []; // Si no hay productos, devuelve un array vacío
        }
      })
    );
  }

  // =========================== Métodos para Solicitudes ===========================
  // Crear una solicitud
  createRequest(request: any): Observable<any> {
    return this.http.post(this.requestsApiUrl, request);
  }

  // Obtener solicitudes de un usuario
  getRequestsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.requestsApiUrl}?userId=${userId}`);
  }

  // Obtener el usuario actual (puede ser reemplazado por lógica real del backend)
  getCurrentUser(): Observable<any> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        if (users.length > 0) {
          return users[0]; // Simula que el primer usuario es el actual
        } else {
          throw new Error('No se encontraron usuarios.');
        }
      })
    );
  }
}