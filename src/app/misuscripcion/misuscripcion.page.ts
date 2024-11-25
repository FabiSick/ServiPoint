import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misuscripcion',
  templateUrl: './misuscripcion.page.html',
  styleUrls: ['./misuscripcion.page.scss'],
})
export class MisuscripcionPage implements OnInit {

  products: any[] = []; // Lista de productos (suscripciones)
  cart: any[] = [];     // Carrito de compras
  purchasedProducts: number[] = []; // IDs de productos comprados

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts(); // Cargar todos los productos al iniciar la página
    this.getPurchasedProducts(); // Cargar los productos que ya se han comprado
  }

  // Obtener todos los productos desde la API
  getAllProducts() {
    this.apiService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Obtener los productos comprados del usuario actual
  getPurchasedProducts() {
    const userId = 1; // Asume que obtienes el ID del usuario logueado
    this.apiService.getUserProducts(userId).subscribe(
      (data) => {
        this.purchasedProducts = data.map((product: any) => product.id);
      },
      (error) => {
        console.error('Error al obtener productos comprados:', error);
      }
    );
  }

  // Comprobar si el producto ya fue comprado
  isProductPurchased(productId: number): boolean {
    return this.purchasedProducts.includes(productId);
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
    const userId = 1; // Asume que obtienes el ID del usuario logueado
    const productIds = this.cart.map((product) => product.id);

    // Llama a la API para comprar cada producto en el carrito
    productIds.forEach((productId) => {
      this.apiService.purchaseProduct(userId, productId).subscribe(
        (response) => {
          console.log('Producto comprado:', response);
          alert('Producto comprado exitosamente.');
          this.purchasedProducts.push(productId); // Añadir el producto a los comprados
          this.cart = this.cart.filter((item) => item.id !== productId); // Eliminar del carrito
        },
        (error) => {
          console.error('Error al comprar producto:', error);
        }
      );
    });
  }
}
