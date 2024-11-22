// Importación de NgModule de Angular
import { NgModule } from '@angular/core';
// Importación de RouterModule y Routes para configurar las rutas
import { RouterModule, Routes } from '@angular/router';

// IMPORTACIÓN DE LOS COMPONENTES DEL MÓDULO DE AUTENTIFICACIÓN
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';

// Definición de las rutas para el módulo de autenticación
const routes: Routes = [
  {
    path: "registro", component: RegistroComponent  // Ruta para el componente de registro
  },
  {
    path: "inicio-sesion", component: InicioSesionComponent  // Ruta para el componente de inicio de sesión
  }
];

// Decorador NgModule que define las configuraciones del módulo de rutas
@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule]  // Exporta RouterModule para que esté disponible en otros módulos
})
export class AutentificacionRoutingModule { }
