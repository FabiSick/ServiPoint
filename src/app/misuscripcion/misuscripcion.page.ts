import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misuscripcion',
  templateUrl: './misuscripcion.page.html',
  styleUrls: ['./misuscripcion.page.scss'],
})
export class MisuscripcionPage implements OnInit {
  products: any[] = []; // Lista completa de productos
  purchasedProducts: any[] = []; // Productos comprados por el usuario actual
  cart: any[] = []; // Productos en el carrito
  userId: number = 1; // ID del usuario actual

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProducts(); // Cargar productos al inicializar
  }

  // Cargar todos los productos y obtener los comprados para el usuario actual
  loadProducts() {
    // Obtener todos los productos disponibles
    this.apiService.getAllProducts().subscribe(
      (allProducts: any[]) => {
        this.products = allProducts;

        // Obtener los productos comprados por el usuario actual
        this.apiService.getUserProducts(this.userId).subscribe(
          (purchasedProducts: any[]) => {
            // Filtrar solo los productos comprados por este usuario
            this.purchasedProducts = purchasedProducts.filter((product) =>
              this.products.some((p) => p.id === product.id)
            );
          },
          (error) => console.error('Error al obtener productos comprados:', error)
        );
      },
      (error) => console.error('Error al obtener todos los productos:', error)
    );
  }

  // Añadir producto al carrito
  addToCart(product: any) {
    if (!this.cart.some((item) => item.id === product.id)) {
      this.cart.push(product);
    }
  }

  // Eliminar producto del carrito
  removeFromCart(product: any) {
    this.cart = this.cart.filter((item) => item.id !== product.id);
  }

  // Comprar los productos del carrito
  purchaseCart() {
    // Procesar cada producto en el carrito
    this.cart.forEach((product) => {
      this.apiService.purchaseProduct(this.userId, product.id).subscribe(
        (response) => {
          console.log('Producto comprado:', response);
          alert(`Producto "${product.name}" comprado exitosamente.`);

          // Agregar el producto comprado a la lista de comprados
          this.purchasedProducts.push(product);
          this.cart = this.cart.filter((item) => item.id !== product.id); // Eliminar del carrito
        },
        (error) => console.error('Error al comprar producto:', error)
      );
    });
  }
}