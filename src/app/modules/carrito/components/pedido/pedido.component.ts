// Importación de los módulos necesarios para el componente
import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  productos: Pedido[] = []; // Array para almacenar los productos en el carrito

  constructor(
    public servicioCarrito: CarritoService, // Inyección del servicio del carrito
    public servicioAuth: AuthService, // Inyección del servicio de autenticación
  ) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtener el UID del usuario autenticado
    this.servicioAuth.obtenerUid().then(uid => {
      if (uid) {
        // Si el UID existe, obtener el rol del usuario
        this.servicioAuth.obtenerRol(uid).subscribe(rol => {
          if (rol === 'usuario') {
            // Si el usuario tiene rol de 'usuario', inicializar el carrito
            this.servicioCarrito.iniciarCart();

            // Obtener los productos del carrito y asignarlos al array 'productos'
            this.servicioCarrito.obtenerCarrito().subscribe(producto =>
              this.productos = producto
            );
          }
        })
      }
    })
  }

  // Método para quitar un pedido del carrito
  quitarPedido(pedido: Pedido) {
    this.servicioCarrito.borrarPedido(pedido); // Llama al servicio para borrar el pedido
  }
}
