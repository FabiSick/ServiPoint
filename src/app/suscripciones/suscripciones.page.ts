import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.page.html',
  styleUrls: ['./suscripciones.page.scss'],
})
export class SuscripcionesPage implements OnInit {
  products: any[] = [];  // Lista de productos (suscripciones)
  productData = {
    id: 0,
    name: '',
    cost: null
  };
  isEditMode = false;  // Bandera para el modo de edición
  isAddMode = false;   // Bandera para el modo de agregar nuevo producto

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getAllProducts();  // Obtener la lista de productos al cargar la página
  }

  // Obtener la lista de productos desde la API REST
  getAllProducts() {
    this.apiService.getAllProducts().subscribe(
      (data) => {
        this.products = data;  // Asignamos la lista de productos a la variable `products`
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  // Editar un producto (modo de edición)
  editProduct(product: any) {
    this.isEditMode = true;
    this.isAddMode = false;
    this.productData = { ...product };  // Clonamos el objeto para editar
  }

  // Añadir un nuevo producto (modo de agregar)
  addProduct() {
    this.isEditMode = false;
    this.isAddMode = true;
    this.productData = {
      id: 0,
      name: '',
      cost: null
    };
  }

  // Guardar el producto (nuevo o actualizado)
  saveProduct() {
    if (this.isEditMode) {
      // Actualizar un producto existente
      this.apiService.updateProduct(this.productData.id, this.productData).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          alert('Producto actualizado exitosamente.');
          this.getAllProducts();  // Actualizar la lista de productos
          this.clearForm();
        },
        (error) => {
          console.error('Error al actualizar producto', error);
        }
      );
    } else {
      // Crear un nuevo producto
      this.apiService.addProduct(this.productData).subscribe(
        (response) => {
          console.log('Producto creado:', response);
          alert('Producto creado exitosamente.');
          this.getAllProducts();  // Actualizar la lista de productos
          this.clearForm();
        },
        (error) => {
          console.error('Error al crear producto', error);
        }
      );
    }
  }

  // Eliminar un producto por ID
  deleteProduct(productId: number) {
    this.apiService.deleteProduct(productId).subscribe(
      (response) => {
        console.log('Producto eliminado:', response);
        alert('Producto eliminado exitosamente.');
        this.getAllProducts();  // Actualizar la lista de productos después de la eliminación
      },
      (error) => {
        console.error('Error al eliminar producto', error);
      }
    );
  }

  // Limpiar el formulario y desactivar el modo de edición/agregar
  clearForm() {
    this.isEditMode = false;
    this.isAddMode = false;
    this.productData = {
      id: 0,
      name: '',
      cost: null
    };
  }
}