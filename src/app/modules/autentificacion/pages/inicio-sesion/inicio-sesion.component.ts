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
  hide = true;

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router,
    public servicioCarrito: CarritoService
  ) { }

  // Importamos la interfaz de usuario e inicializamos vacío
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  // Función para el inicio de sesión
  async iniciarSesion() {
    // Las credenciales reciben la información que se envía desde la web
    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password
    }

    try{
      // Obtenemos el usuario desde la BD -> Cloud Firestore
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // ! -> si es diferente
      // .empy -> método de Firebase para marcar si algo es vacío
      if(!usuarioBD || usuarioBD.empty){
        Swal.fire({
          text: "Correo electrónico no registrado",
          icon: "error"
        })
        this.limpiarInputs();
        return;
      }

      /* Primer documento (registro) en la colección de usuarios que se obtiene desde la 
        consulta.
      */
      const usuarioDoc = usuarioBD.docs[0];

      /**
       * Extrae los datos del documento en forma de un objeto y se específica como de tipo 
       * "Usuario" -> haciendo referencia a nuestra interfaz de Usuario.
       */
      const usuarioData = usuarioDoc.data() as Usuario;

      // Hash de la contraseña ingresada por el usuario
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if(hashedPassword !== usuarioData.password){
        Swal.fire({
          text: "Contraseña incorrecta",
          icon: "error"
        })

        this.usuarioIngresado.password = '';
        return;
      }

      const res = await this.servicioAuth.iniciosesion(credenciales.email, credenciales.password)
      .then(res => {
        Swal.fire({
          text: "¡Se ha logueado con éxito! :D",
          icon: "success"
        });

        // Almacena el rol del usuario en el servicio de autentificación
        this.servicioAuth.enviarRolUsuario(usuarioData.rol);

        if(usuarioData.rol === "admin"){
          console.log("Inicio de sesión de usuario administrador")

          // Si es administrador, redirecciona a la vista de 'admin'
          this.servicioRutas.navigate(['/admin']);
        } else {
          console.log("Inicio de sesión de usuario visitante");

          // Si es visitante, redirecciona a la vista de 'inicio'
          this.servicioRutas.navigate(['/inicio']);
          this.servicioCarrito.iniciarCart();
        }
      })
      .catch(err => {
        Swal.fire({
          text: "Hubo un problema al iniciar sesión :(" + err,
          icon: "error"
        })

        this.limpiarInputs();
      })
    }catch(error){
      this.limpiarInputs();
    }
  }

  // Función para vaciar el formulario
  limpiarInputs() {
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}