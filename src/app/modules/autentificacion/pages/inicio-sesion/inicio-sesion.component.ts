// Importaciones necesarias para el componente y servicios
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/modules/carrito/services/carrito.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true; // Propiedad para controlar la visibilidad de la contraseña

  constructor(
    public servicioAuth: AuthService, // Servicio de autenticación
    public servicioFirestore: FirestoreService, // Servicio de Firestore
    public servicioRutas: Router, // Servicio de enrutamiento
    public servicioCarrito: CarritoService // Servicio de carrito de compras
  ) { }

  // Objeto usuarioIngresado inicializado vacío siguiendo la interfaz Usuario
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función asíncrona para el inicio de sesión
  async iniciarSesion() {
    // Las credenciales se extraen del objeto usuarioIngresado
    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try {
      // Intentamos obtener el usuario desde Firestore usando el email proporcionado
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // Verifica si el usuario no existe o la consulta no devolvió resultados
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          text: "Correo electrónico no registrado",
          icon: "error"
        })
        this.limpiarInputs(); // Limpia los campos del formulario
        return;
      }

      // Obtiene el primer documento encontrado en la colección de usuarios
      const usuarioDoc = usuarioBD.docs[0];

      // Extrae los datos del documento y los convierte a un objeto de tipo Usuario
      const usuarioData = usuarioDoc.data() as Usuario;

      // Hashea la contraseña proporcionada y la compara con la almacenada en la BD
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      // Si las contraseñas no coinciden, muestra un mensaje de error
      if (hashedPassword !== usuarioData.password) {
        Swal.fire({
          text: "Contraseña incorrecta",
          icon: "error"
        })
        this.usuarioIngresado.password = ''; // Limpia solo el campo de la contraseña
        return;
      }

      // Si las credenciales son correctas, intenta iniciar sesión
      await this.servicioAuth.iniciosesion(credenciales.email, credenciales.password)
      .then(res => {
        Swal.fire({
          text: "¡Se ha logueado con éxito! :D",
          icon: "success"
        });

        // Almacena el rol del usuario en el servicio de autenticación
        this.servicioAuth.enviarRolUsuario(usuarioData.rol);

        // Redirige al usuario según su rol
        if (usuarioData.rol === "admin") {
          console.log("Inicio de sesión de usuario administrador")
          this.servicioRutas.navigate(['/admin']); // Redirige a la vista de administrador
        } else {
          console.log("Inicio de sesión de usuario visitante");
          this.servicioRutas.navigate(['/inicio']); // Redirige a la vista de inicio
          this.servicioCarrito.iniciarCart(); // Inicializa el carrito de compras
        }
      })
      .catch(err => {
        Swal.fire({
          text: "Hubo un problema al iniciar sesión :(" + err,
          icon: "error"
        })
        this.limpiarInputs(); // Limpia los campos del formulario en caso de error
      })
    } catch (error) {
      this.limpiarInputs(); // Limpia los campos del formulario en caso de excepción
    }
  }

  // Función para vaciar los campos del formulario
  limpiarInputs() {
    this.usuarioIngresado.email = '';
    this.usuarioIngresado.password = '';
  }
}
