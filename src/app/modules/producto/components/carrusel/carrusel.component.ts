// Importaciones necesarias
import { Component } from '@angular/core'; // Importa la clase Component de Angular
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas
import { Producto } from 'src/app/models/producto'; // Importa la interfaz Producto desde la ruta especificada

@Component({
  selector: 'app-carrusel', // Define el selector del componente
  templateUrl: './carrusel.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./carrusel.component.css'] // Ruta al archivo de estilos CSS del componente
})
export class CarruselComponent {
  // String que modificará el valor del @Input en el componente hijo
  product: string = '';

  // Colección de productos añadidos a la lista del carrusel
  productosCarrusel: Producto[] = [];

  // Variables booleanas para gestionar el estado de los productos
  juguete: boolean = false;
  general: boolean = true;

  // Método que se llama cuando se añade un producto
  productoAnadido(producto: Producto) {
    // Modifica el valor de 'product' para reflejar el producto añadido
    this.product = `${producto.nombre} : $${producto.precio}`;

    try {
      // Agrega la información del producto a la colección del carrusel
      this.productosCarrusel.push(producto);

      // Muestra una alerta de éxito usando SweetAlert2
      Swal.fire({
        title: 'Bien',
        text: 'Ha añadido este producto con éxito',
        icon: 'info'
      });
    } catch (error) {
      // Muestra una alerta de error usando SweetAlert2 en caso de excepción
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error\n' + error,
        icon: 'error'
      });
    }
  }
}

