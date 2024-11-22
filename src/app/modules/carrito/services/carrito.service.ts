// Importaciones necesarias
import { Injectable } from '@angular/core';
import { CrudService } from '../../admin/services/crud.service';
import { AuthService } from '../../autentificacion/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Proporciona el servicio en la raíz del módulo
})
export class CarritoService {

  // Definición del objeto Pedido con propiedades inicializadas
  pedido: Pedido = {
    idPedido: '',
    producto: {
      idProducto: '',
      nombre: '',
      precio: 0,
      descripcion: '',
      categoria: '',
      imagen: '',
      alt: '',
      stock: 0
    },
    cantidad: 0,
    total: 0
  }

  // Colección de pedidos en Firestore
  private pedidosColeccion: AngularFirestoreCollection<Pedido>

  // UID del usuario
  private uid: string | null = null;

  // Constructor para inyectar dependencias necesarias
  constructor(
    private servicioAuth: AuthService, // Servicio de autenticación
    private servicioFirestore: AngularFirestore, // Servicio de Firestore
    public servicioRutas: Router // Servicio de enrutamiento
  ) {
    // Inicialización de la subcolección de pedidos dentro de la colección de usuarios
    this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
  }

  // Función para inicializar el carrito
  iniciarCart() {
    this.servicioAuth.obtenerUid().then(uid => {
      // Obtener el UID del usuario
      this.uid = uid;
      if (this.uid === null) {
        console.error('No se obtuvo el UID. Intente iniciar sesión');
        this.servicioRutas.navigate(['/inicio-sesion']); // Redirige a la página de inicio de sesión
      } else {
        // Inicializa la subcolección de pedidos con el UID del usuario
        this.pedidosColeccion = this.servicioFirestore.collection(`usuarios/${this.uid}/pedido`);
        console.log(this.uid);
      }
    });
  }

  // Función para obtener el carrito de compras
  obtenerCarrito() {
    return this.pedidosColeccion.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data() as Pedido))
    );
  }

  // Función para crear un nuevo pedido
  crearPedido(producto: Producto, stock: number) {
    try {
      // Crear un ID único para el pedido
      const idPedido = this.servicioFirestore.createId();

      // Asignar valores al objeto pedido
      this.pedido.idPedido = idPedido;
      this.pedido.producto = producto;
      this.pedido.cantidad = stock;
      this.pedido.total = producto.precio * stock;

      // Guardar el pedido en Firestore
      this.pedidosColeccion.doc(idPedido).set(this.pedido);
    } catch (error) {
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error al subir su producto',
        icon: 'error'
      });
    }
  }

  // Función para borrar un pedido
  borrarPedido(pedido: Pedido) {
    try {
      // Eliminar el pedido de Firestore
      this.pedidosColeccion.doc(pedido.idPedido).delete();
      Swal.fire({
        text: 'Ha borrado su pedido con éxito',
        icon: 'info'
      });
    } catch (error) {
      Swal.fire({
        text: 'Ha ocurrido un error: \n' + error,
        icon: 'error'
      });
    }
  }
}
